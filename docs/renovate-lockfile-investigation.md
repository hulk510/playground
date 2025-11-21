# Renovate pnpm-lock.yaml 更新の調査レポート

## 概要

このドキュメントは、Renovate Bot が依存関係を更新する際に、`pnpm-lock.yaml` が更新される場合と更新されない場合がある問題について調査した結果をまとめたものです。

## 問題の詳細

### 具体例

**PR #2019: globals パッケージの更新**
- URL: https://github.com/hulk510/playground/pull/2019
- 更新内容: `globals` を `16.3.0` → `16.5.0` に更新
- **問題**: `apps/blog/package.json` のみが更新され、`pnpm-lock.yaml` が更新されていない

**PR #2048: @tanstack/react-query の更新（成功例）**
- 更新内容: `@tanstack/react-query` を `5.90.9` → `5.90.10` に更新
- **成功**: `package.json` と `pnpm-lock.yaml` の両方が更新された

## 根本原因の分析

### 1. Renovate の設定による影響

このリポジトリの Renovate 設定（`.github/renovate.json`）は以下のプリセットを使用しています：

```json
{
  "extends": [
    "config:best-practices",
    "config:js-app",
    ":automergeAll",
    ":automergePr",
    ":disablePrControls",
    ":label(renovate)",
    ":rebaseStalePrs",
    ":semanticCommits",
    "security:minimumReleaseAgeNpm",
    "schedule:daily",
    ":prConcurrentLimit10",
    ":prHourlyLimit4",
    "customManagers:biomeVersions"
  ]
}
```

#### `config:js-app` プリセットの影響

`config:js-app` プリセットは以下の動作をします：
- すべての依存関係（peerDependencies を除く）をピン留めする（`:pinAllExceptPeerDependencies`）
- つまり、バージョン範囲（`^1.0.0`）ではなく、正確なバージョン（`1.0.0`）を使用する

### 2. rangeStrategy の動作

Renovate の `rangeStrategy` には以下のオプションがあります：

| Strategy | package.json | pnpm-lock.yaml | 説明 |
|----------|-------------|----------------|------|
| `auto` (デフォルト) | 範囲を保持 | 更新 | 既存の範囲を保持しつつ、ロックファイルを更新 |
| `bump` | 範囲を更新 | 更新 | 範囲も最新バージョンに合わせて更新 |
| `pin` | 正確なバージョン | 更新 | 常に正確なバージョンを使用 |
| `in-range-only` | 変更なし | 更新（範囲内のみ） | 範囲内の更新のみロックファイルを更新 |
| `update-lockfile` | 変更なし | 更新 | package.json は変更せず、ロックファイルのみ更新 |

`config:js-app` を使用している場合、依存関係はピン留めされるため、実質的に `rangeStrategy: pin` と同じ動作になります。

### 3. PR #2019 で lockfile が更新されなかった理由

以下の要因が考えられます：

#### A. Renovate の実行エラー

PR #2019 のコミットを確認すると、以下のファイルのみが変更されています：
```
apps/blog/package.json | 2 +-
1 file changed, 1 insertion(+), 1 deletion(-)
```

通常、Renovate は以下の手順で動作します：
1. `package.json` を更新
2. `pnpm install` を実行して `pnpm-lock.yaml` を更新
3. 変更をコミット

しかし、PR #2019 では手順 2 が何らかの理由で実行されなかった、または失敗した可能性があります。

#### B. 考えられる原因

1. **Renovate の一時的な不具合**
   - Renovate Bot の実行中にエラーが発生した
   - pnpm のインストールステップが失敗したが、エラーが無視された

2. **package-lock-only 設定の影響**
   - `.npmrc` に `package-lock-only=true` が設定されている
   - この設定は npm 用だが、Renovate の動作に影響した可能性がある

3. **依存関係の解決の問題**
   - `globals` パッケージの更新時に依存関係の解決に失敗した
   - Renovate がエラーを検出せず、package.json のみを更新した

### 4. 成功した PR との違い

PR #2048（@tanstack/react-query の更新）では正常に動作しました：

```
packages/react-test-provider-wrapper-example/package.json | 2 +-
pnpm-lock.yaml | 18 +++++++++---------
2 files changed, 10 insertions(+), 10 deletions(-)
```

この違いから、問題は特定のパッケージまたは Renovate の実行タイミングに起因する可能性が高いと考えられます。

## Renovate のロックファイル更新の仕組み

### 正常な動作フロー

1. **依存関係の検出**
   - Renovate が新しいバージョンを検出
   
2. **package.json の更新**
   - rangeStrategy に基づいて package.json を更新
   
3. **ロックファイルの更新**
   - パッケージマネージャー（pnpm）を実行
   - `pnpm install` が実行され、pnpm-lock.yaml が更新される
   
4. **コミットの作成**
   - すべての変更をまとめてコミット

### 失敗するケース

1. **インストールの失敗**
   - `pnpm install` がエラーで終了
   - 依存関係の競合や解決の問題
   
