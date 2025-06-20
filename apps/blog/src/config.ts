export const SITE = {
  website: 'https://haruka.dad/',
  author: 'Haruka Goto',
  profile: 'https://haruka.dad/about',
  desc: "Haruka Daddy's Blog",
  title: 'Haruka Daddy',
  ogImage: 'og-image.jpg',
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: 'Suggest Changes',
    url: 'https://github.com/hulk510/playground/edit/main/',
  },
  dynamicOgImage: true,
  dir: 'ltr', // "rtl" | "auto"
  lang: 'ja', // html lang code. Set this empty and default will be "en"
  timezone: 'Asia/Tokyo', // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const
