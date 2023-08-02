import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';
import * as controller from '../controllers/controller.ts';

const router: Router = new Router();

router.get('/test', (ctx) => {
  ctx.response.body = { message: "ogey" };
});

router.get('/api-test', controller.apiTest);

export default router;