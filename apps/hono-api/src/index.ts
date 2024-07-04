import { Hono } from 'hono';
import { upgradeWebSocket } from 'hono/cloudflare-workers';

const app = new Hono().get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      onMessage: (event, ws) => {
        console.log(event.data);
        ws.send(event.data);
      },
    };
  }),
);

export default app;
