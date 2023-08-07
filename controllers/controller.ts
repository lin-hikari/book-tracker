import { User } from "../models/user.ts";
import { Book } from "../models/book.ts";

export let createUser = async (ctx) => {
  const reqBody = await ctx.request.body().value;
  const name = reqBody.name;

  let newUser = new User(null, name);
  await newUser.save();
  ctx.response.body = { message: "User created!", user: newUser };
};

export let findUser = async (ctx) => {
  const username = ctx.params.username;

  const foundUser: User = await User.findUser(username);
  if (!foundUser) {
    ctx.response.body = { message: "No user found!" };
    return;
  }
  const userBooks = await foundUser.getBooks();
  ctx.response.body = { user: foundUser, books: userBooks };
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
  const userId: number = foundUser.userId;

  let apiQuery: string =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchTerms +
    "&key=" +
    Deno.env.get("GOOGLE_API_KEY");
  const apiRes = await fetch(apiQuery);
  const apiData = await apiRes.json();
  if (apiData.totalItems === 0) {
    ctx.response.body = { message: "No book found!" };
    return;
  }

  const bookTitle = apiData.items[0].volumeInfo.title;
  const bookPages = apiData.items[0].volumeInfo.pageCount;
  const newBook: Book = new Book(null, bookTitle, bookPages, 0, userId);
  await newBook.save();
  ctx.response.body = {
    message: "Book added to user!",
    book: newBook,
  };
};
