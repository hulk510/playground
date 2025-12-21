export interface LinkConfig {
  url: string
  label: string
  note: string
}

export interface ProjectConfig {
  id: string
  name: string
  desc: string
  status: string
  url?: string
  note: string
}

export interface SiteConfig {
  name: string
  tagline: string
  location: string
  build: string
  links: Record<string, LinkConfig>
  projects: ProjectConfig[]
  modules: string[]
  contact: {
    url: string
    responseTime: string
    note: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'HARUKA',
  tagline: 'FREELANCE ENGINEER / INDIE DEVELOPER',
  location: 'TOKYO/JP',
  build: '2025.01',

  links: {
    github: {
      url: '#',
      label: 'GitHub',
      note: 'ソースはここ',
    },
    bluesky: {
      url: '#',
      label: 'Bluesky',
      note: 'メイン生息地',
    },
    x: {
      url: '#',
      label: 'X',
      note: 'たまに見る',
    },
    sponsors: {
      url: '#',
      label: 'Sponsors',
      note: '支援ポート',
    },
  },

  projects: [
    {
      id: 'mikke',
      name: 'MIKKE',
      desc: 'Location-based Photo App',
      status: 'TestFlight',
      note: '一番育ててるやつ',
    },
    {
      id: 'blog',
      name: 'haruka.dad',
      desc: 'Development Notes & Thoughts',
      status: 'Active',
      url: 'https://haruka.dad',
      note: '思考のダンプ先',
    },
  ],

  modules: [
    'React Native',
    'TypeScript',
    'Next.js',
    'PostgreSQL',
    'Turso',
    'CloudKit',
  ],

  contact: {
    url: '#',
    responseTime: '~48hrs',
    note: 'お仕事の相談など',
  },
}
