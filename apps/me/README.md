# portal

ミニマムなポートフォリオ / link in bio サイト

## Setup

```bash
npm install
npm run dev
```

## 設定

`src/config.ts` を編集するだけ:

```ts
export const config = {
  name: 'haruka',
  tagline: 'engineer & creator',
  avatar: '/avatar.jpg',  // or null

  links: [
    { label: 'blog', url: 'https://haruka.dad' },
  ],

  works: [
    {
      name: 'mikke',
      description: '場所を記録する',
      url: 'https://...',
      type: 'app',
      status: 'live',
    },
  ],

  socials: [
    { platform: 'x', url: 'https://x.com/haruka' },
  ],

  theme: {
    accent: '#a08bc4',
    accentLight: '#d4c6e6',
  },
}
```

## Deploy

```bash
npm run build
# dist/ をデプロイ
```
