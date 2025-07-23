---
pubDatetime: 2025-02-06T03:24:24.109Z
title: リポジトリを綺麗にした
featured: true
draft: false
slug: repository-clean
tags:
- playground
description: 趣味で開発しているplaygroundのリポジトリを整理してみたよ
---

リポジトリを綺麗にした。めっちゃ適当なPRだけど。

- <https://github.com/hulk510/playground/pull/1448>

## やったこと

- リポジトリに入れていた、storybookやplaygroundのプロジェクトを丸ごと削除した。
- eslint, prettierからbiomeに移行した。

## やった経緯

最近playgroundリポジトリのメンテしてなくて、いろいろ古いものが残っていたので、整理してみた。
元々はこのリポジトリは自分が試したいものをとにかく色々試すリポジトリとして使っていたが、入れすぎて逆に触るのもめんどくさくなっていた。あと単純にplaygroundとしてreactを触ったりするんだったらstackblitzがあるのでそっちの方がいいかなと思った。

<iframe width="100%" height="300" src="https://stackblitz.com/edit/stackblitz-starters-da73fz5x?embed=1&file=README.md" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

↑ 上の例は動かないけど、まぁこんな感じでprojectを作成して、blogからも触れるのであれば別にわざわざplaygroundを作る必要はないかなと思った。

そうなると、このリポジトリは何のために使うのかというところになるが、それはそれで自分が適当に何かサービスを作りたいみたいな時に使えるのがいいかなと思う。認証やDB接続、その他stripeや他のAPIを使いたいみたいな時にも使えるし。terraformを使うがてらvercelにサービスをデプロイしたり自分が適当に作ってみたいサービスなんかをどんどん貯めていくのに使えるといいかなーというところ。

ひとまずは、そんなところかな。ブログはVercelでデプロイしているが、そこらへんの構築もこのリポジトリのinfraで管理するのもありかなーって思う。

## 終わりに

ブログを書いている人を見るとブログっていいなーって思うが、なかなか書く気になれない。最近はscrapboxとかにメモするのも減ってきている。あれは個人向けだけど、このブログはなんか誰かに向けて書くというのを意識して書いてみるのもいいかもしれないな。

なんせめんどくさいんですよね。

どうせだったらアフィリエイト等も入れてちゃんとブログとしてなんか適当に活動してみたいね。最近posthogも入れてアナリティクス試したりしているけど結構面白そうだし。
