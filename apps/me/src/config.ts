export interface Link {
  label: string
  url: string
}

export type WorkType = 'app' | 'repo' | 'product' | 'service' | 'site'
export type WorkStatus = 'live' | 'dev' | 'dormant' | 'archived'

export interface Work {
  name: string
  url: string
  type: WorkType
  status?: WorkStatus
  pinned?: boolean
  description?: string
  tech?: string[]
  why?: string
  repoUrl?: string
  lang?: string
}

export interface Social {
  platform: string
  url: string
}

export interface Theme {
  accent: string
  accentLight: string
}

export interface Config {
  name: string
  tagline?: string
  bio?: string
  avatar?: string | null
  into?: string[]
  links: Link[]
  works: Work[]
  socials: Social[]
  theme?: Theme
}

export const config: Config = {
  name: 'haruka',
  tagline: '気持ちはエンジニア',
  bio: 'ゆるく生きるが目標。気になったらとりあえず作ってみる。',
  avatar: '/avatar.jpg',

  into: ['testing', 'dx', 'self-hosting', 'k3s', 'shipping fast'],

  links: [
    { label: 'blog', url: 'https://haruka.dad' },
    { label: 'portfolio', url: '#/portfolio' },
    { label: 'github', url: 'https://github.com/hulk510' },
  ],

  works: [
    {
      name: 'mikke',
      url: 'https://mikke.app',
      type: 'app',
      status: 'live',
      pinned: true,
      description:
        '位置情報ベースの写真共有サービス。気になった場所をマップ上にピンで残して、家族や友達と共有できる。Web とモバイル両方あり。',
      tech: [
        'Next.js',
        'Expo',
        'React Native',
        'Prisma',
        'Mapbox',
        'Zitadel',
        'Anthropic API',
      ],
      why: '妻と話していて、インスタに載せるほどじゃないけど行った場所を記録しておきたい、というのを叶えたかった。',
    },
    {
      name: 'ギャルボ',
      url: 'https://apps.apple.com/jp/app/%E3%82%AE%E3%83%A3%E3%83%AB%E3%83%9C/id6758966594',
      type: 'app',
      status: 'live',
      pinned: true,
      description:
        'ギャル文字をそのまま入力できる iOS カスタムキーボード。普通のキーボードと同じ感覚で「ぁレ」「ヶレ」みたいな文字が打てる。',
      tech: ['SwiftUI', 'Keyboard Extension'],
      why: '友達が「作ってほしい」って言ったから。',
    },
    {
      name: 'ぶっちゃKEYO!!',
      url: 'https://bucchakeyo.com',
      type: 'site',
      status: 'dormant',
      pinned: true,
      description:
        'カップル・夫婦・友達で「相手をどれだけ知ってる？」を遊ぶサービス。AI がテーマに沿った質問を生成、答え合わせで意外な「好き」を発見できる。登録不要で URL を送るだけ。',
      tech: [
        'Next.js',
        'Tailwind v4',
        'Turso',
        'Drizzle',
        'Claude API',
        'Framer Motion',
        'Vercel',
      ],
      why: '暇つぶしに、実際お互いどれだけ知ってるんやっけを試したかった。AI が間に入れば際どい質問でも喧嘩にならないかなと思って。',
    },
    {
      name: 'kids portal',
      url: 'https://kids.haruka.dad',
      type: 'site',
      status: 'live',
      description:
        '3歳児向けの遊びポータル。iPad でタップ・ドラッグで直感的に遊べるミニゲーム集。',
      tech: ['Vite', 'React 19', 'PixiJS', 'Tailwind v4', 'Zustand', 'PWA'],
    },
    {
      name: 'mod-ui/modui',
      url: 'https://github.com/mod-ui/modui',
      type: 'repo',
      status: 'dev',
      description:
        'shadcn/ui スタイルの React コンポーネント集。Tailwind ではなく CSS Modules + CSS Custom Properties で書ける。コピペで使う CLI 配布。',
      lang: 'TypeScript',
    },
  ],

  socials: [
    { platform: 'instagram', url: 'https://www.instagram.com/haruka.v1' },
    { platform: 'threads', url: 'https://www.threads.net/@haruka.v1' },
  ],

  theme: {
    accent: '#9b8fc4',
    accentLight: '#e8e4f3',
  },
}