2. **設定の問題**
   - `.npmrc` や pnpm の設定が Renovate の動作を妨げる
   - frozen-lockfile などの設定が影響する可能性
   
3. **Renovate のバグ**
   - 特定のパッケージやバージョンで発生する既知の問題
   - pnpm のバージョン変更による互換性の問題

## 推奨される対策

### 1. Renovate の設定見直し

#### オプション A: postUpdateOptions の追加

```json
{
  "extends": ["config:best-practices", "config:js-app"],
  "postUpdateOptions": ["pnpmDedupe"]
}
```

`pnpmDedupe` オプションを追加することで、pnpm-lock.yaml の整合性を保つことができます。

#### オプション B: lockFileMaintenance の有効化

```json
{
  "lockFileMaintenance": {
    "enabled": true,
    "schedule": ["before 4am on monday"]
  }
}
```

定期的にロックファイルを更新することで、依存関係を最新の状態に保ちます。

### 2. .npmrc の見直し

現在の `.npmrc` の設定：
```
package-lock-only=true
```

この設定は npm 用であり、pnpm では無視されるべきですが、念のため削除を検討してください。

### 3. CI/CD でのチェック

GitHub Actions に以下のチェックを追加することを推奨します：

```yaml
- name: Check lockfile sync
  run: |
    pnpm install --frozen-lockfile
    if git diff --quiet pnpm-lock.yaml; then
      echo "✅ Lockfile is in sync"
    else
      echo "❌ Lockfile is out of sync"
      exit 1
    fi
```

### 4. PR #2019 の修正方法

現在の PR #2019 を修正するには：

1. **手動での lockfile 更新**
```bash
cd /path/to/repo
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update pnpm-lock.yaml"
```

2. **PR の再作成を Renovate に依頼**
   - PR を一度クローズ
   - "Recreate" ボタンをクリックして再作成

## よくある質問（FAQ）

### Q1: なぜ一部の PR だけ lockfile が更新されないのか？

**A:** 以下の理由が考えられます：
- Renovate の実行中に一時的なエラーが発生
- 特定のパッケージで依存関係の解決に失敗
- Renovate のバグや設定の問題

### Q2: lockfile が更新されない場合、マージしても大丈夫か？

**A:** **いいえ、マージすべきではありません。** package.json と pnpm-lock.yaml が同期していない状態でマージすると：
- CI/CD で `--frozen-lockfile` を使用している場合、ビルドが失敗する
- 他の開発者が `pnpm install` を実行したときに、異なるバージョンがインストールされる可能性がある
- 予期しない動作やバグが発生する可能性がある

### Q3: この問題を防ぐにはどうすればよいか？

**A:** 以下の対策を推奨します：
1. `postUpdateOptions: ["pnpmDedupe"]` を Renovate 設定に追加
2. `lockFileMaintenance` を有効化
3. CI/CD で lockfile の同期をチェック
4. Renovate の PR を自動マージする前に、必ず CI が成功することを確認

## 参考資料

### Renovate 公式ドキュメント
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [npm/pnpm Manager](https://docs.renovatebot.com/modules/manager/npm/)
- [Range Strategy](https://docs.renovatebot.com/configuration-options/#rangestrategy)
- [Post Update Options](https://docs.renovatebot.com/configuration-options/#postupdateoptions)

### 関連する GitHub Issues
- [Use with pnpm #8471](https://github.com/renovatebot/renovate/issues/8471)
- [PNPM lockfile not being updated #37516](https://github.com/renovatebot/renovate/discussions/37516)
- [Document update-lockfile limitations #36107](https://github.com/renovatebot/renovate/issues/36107)

### ブログ記事
- [In-Range Dependency Updates with Renovate](https://xam.io/2024/renovate-range/)
- [How should you pin dependencies and why?](https://the-guild.dev/blog/how-should-you-pin-dependencies-and-why)

## まとめ

### 問題の本質

Renovate が `package.json` を更新する際に、何らかの理由で `pnpm install` の実行が失敗したか、スキップされたため、`pnpm-lock.yaml` が更新されなかった。

### 主な原因

1. **Renovate の一時的な実行エラー**
2. **依存関係の解決の失敗**
3. **設定の問題**（.npmrc の `package-lock-only=true` など）

### 推奨される対策

1. ✅ `postUpdateOptions: ["pnpmDedupe"]` を追加
2. ✅ `lockFileMaintenance` を有効化
3. ✅ CI/CD で lockfile の同期チェックを追加
4. ✅ `.npmrc` から不要な npm 固有の設定を削除

### 今後の対応

- PR #2019 は一度クローズし、Renovate に再作成させる
- または手動で `pnpm install` を実行して lockfile を更新
- 上記の推奨設定を Renovate の設定に追加

---

**調査日時**: 2025-11-21  
**調査者**: GitHub Copilot  
**対象リポジトリ**: hulk510/playground
