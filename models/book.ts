export class Book {
  book_id: number;
  title: string;
  pageTotal: number;
  pageCurrent: number;
  user_id: number;

  constructor(title: string, pageTotal: number) {
    this.title = title;
    this.pageTotal = pageTotal;
    this.pageCurrent = 0;
  }
}
