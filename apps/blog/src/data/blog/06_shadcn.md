---
pubDatetime: 2024-06-19T05:40:47.644Z
title: shadcnをmonorepoに入れてみた
featured: false
draft: false
slug: shadcn
tags:
  - playground
description: いまだに読み方がわからないshadcnをplaygroundに入れてみた。
---

## shadcn/ui

tailwind cssであらかじめコンポーネント実装しといたからコピペして使ってな！みたいな感じ
説明が難しいけど、material uiみたいなコンポーネントをインストールしてそのコンポーネントを使うみたいなライブラリではない。

headless uiって概念とも違うし。

コンポーネントを追加したら、あとは自由に書き換えたりできるし追加したりもできる。ui部分のコンポーネントに関してはradix-uiを使ってるみたいだけどそれらを組み合わせて作ってる部分に関してはカスタマイズできそうな感じがある。

今回はそれをmonorepoに入れてみた。

## shadcn/uiでのmonorepoでコンポーネント追加にハマる

インストール方法は省略するが、コンポーネントを追加する場合は初期設定で作成されたcomponents.jsonに書いてあるpathにインストールされる。
追加に関してはshadcn/uiは`npx shadcn-ui@latest add`ってコマンドで自由に追加したりできる。

しかし追加しようと思ったらいくつかハマった。今は一応動いてそう？なのでやったことをまとめておく。

### importした後のlib/utilsが見つからないと怒られたときのpathの解決方法

公式のやり方そのままやろうとするとpathが解決できなくて怒られる。具体的にはpackages/uiの中でコンポーネントを作成してそれをapps/webみたいなサービスでimportしようとした時に起こった。
![failed to compile](https://gyazo.com/e2cb4b832e82692e96d1d6410bb6d432.png)

lib/utilsが見つからないみたいなエラーが出ている。
turboのドキュメントで[just-in-time-packages](https://turbo.build/repo/docs/core-concepts/internal-packages#just-in-time-packages)のところに書いてあるけど、compilerOptions.pathsで設定しているものは使用する側ではtranspileされてることを期待しているから使えないみたい。

> No TypeScript paths: A library that is being transpiled by its consumer cannot use the compilerOptions.paths configuration because TypeScript assumes that source code is being transpiled in the package where it is written. If you're using Typescript 5.4 or later, we recommend using Node.js subpath imports.

#### 解決方法

tsconfig.json, package.json, components.jsonを最終こんな感じで記載して解決した。
参考にしたのはこの辺り。

- <https://github.com/vercel/turbo/discussions/4304>

packages/ui/components.json

```json file="packages/ui/components.json"
{
  "$schema": "<https://ui.shadcn.com/schema.json>",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "./dist/index.css",
    "baseColor": "gray",
    "cssVariables": true,
    "prefix": "ui-"
  },
  "aliases": {
    "components": "#components",
    "utils": "#deps/lib/utils"
  }
}
```

packages/ui/package.json

```json file="packages/ui/package.json"
  ...
  "exports": {
    "./*": "./src/components/*.tsx",
    "./shadcn/*": "./src/components/ui/*.tsx",
    "./types": "./src/types/index.ts",
    "./styles.css": "./dist/index.css"
  },
  "imports": {
    "#deps/lib/*": "./src/lib/*.ts",
    "#types": "./src/types/index.ts",
    "#components/ui/*": "./src/components/ui/*.tsx"
  },
  ...
```

packages/ui/tsconfig.json

```json file="packages/ui/tsconfig.json"
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "rootDir": "./",
    "paths": {
      "#*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

あまり理解していないが、とりあえず[subpath imports](https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/#auto-import-support-for-subpath-imports)で解決しろと書いてある。
→ ざっくりだけどimportsに記載してあると、リマップしてpathを解決してくれるみたいなイメージかな？

なのでpackage.jsonでimportsにsubpathの指定を書く。`src/lib/*.ts`にマッチするものを全て`#deps/lib/*`でimportするって書いてたら使う側で適当に解決してくれるっぽい。

```typescript file="packages/ui/components/ui/accordion.tsx"
'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '#deps/lib/utils';

const Accordion = AccordionPrimitive.Root;
```

packages/uiのコンポーネント内部でこのようにimportしてあげると、Accordionコンポーネントをapp/web側で使う時に解決してくれる。

この指定だけだとpackages/ui上でのpathを解決できなくなるので、tsconfig.jsonのcompilerOptions.pathsで`#*`をつけた時の解決先を明記しておく。
こうすればどっちもちゃんと解決してくれる。

あとはcomponents.jsonだけどこれに関しては、shadcnでコンポーネントを追加する時に最初から指定してもらうために書く。defaultのままだといちいち書き換えないといけないためめんどくさい。

```json
  "aliases": {
    "components": "#components",
    "utils": "#deps/lib/utils"
  }
```

こうしておくと、utilsのimport部分は#deps/lib/utils、componentsを配置するのは#components（つまりsrc/components/の中）においてくれるようになる。

ちなみにsubpath importsを使う場合は`#`で始めないとダメみたい。

ややこしいのは、apps側でimportして使うコンポーネントに関してはexportsで指定されてる（これはjust-in-time-packagesの方かな）必要があって、そのコンポーネントがimport先のコンポーネントをimportしてる場合とかにimportsの指定が必要ってイメージ。

そもそもエイリアスのpathを指定してなくて、相対pathとか絶対pathならエラー出ないのでそれでできるならそれでもいいのかなーと言う感じ。

shadcnでコンポーネントを追加する時になんかエイリアスが必要そうだったので、エイリアスを指定しつつ解決してくれるみたいな解決策を探したけど見つかってよかった。

> もしかしたら、aliasを削除するとかもできるのかな？

### contentが違うものを当てるとborder-borderのdirectiveが見つからないみたいなエラーで怒られる

これはmonorepoにする時に、tailwind.config.tsをプロジェクトごとに分けたんだけど、分けるためにprefixにui-を含めていた。
分けて定義したのに関しては[turboのexample](https://github.com/vercel/turbo/tree/main/examples/with-tailwind)みてやった。

プロジェクトごとに分けないと、vscodeのautocompleteがうまく発火してくれなかったので分けた。

その結果、shadcnを設定する時にtailwind.config.tsの設定があるんだけどそれがapps側で読み込めなくてエラーになっていた。
これに関しては、components.jsonでprefixに"ui-"ってつけてくれるのでそれをつけると治った。その際、shadcnの設定系はpackages/ui/tailwind.config.tsの方のみ書いてあげるといい。

```apps/web/src/layout.tsx
import '@repo/ui/styles.css';
import './globals.css';
```

最終的にはこんな感じでpackage側のcssとweb用のglobals.cssを両方importしてあげるといい感じに動いた。

### 微妙な点

packagesごとにtailwind.config.tsを分けたからなのか、`"dev": "tailwindcss -i ./src/globals.css -o ./dist/index.css --watch",`のtaskを一緒に動かして常にindex.cssを生成してないといけないこと。なぜかわからんがこれがないと、packages側のshadcnのstyleが適切に当たらない。
変更がうまく反映されないからな気もするけど、このdevを動かさないと確認できないのは地味に不便。`pnpm dev --filter web`でwebだけ動かしたい時にstyleが当たってくれなくなるため。いいやり方ないので今んところはこれで妥協

とりあえずshadcn/uiが動いた！！
あとは色々追加してまた遊んでみようかなと思う。
