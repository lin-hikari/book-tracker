import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import "https://deno.land/std@0.196.0/dotenv/load.ts"; //loads env vars

import router from "./routes/routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
