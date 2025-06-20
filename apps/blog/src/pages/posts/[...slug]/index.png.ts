import { type CollectionEntry, getCollection } from 'astro:content'
import { SITE } from '@/config'
import { generateOgImageForPost } from '@/utils/generateOgImages'
import { getPath } from '@/utils/getPath'
import type { APIRoute } from 'astro'

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return []
  }

  const posts = await getCollection('blog').then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage),
  )

  return posts.map((post) => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: post,
  }))
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    })
  }

  return new Response(
    await generateOgImageForPost(props as CollectionEntry<'blog'>),
    {
      headers: { 'Content-Type': 'image/png' },
    },
  )
}
