---
pubDatetime: 2024-07-16T07:33:08.279Z
title: 新しいdotfilesできた
featured: true
draft: true
tags:
  - 適当
description: chezmoiを使って管理されたdotfilesをようやく形になったよ
---

## リポジトリ

[dotfiles](https://github.com/hulk510/dotfiles)

## 感想

もともといくつかchezmoiを使ってたんだけど、makefileとかで実行している箇所もあったのでそこら辺を全てchezmoiのrun scriptでできるようにした。

何と言ってもinstall.shでインストールできるようにしたことが一番嬉しい。
これをやりたかったまであるしいけてるエンジニアはワンラインで入れてるのをみてたので感動。（もはやchezmoi関係ない）

templateのchezmoi dataみたいなのを管理すると共通の環境変数みたいなのを定義できるみたいなのでできるみたいで仕事用の設定とか他にも可変な箇所はそういうので置き換えるみたいなのができるといいなと思った。

## 設定は必要最小限がいい気がする

dotfilesの設定をしてて思ったのが、異なる環境でも使うってことを考えると全部入りとか全て入れてやるの
