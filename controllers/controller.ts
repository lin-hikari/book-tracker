import { User, Book } from "../models/user.ts";
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "book-tracker",
  poolSize: 3, // connection limit
  password: Deno.env.get("MYSQL_PASSWORD"),
});

const users: User[] = [];

// export let createUser = async (ctx) => {
//   const reqBody = await ctx.request.body().value;
//   const name = reqBody.name

//   let newUser = new User(name);
//   users.push(newUser);
//   ctx.response.body = { message: "User created!", user: newUser };
// };

export let createUser = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const name = reqBody.name;

  let result = await client.execute(`INSERT INTO users(name) values(?)`, [
    name,
  ]);
  console.log(result);
  ctx.response.body = { message: "User created!", user: name };
};

export let viewUsers = async (ctx) => {
  ctx.response.body = { users: users };
};

export let findUser = async (ctx) => {
  const username = ctx.params.username;

  const foundUser = users.find((user) => user.name === username);
  if (foundUser) ctx.response.body = { user: foundUser };
  else ctx.response.body = { message: "No user found!" };
};

export let addBook = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const username: string = reqBody.username;
  const searchTerms: string = reqBody.searchTerms;

  const userIndex: number = users.findIndex((user) => user.name === username);
  if (userIndex === -1) {
    ctx.response.body = { message: "No user found!" };
    return;
  }

  let apiQuery: string = "";
  apiQuery += "https://www.googleapis.com/books/v1/volumes?q=";
  apiQuery += searchTerms;
  apiQuery += "&key=" + Deno.env.get("GOOGLE_API_KEY");
  const apiRes = await fetch(apiQuery);
  const apiData = await apiRes.json();
  if (apiData.totalItems === 0) {
    ctx.response.body = { message: "No book found!" };
    return;
  }

  const bookTitle = apiData.items[0].volumeInfo.title;
  const bookPages = apiData.items[0].volumeInfo.pageCount;
  const newBook: Book = new Book(bookTitle, bookPages);

  users[userIndex].books.push(newBook);
  ctx.response.body = {
    message: "Book added to user!",
    user: users[userIndex],
  };
};
