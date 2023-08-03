import { User } from '../models/user.ts';

const users: User[] = [];

export let apiTest = async (ctx) => {
  const apiRes = await fetch("https://www.googleapis.com/books/v1/volumes?q=i+love+you+like+no+otter&key=" + Deno.env.get("GOOGLE_API_KEY"));
  const apiData = await apiRes.json();
  const title = apiData.items[0].volumeInfo.title;
  const description = apiData.items[0].volumeInfo.description;
  ctx.response.body = { title: title, description: description };
};

export let createUser = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  let newUser = new User(reqBody.name);
  users.push(newUser);
  ctx.response.body = { message: "User created!", user: newUser };
};

export let viewUsers = async (ctx) => {
  ctx.response.body = { users: users };
};

export let findUser = async (ctx) => {
  const nameSearch = await ctx.params.username;
  const foundUser = users.find((user) => user.name === nameSearch);
  if(foundUser) ctx.response.body = { user: foundUser };
  else ctx.response.body = { message: "No user found!" };
};
