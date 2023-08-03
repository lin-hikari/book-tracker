import { User, Book } from '../models/user.ts';

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

export let addBook = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const username: string = reqBody.username;
  const searchTerms: string = reqBody.searchTerms;

  const userIndex: number = users.findIndex((user) => user.name === username);
  if(userIndex === -1) {
    ctx.response.body = { message: "No user found!" };
    return;
  }

  let apiQuery: string = "";
  apiQuery += "https://www.googleapis.com/books/v1/volumes?q=";
  apiQuery += searchTerms;
  apiQuery += "&key=" + Deno.env.get("GOOGLE_API_KEY");
  const apiRes = await fetch(apiQuery);
  const apiData = await apiRes.json();
  if(apiData.totalItems === 0) {
    ctx.response.body = { message: "No book found!" };
    return;
  }
  const bookTitle = apiData.items[0].volumeInfo.title;
  const bookPages = apiData.items[0].volumeInfo.pageCount;
  const newBook: Book = new Book(bookTitle, bookPages);

  users[userIndex].books.push(newBook);
  ctx.response.body = { message: "Book added to user!", user: users[userIndex] };
};
