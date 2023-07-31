import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const router = new Router();

router.get('/test', (ctx) => {
  ctx.response.body = { message: "ogey" };
});

export default router;