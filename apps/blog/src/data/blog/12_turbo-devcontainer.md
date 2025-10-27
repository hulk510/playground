---
title: Devcontainerで環境変数が呼び出せず詰んだ話と解決策
pubDatetime: 2025-02-13T12:54:43.125Z
featured: false
draft: false
slug: turbo-devcontainer
tags:
  - devcontainer
  - 開発
description: TurborepoのStrict Modeによって、globalEnvに指定した環境変数のみがタスクの実行時に渡される仕様だったため、docker-composeのenvironmentで定義した変数が使えなかった話。
---

## Devcontainerで環境変数が呼び出せない😭

モノリポで開発しているプロジェクトで、Devcontainerから環境変数を呼び出せなくて詰んだので、備忘録としてまとめる。

### **結論**

TurborepoのStrict Modeが有効になっている場合、`globalEnv` に指定した環境変数しかタスクの実行時に渡されない。
そのため、docker-composeの `environment` で定義しても、環境変数が認識されなかった。

---

## 経緯

最近 GitHub Copilot Workspace（CW）を試していて、その中で生成されたコードを確認する際に、毎回VSCodeを開くのが面倒だった。iPad などで手軽に確認できるように、GitHub Codespacesを使って開発環境を構築することにした。（CW のレビューはまた別の機会に書く）

その過程でDevcontainerを設定していたのだが、環境変数の問題にハマった。

プロジェクトでは**Neon Database**を使っていて、local 環境では**Neon の提供する proxy コンテナ**を経由してDBにアクセスする必要があった。

```ts file="client.ts"
if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = WebSocket
  neonConfig.poolQueryViaFetch = true
} else {
  neonConfig.wsProxy = (host) =>
    `${process.env.NEON_PROXY_HOST || host}:${process.env.NEON_PROXY_PORT || '54330'}/v1`
  neonConfig.webSocketConstructor = WebSocket
  neonConfig.useSecureWebSocket = false
  neonConfig.pipelineTLS = false
  neonConfig.pipelineConnect = false
}
```

コンテナ構成は以下のように設定していた。

```yaml file="compose.yaml"
services:
  postgres:
    # ...
  pg_proxy:
    image: ghcr.io/neondatabase/wsproxy:latest@sha256:8f39545a476780f322aa8e581992de0554a4733ea755b8accf98687eed436152
    environment:
      APPEND_PORT: "postgres:5432"
      ALLOW_ADDR_REGEX: ".*"
      LOG_TRAFFIC: "true"
    ports:
      - "54330:80"
    depends_on:
      - postgres
```

localでは問題なく動作していたが、Docker上では ネットワークが異なるためhostやportを環境変数で制御する必要があった。
その設定のため`NEON_PROXY_HOST`と`NEON_PROXY_PORT`を環境変数として追加して試みたところ、取得できない問題にぶつかった。

---

## Devcontainer を作る

Devcontainerを作成するために、devcontainer.jsonを適当に用意し、compose.yamlを読み込むように設定。

```json file="devcontainer.json"
{
  "name": "Node.js & TypeScript",
  "dockerComposeFile": "../compose.yaml",
  "service": "devcontainer",
  "workspaceFolder": "/workspace",
  // ...
}
```

compose.yamlにdevcontainerの追記とnetwork設定を追加して、environmentで環境変数を指定。

```yaml file="compose.yaml"
services:
  // [!code ++:11]
  devcontainer:
    image: mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm
    volumes:
      - .:/workspace:cached
    command: sleep infinity
    networks:
      - devnetwork
    environment:
      DATABASE_URL: postgres://postgres:password@localhost:5432/db
      NEON_PROXY_PORT: 80
      NEON_PROXY_HOST: pg_proxy
  postgres:
    # ...
  pg_proxy:
    # ...
// [!code ++:3]
networks:
  devnetwork:
    driver: bridge
```

この状態で Devcontainer をビルドし、接続してみたが……

動かない...

環境変数`NEON_PROXY_HOST`と`NEON_PROXY_PORT`の値がundefinedになってしまう。
.env.developmentで設定すれば取得できるが、Devcontainerのみで使いたいので、それは避けたい。

---

## 環境変数が呼び出せない原因

最初はenvironmentの渡し方が問題かと思い、[公式ドキュメント](https://code.visualstudio.com/remote/advancedcontainers/environment-variables) を参考にenv_fileで試したが、やはり取得できなかった。

しかし、なぜかDATABASE_URLだけは取得できる状態だった。

色々試した結果、TurborepoのglobalEnv設定が影響していることが判明。

### 解決策

プロジェクトではTurborepoを使用しており、turbo.jsonにglobalEnvを設定していた。
デフォルトではDATABASE_URLのみを指定していたため、それ以外の環境変数はStrict Modeによって タスクの実行時に渡されていなかった。

[公式ドキュメント](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#strict-mode)にも記載がある。

> Strict Mode filters the environment variables available to a task’s runtime to only those that are specified in the globalEnv and env keys in turbo.json.
> This means that tasks that do not account for all of the environment variables that they need are likely to fail.
> This is a good thing, since you don’t want to cache a task that can potentially have different behavior in a different environment.

要するに、Strict ModeではglobalEnvに明示的に指定した環境変数しかタスクの実行時に渡されない仕様だった。

そのため、turbo.jsonに`NEON_PROXY_HOST`と`NEON_PROXY_PORT`を追加すれば解決する。

```json file="turbo.json"
{
  "$schema": "https://turbo.build/schema.json",
  "globalEnv": [
    "DATABASE_URL",
    // [!code ++:2]
    "NEON_PROXY_PORT",
    "NEON_PROXY_HOST"
  ]
}
```

これを追加すると、環境変数が無事取得できるようになった🎉

---

## まとめ

環境変数が取得できなかった原因

- TurborepoのStrict Modeにより、globalEnvに指定した変数しかタスクの実行時に渡されなかった。

解決策

- turbo.json の globalEnv に必要な環境変数を追加する。

Strict Modeはタスクのキャッシュ管理を適切にするための仕組みだけど、環境変数の適用範囲にも影響を与えることが分かった。意図せず環境変数が適用されないケースもあるので、Turborepo を使う場合は globalEnv の設定に注意したほうがよさそう。

---

## おまけ: コードの Syntax Highlight を変えた

[Expressive Code](https://expressive-code.com/installation/#astro) を試してみた。
remark や rehype で Markdown / HTML をいい感じに変換するの面白いし、[テキストマーカー](https://expressive-code.com/key-features/text-markers/) も使えて便利。
こういうのをプラグインとして開発できるように考えるのすごいな〜と思った。
