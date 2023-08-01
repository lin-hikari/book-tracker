import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';
import { Controller } from '../controllers/controller.ts';

const router: Router = new Router();

router.get('/test', (ctx) => {
  ctx.response.body = { message: "ogey" };
});

router.get('/api-test', async (ctx) => {
  //change to env var
  const apiRes = await fetch("https://www.googleapis.com/books/v1/volumes?q=i+love+you+like+no+otter&key=" + Deno.env.get("GOOGLE_API_KEY"));
  const apiData = await apiRes.json();
  const title = apiData.items[0].volumeInfo.title;
  const description = apiData.items[0].volumeInfo.description;
  ctx.response.body = { title: title, description: description };
});

export default router;