import IconBrandX from '@/assets/icons/IconBrandX.svg'
import IconFacebook from '@/assets/icons/IconFacebook.svg'
import IconGitHub from '@/assets/icons/IconGitHub.svg'
import IconLinkedin from '@/assets/icons/IconLinkedin.svg'
import IconMail from '@/assets/icons/IconMail.svg'
import IconPinterest from '@/assets/icons/IconPinterest.svg'
import IconTelegram from '@/assets/icons/IconTelegram.svg'
import IconWhatsapp from '@/assets/icons/IconWhatsapp.svg'
import { SITE } from '@/config'
import type { Props } from 'astro'

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
    name: 'X',
    href: 'https://x.com/kcash510',
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hulk510/',
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
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
    name: 'WhatsApp',
    href: 'https://wa.me/?text=',
    linkTitle: 'Share this post via WhatsApp',
    icon: IconWhatsapp,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharer.php?u=',
    linkTitle: 'Share this post on Facebook',
    icon: IconFacebook,
  },
  {
    name: 'X',
    href: 'https://x.com/intent/post?url=',
    linkTitle: 'Share this post on X',
    icon: IconBrandX,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/share/url?url=',
    linkTitle: 'Share this post via Telegram',
    icon: IconTelegram,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/pin/create/button/?url=',
    linkTitle: 'Share this post on Pinterest',
    icon: IconPinterest,
  },
  {
    name: 'Mail',
    href: 'mailto:?subject=See%20this%20post&body=',
    linkTitle: 'Share this post via email',
    icon: IconMail,
  },
] as const
