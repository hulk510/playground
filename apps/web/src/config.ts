import type { Site, SocialObjects } from './types';

export const SITE: Site = {
  website: 'https://haruka.dad/', // replace this with your deployed domain
  author: 'Haruka Goto',
  desc: "Haruka Daddy's Blog",
  title: 'Haruka Daddy',
  ogImage: 'og-image.jpg',
  lightAndDarkMode: true,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: 'ja', // html lang code. Set this empty and default will be "en"
  langTag: ['ja-JP'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: 'Github',
    href: 'https://github.com/hulk510',
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/hulk510/',
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: 'Mail',
    href: 'mailto:dorian.51069@gmail.com',
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/kcash510',
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: 'Twitch',
    href: '',
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: 'YouTube',
    href: '',
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/djhUzrG2vu',
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
  {
    name: 'Reddit',
    href: 'https://reddit.com/user/hulk510/',
    linkTitle: `${SITE.title} on Reddit`,
    active: true,
  },
  {
    name: 'Zenn',
    href: 'https://zenn.dev/hulk510',
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
];
