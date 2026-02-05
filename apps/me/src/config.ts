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
    { label: 'mail', url: 'mailto:dorian.51069@gmail.com' },
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
      name: 'playground',
      description: 'モノレポで色々試す場所',
      url: 'https://github.com/hulk510/playground',
      type: 'repo',
      status: 'dev',
      pinned: true,
    },
    {
      name: 'kids portal',
      description: 'こども向けポータルサイト',
      url: 'https://kids.haruka.dad',
      type: 'site',
      status: 'live',
    },
    {
      name: 'kaomoji keyboard',
      description: '顔文字キーボード',
      url: 'https://github.com/hulk510/kaomoji-keyboard',
      type: 'app',
      status: 'dev',
    },
  ],

  socials: [
    { platform: 'x', url: 'https://x.com/kcash510' },
    {
      platform: 'bluesky',
      url: 'https://bsky.app/profile/hulk510.bsky.social',
    },
  ],

  theme: {
    accent: '#9b8fc4',
    accentLight: '#e8e4f3',
  },

  initialVisible: {
    works: 3,
  },
}
