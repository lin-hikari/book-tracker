import { User } from "../models/user.ts";
import { Book } from "../models/book.ts";

export let createUser = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const name = reqBody.name;

  let newUser = new User(name);
  await newUser.save();
  ctx.response.body = { message: "User created!", user: newUser };
};

export let findUser = async (ctx) => {
  const username = ctx.params.username;

  const foundUser: User = await User.findUser(username);
  if (foundUser) ctx.response.body = { user: foundUser };
  else ctx.response.body = { message: "No user found!" };
};

export let addBook = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const username: string = reqBody.username;
  const searchTerms: string = reqBody.searchTerms;

  const foundUser: User = await User.findUser(username);
  if (!foundUser) {
    ctx.response.body = { message: "No user found!" };
    return;
  }
  const userId: number = foundUser.user_id;

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
  const newBook: Book = new Book(bookTitle, bookPages, userId);
  await newBook.save();
  ctx.response.body = {
    message: "Book added to user!",
    book: newBook,
  };
};
