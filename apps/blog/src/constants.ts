import type { Props } from 'astro'
import IconBrandX from '@/assets/icons/IconBrandX.svg'
import IconCopy from '@/assets/icons/IconCopy.svg'
import IconGitHub from '@/assets/icons/IconGitHub.svg'
import IconHatena from '@/assets/icons/IconHatena.svg'
import IconInstagram from '@/assets/icons/IconInstagram.svg'
import IconLine from '@/assets/icons/IconLine.svg'
import IconMail from '@/assets/icons/IconMail.svg'
import IconThreads from '@/assets/icons/IconThreads.svg'
import { SITE } from '@/config'

interface Social {
  name: string
  href: string
  linkTitle: string
  icon: (_props: Props) => Element
}

export const SOCIALS: Social[] = [
  {
    name: 'Github',
    href: 'https://github.com/hulk510/playground',
    linkTitle: `${SITE.title} on Github`,
    icon: IconGitHub,
  },
  {
    name: 'Threads',
    href: 'https://www.threads.net/@haruka.v1',
    linkTitle: `${SITE.title} on Threads`,
    icon: IconThreads,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/haruka.v1',
    linkTitle: `${SITE.title} on Instagram`,
    icon: IconInstagram,
  },
  {
    name: 'Mail',
    href: 'mailto:dorian.51069@gmail.com',
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const

export const SHARE_LINKS: Social[] = [
  {
    name: 'X',
    href: 'https://x.com/intent/post?url=',
    linkTitle: 'Xでシェア',
    icon: IconBrandX,
  },
  {
    name: 'Hatena',
    href: 'https://b.hatena.ne.jp/entry/',
    linkTitle: 'はてなブックマークに追加',
    icon: IconHatena,
  },
  {
    name: 'LINE',
    href: 'https://social-plugins.line.me/lineit/share?url=',
    linkTitle: 'LINEでシェア',
    icon: IconLine,
  },
  {
    name: 'Copy',
    href: '#copy',
    linkTitle: 'リンクをコピー',
    icon: IconCopy,
  },
  {
    name: 'Mail',
    href: 'mailto:?subject=See%20this%20post&body=',
    linkTitle: 'メールでシェア',
    icon: IconMail,
  },
] as const
