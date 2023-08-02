export let apiTest = async (ctx) => {
  const apiRes = await fetch("https://www.googleapis.com/books/v1/volumes?q=i+love+you+like+no+otter&key=" + Deno.env.get("GOOGLE_API_KEY"));
  const apiData = await apiRes.json();
  const title = apiData.items[0].volumeInfo.title;
  const description = apiData.items[0].volumeInfo.description;
  ctx.response.body = { title: title, description: description };
};
