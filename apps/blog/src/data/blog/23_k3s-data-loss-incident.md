---
pubDatetime: 2025-11-15T17:00:00+09:00
title: '【悲報】K3sのデータが全部消えた話 - Terraformとboot volumeの落とし穴'
featured: false
slug: k3s-data-loss-incident
draft: false
tags:
  - k8s
  - k3s
  - oracle-cloud
  - terraform
  - トラブルシューティング
description: Oracle CloudでK3s環境を構築した翌日、WordPressの記事を含む全データが消失。原因究明と対策を記録します。バックアップの大切さを痛感した一件です。
---

## 事件発生

2025年11月12日 12時頃、先日構築したK3s環境のデータが全て消失しました。WordPressで書いた記事、設定、すべてが跡形もなく消え去っていました。

データ復旧は不可能と判断し、なぜこうなったのか、どうすれば防げたのかを整理することにしました。

## 何が起きたのか

### 推定される原因

Oracle CloudのComputeインスタンスでboot volumeにデータを保存していたのですが、インスタンスのイメージが変更されたことでboot volumeがデタッチされ、新しいvolumeがアタッチされたようです。

問題のTerraformコード:

```hcl
source_details {
  source_type             = "image"
  source_id               = data.oci_core_images.ubuntu_images.images[0].id
  boot_volume_size_in_gbs = 50
}
```

`data.oci_core_images`で**最新のイメージを常に取得する**設定にしていました。

### 何が起こったのか(詳細)

1. Ubuntuの新しいイメージがリリースされた
2. Terraformが最新のイメージ(`images[0].id`)を取得
3. `source_id`の変更を検知してインスタンスを更新
4. 新しいboot volumeが作成され、古いboot volumeがデタッチ
5. `preserve_boot_volume = false`(デフォルト)だったため、古いboot volumeを削除
6. データ全消失 🔥

### インスタンスの「変更」という罠

Terraformの`terraform plan`では、このような変更は`change`として表示されます。`destroy`→`create`ではありません。

EC2の場合、AMIを変更すると新しいインスタンスが作られてIPも変わるため、大きな変更だと気づきやすいです。（確か）

しかし、Oracle CloudのComputeインスタンスの場合、Public IPは変わらず、内部状態だけが変わるため、**見逃しやすい**。

`change`だからといって安心して`apply`してはいけない、という教訓になりました。

## 問題の本質

