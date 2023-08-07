import { User } from "../models/user.ts"; //to be removed

const users: User[] = []; //to be removed

export let createUser = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const name = reqBody.name;

  let newUser = new User(name);
  await newUser.save();
  ctx.response.body = { message: "User created!", user: newUser };
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
