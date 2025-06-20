import { getCollection } from 'astro:content'
import { SITE } from '@/config'
import { getPath } from '@/utils/getPath'
import getSortedPosts from '@/utils/getSortedPosts'
import rss from '@astrojs/rss'

export async function GET() {
  const posts = await getCollection('blog')
  const sortedPosts = getSortedPosts(posts)
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  })
}
