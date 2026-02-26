import { Redis } from '@upstash/redis'

export const config = { runtime: 'edge' }

const redis = Redis.fromEnv()

export default async function handler(_req: Request): Promise<Response> {
  try {
    const count = await redis.incr('me:visitor-count')
    return new Response(JSON.stringify({ count }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ count: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
