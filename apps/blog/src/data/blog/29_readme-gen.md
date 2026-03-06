---
pubDatetime: 2026-01-30T19:54:00+09:00
title: 'readme-genを作ってみた'
featured: true
slug: readme-gen
draft: false
tags:
  - 個人開発
  - AI
description: Claude Codeを活用してGitHubリポジトリのREADME自動生成ツールを作った話。
---

## readme-genとは

readme-genは、GitHubリポジトリのREADMEを自動生成するツール。リポジトリの内容を分析して、概要やインストール方法、使い方なんかを含むREADMEを生成してくれる。

ドキュメント作成を楽にして、コードに集中できるようにしたかった。READMEってプロジェクトの第一印象を決める大事な部分なので、そこを簡単にしたいなと。

https://github.com/hulk510/readme-gen

## とかまぁいってみたが

正直、作ったは作ったけど現状あまり使っていない。

作った動機としては、Claude Codeはスキルを使ったりプログラムから呼び出したりできるので、AI呼び出しの実装を自前でやらずにAIエージェントを動かせるってところ。利用料もかからないし、ローカルにインストールされてる必要はあるけど、それでも便利だなーと思った。動くもの作ってみたくて、こんな感じのツールを作ってみた。
