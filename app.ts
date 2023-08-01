import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import "https://deno.land/std@0.196.0/dotenv/load.ts"; //loads env vars

import testRoutes from './routes/testRoutes.ts';

const app = new Application();

app.use(async (ctx, next) => {
  console.log('Middleware test');
  await next();
});

app.use(testRoutes.routes());
app.use(testRoutes.allowedMethods());

await app.listen({ port: 3000 });