改めて調べてみると、Boot Volumeにデータを保存すること自体は問題なさそうです。[Oracle CloudのFAQ](https://www.oracle.com/jp/cloud/storage/block-volumes/faq/#category-boot)にも、Boot Volumeは耐久性があり、バックアップも可能で、デタッチして別のインスタンスにアタッチすることもできると書かれています。

では何が問題だったのか?

Boot Volumeにデータを保存していたことではなく、**Terraformでの管理方法とバックアップ体制が問題**だったのです。

## 何を間違えたのか

1. **バックアップを取っていなかった**
   - これが最大の失敗
   - データ消失時の復旧手段が一切なかった

2. **Terraformでイメージを動的に取得していた**
   - 最新のイメージを常に取得する設定(`data.oci_core_images.ubuntu_images.images[0].id`)は危険
   - ignore_changesを使うなど、変更を慎重に管理すべきだった

3. **Terraformの差分を十分に確認しなかった**
   - `change`表示を軽く見てしまい、Boot Volumeの再作成を見逃した
   - ストレージ関連の変更は特に慎重に確認すべきだった

4. **Boot Volumeのライフサイクル管理が不十分だった**
   - インスタンスと一緒に作成したため、ライフサイクルが連動してしまった
   - `preserve_boot_volume = false`(デフォルト)だったため、古いBoot Volumeが削除された

## 対策と教訓

### バックアップは最優先

何はともあれ、バックアップです。**バックアップがなければ何も始まりません。**

- バックアップを取る
- リストアのテストをする
- ちゃんと復旧できることを確認する

この3点セットが必須です。これさえあれば、今回のような失敗も致命的にはなりませんでした。

### 実施した技術的対策

#### 1. `preserve_boot_volume = true`を設定

```hcl
preserve_boot_volume = true
```

インスタンス削除時にboot volumeを保持するようにしました。最悪の場合、バックアップとして機能します。

#### 2. イメージIDの変更を無視

```hcl
lifecycle {
  ignore_changes = [
    source_details[0].source_id
  ]
}
```

最初のインスタンス作成時のみイメージを使用し、その後の変更は無視するようにしました。これで意図しないイメージ変更を防げます。

### 3. K3sデータ用Block Volumeの作成とバックアップ設定

```hcl
# K3sデータ用のBlock Volume
resource "oci_core_volume" "k3s_data" {
  compartment_id      = local.compartment_id
  availability_domain = data.oci_identity_availability_domains.ad.availability_domains[0].name
  display_name        = "k3s-data-volume"
  size_in_gbs         = 100
  vpus_per_gb         = 10

  lifecycle {
    prevent_destroy = true
  }
}

# Block VolumeをK3sインスタンスにアタッチ
resource "oci_core_volume_attachment" "k3s_data_attachment" {
  attachment_type = "paravirtualized"
  instance_id     = oci_core_instance.k3s_server.id
  volume_id       = oci_core_volume.k3s_data.id
  is_read_only    = false
  is_shareable    = false

  lifecycle {
    ignore_changes = [instance_id]
  }
}

# OCI提供の定義済みバックアップポリシーを取得
data "oci_core_volume_backup_policies" "predefined_policies" {
  filter {
    name   = "display_name"
    values = ["bronze"]  # 週次バックアップ、4週間保持
  }
}

# Block Volumeのバックアップポリシーを適用
resource "oci_core_volume_backup_policy_assignment" "k3s_data_backup" {
  asset_id  = oci_core_volume.k3s_data.id
  policy_id = data.oci_core_volume_backup_policies.predefined_policies.volume_backup_policies[0].id
}
```

**Block Volumeのみバックアップを設定**しています。理由は:

- Always Free枠でのバックアップ容量を節約するため
- Boot VolumeはK3s本体のインストールのみで、`preserve_boot_volume = true`で最低限の保護
- K3sのクラスタ状態やPodのデータは、全てBlock Volumeに保存
- バックアップが必要なのはクラスタデータが保存されているBlock Volumeのみ

つまり、Boot Volumeが消えてもK3sを再インストールすればよく、Block Volumeさえあればクラスタの状態を復元できる構成にしました。

### Terraformでの教訓

#### リソース管理の理解

Terraformでインフラを管理する場合、宣言的にリソースを定義します。そのため:

- イメージIDを動的に取得すると、イメージ更新時に意図しない変更が発生する
- `boot_volume_size_in_gbs`を指定すると、イメージ変更時に新しいBoot Volumeが作成される
- リソースのライフサイクルを理解し、重要なデータを持つリソースは慎重に管理する

コンソールでの手動操作とTerraformでの管理は挙動が異なります。Terraformは宣言した状態を保とうとするため、意図しない再作成が発生することがあります。

#### 差分確認の重要性

`change`表示だからといって安心してはいけません。**意図しないリソースの変更が含まれていないか、必ず確認**しましょう。特にストレージ関連の変更は要注意です。

#### イメージ管理

最新のイメージを常に取得する設定は、意図しない変更を招く可能性があります。特定のバージョンを指定するか、`ignore_changes`で変更を制御しましょう。

### Boot VolumeとBlock Volumeの使い分け

Boot Volumeにデータを保存すること自体は問題ありませんが、今回は以下のように使い分けることにしました:

- **Boot Volume**: K3s本体のインストールのみ。`preserve_boot_volume = true`で保護
- **Block Volume**: K3sのクラスタ状態とPodのデータ。バックアップポリシーを適用

この構成にした理由:

1. **Always Free枠のバックアップ容量の節約**: 無料枠を超えたくなかったため
2. **再現性**: Boot Volumeが消えてもK3sを再インストールすれば復元可能
3. **独立性**: Block Volumeは独立したリソースとして管理でき、`prevent_destroy = true`で誤削除を防止

結果として、**本当に重要なデータだけをバックアップする**体制になりました。

## まとめ

先日に書いた「[Oracle CloudでK3s環境構築してWordPressをデプロイした話](/posts/k3s-wordpress-on-oracle-cloud/)」の続編が、まさかこんな形になるとは思いませんでした。

データは全て消えましたが、良い学びになりました。特に、**バックアップの大切さ**と**インフラコードの変更管理の重要性**を痛感しました。

Oracle CloudのComputeインスタンスは、EC2とは挙動が異なる部分があるため、Terraformでの管理には注意が必要です。

今回の失敗を教訓に、より堅牢なインフラ構築を目指します。
