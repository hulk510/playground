## What's inside?

完全に私の趣味で作っているリポジトリ、フロントエンドの開発がほとんどなのと基本的におんなじものをよく作るのでmonorepoとしてそれらをまとめて好きなように作ったらいいんじゃないかという発想で生まれた。基本的にパッケージはpackage.jsonに書かなくても動くがわかりづらいので必要なくても明示してpackageを追加している。

This Repo includes the following packages/apps:

### Apps and Packages

- `docs`: 自分で作ったコンポーネントとかをnextraに載せてポートフォリオチックなdocumentサイトって感じ。
- `web`: ブログとか他のサイトに飛ばすメインのサイトかな
- `playground`: `@repo/sandbox`で適当に作ったコンポーネントを表示したり、色々実験的なのを反映したりするようのサイト
- `storybooks`: 特に用途は決まってない
- `@repo/sandbox`: とりあえず適当に試したり適当にコンポーネントを作ったりとにかく適当
- `@repo/ui`: UIように作成している共通のコンポーネントを入れるところ
- `@repo/stylelint-config`: `stylelint`のconfig（@repo/configに統一したい）
- `@repo/tailwind-config`: `tailwind css`のconfig（@repo/configに統一したい）
- `@repo/eslint-config`: `eslint`のconfig（@repo/configに統一したい）
- `@repo/typescript-config`: `typescript`のconfig（@repo/configに統一したい）

## My Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [Monorepo Handbook](https://turbo.build/repo/docs/handbook)

Prettier:

- [Prettier Options](https://prettier.io/docs/en/options)

Renovate:

- [Reading List](https://docs.renovatebot.com/reading-list/)

Kuma UI:

- [Docs](https://www.kuma-ui.com/docs)
