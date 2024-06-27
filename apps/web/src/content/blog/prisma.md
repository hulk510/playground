---
pubDatetime: 2024-06-19T05:40:47.644Z
title: prismaを使ってみた
featured: true
draft: false
tags:
  - playground
description: DBのORMのPrismaを単純な興味からPlaygroundに入れてみた。
---

<https://github.com/hulk510/playground/pull/545>

prismaを使ってみたかったので、特に何かに使うわけではないが適当に入れてみた。

## 接続先の設定

prismaは.envの内容を読んでschemaを登録するDBを決めれる。
<https://www.prisma.io/docs/orm/more/development-environment/environment-variables/env-files#env-file-locations>

ただ、nextjsみたいに.env.localとかは無理そう。

開発時は開発用のDBに繋げて、本番環境に上げる時に、ciの環境変数で本番用のDBをセットするのが良さそう。
ワイはvercelのbuild後にdb migrate deployをやるようにしたら今のところはいい感じ。

```turbo.json
    "build": {
      "dependsOn": ["^build", "^db:generate"],
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        "storybook-static/**",
        "dist/**"
      ],
      "env": ["DATABASE_PRISMA_URL"]
    },
```

turbo.jsonでenvを渡せば、変えれてそうなので接続先のDBに関してはこんな感じで渡してあげる。そして/apps配下のアプリケーションでenvを渡してあげれば良さそう。

prisma単体で動かす場合はこれだと環境を分けたりできないので悩ましいところ。
取り急ぎそこまで複数環境で動作させたいみたいなのはないのでそこまで考えてないのでスルーした。

## prismaのコマンドの違い

何やら色々コマンドがあったので適当にわかったことを残しておく。

- prisma db push

migrationを作成しないだけでdbのschemaを適用させる。開発途中だとマイグレーションファイルを作る前に色々変えたりしたいから試行錯誤するためになってる感じかな？

- prisma generate

prisma clientのnode_modulesに設定したschemaのメソッドみたいなのが作られる。それをimportすることで制御できるみたい。

```schema.prisma
model Todo {
  id      String @id @default(cuid())
  content String
}
```

```ts
import { PrismaClient } from './client';
import type { Todo } from '@prisma/client';

const prisma = new PrismaClient();

prisma.todo.create({});
```

こんな感じでprismaに生えて操作できる、ちなみに型とかもschemaで定義されているものが反映されるのでschemaに登録されてる必須な値はないとエラーになったりと結構便利感

- prisma db migrate dev

pushではmigrationを作成しないけど、このdb migrate devでマイグレーションを作成できる。そのままdbに接続して構造を変えるみたいなのもやってるっぽい？
db pushでずっと開発してしまうと構造変えるにあたってデータ消えたりもするからある程度確定したらmigrateしておくのが良さそう。
コミットする段階では少なくともマイグレーションを作成している必要がある。

- prisma db migrate deploy

db migrate devでマイグレーションを作成して、このdeployで本番とかの環境のDBに適用する。
正直db migrate devでもできなくはなさそうだけど、違いはなんなのかな？

- prisma studio

dbに保存されてる値を見たりできるツールみたいなの、phpmyadminだっけああいうdbのデータ確認するツールって感じがする。
