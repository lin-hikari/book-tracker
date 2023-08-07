export class User {
  name: string;
  books: Book[];

  constructor(name: string) {
    this.name = name;
    this.books = [];
  }
}

export class Book {
  title: string;
  pageTotal: number;
  pageCurrent: number;

  constructor(title: string, pageTotal: number) {
    this.title = title;
    this.pageTotal = pageTotal;
    this.pageCurrent = 0;
  }
}
