export interface Link {
  label: string
  url: string
}

export type WorkType = 'app' | 'repo' | 'product' | 'service' | 'site'
export type WorkStatus = 'live' | 'dev' | 'archived'

export interface Work {
  name: string
  description: string
  url: string
  type: WorkType
  status?: WorkStatus
  pinned?: boolean
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
  initialVisible?: {
    works?: number
  }
}

export const config: Config = {
  name: 'haruka',
  tagline: '気持ちはエンジニア',
  bio: 'ゆるく生きるが目標。気になったらとりあえず作ってみる。',
  avatar: '/avatar.jpg',

  into: ['testing', 'dx', 'self-hosting', 'k3s', 'shipping fast'],

  links: [
    { label: 'blog', url: 'https://haruka.dad' },
    { label: 'github', url: 'https://github.com/hulk510' },
  ],

  works: [
    {
      name: 'mikke',
      description: '地図に写真を残すSNS',
      url: 'https://mikke.app',
      type: 'app',
      status: 'live',
      pinned: true,
    },
    {
      name: 'ギャルボ',
      description: 'ギャル文字キーボード',
      url: 'https://apps.apple.com/jp/app/%E3%82%AE%E3%83%A3%E3%83%AB%E3%83%9C/id6758966594',
      type: 'app',
      status: 'live',
      pinned: true,
    },
    {
      name: 'kids portal',
      description: 'こども向けポータルサイト',
      url: 'https://kids.haruka.dad',
      type: 'site',
      status: 'live',
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

  initialVisible: {
    works: 3,
  },
}
