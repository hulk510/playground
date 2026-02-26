import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(_req: Request): Promise<Response> {
  const count = await redis.incr('me:visitor-count')
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
