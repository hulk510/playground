import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export default async function handler(
  _req: Request,
): Promise<Response> {
  const count = await redis.incr('me:visitor-count')
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
