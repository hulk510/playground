import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/cloudflare-workers';

const app = new Hono().get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      onMessage: (event) => {
        console.log(event.data);
      },
    };
  }),
);

export default app;
