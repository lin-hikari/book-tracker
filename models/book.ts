import { dbClient } from "../utility/database.ts";

export class Book {
  bookId: number;
  title: string;
  pageTotal: number;
  pageCurrent: number;
  userId: number;

  constructor(
    bookId: number,
    title: string,
    pageTotal: number,
    pageCurrent: number,
    userId: number
  ) {
    this.bookId = bookId;
    this.title = title;
    this.pageTotal = pageTotal;
    this.pageCurrent = pageCurrent;
    this.userId = userId;
  }

  async save(userId: number): void {
    await dbClient.execute(
      `INSERT INTO books(title, page_current, page_total, user_id) VALUES(?, ?, ?, ?)`,
      [this.title, this.pageCurrent, this.pageTotal, this.userId]
    );
  }
}
