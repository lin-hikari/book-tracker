import { dbClient } from "../utility/database.ts";

export class Book {
  bookId: number;
  title: string;
  pageTotal: number;
  pageCurrent: number;
  userId: number;

  constructor(title: string, pageTotal: number, userId: number) {
    this.title = title;
    this.pageTotal = pageTotal;
    this.pageCurrent = 0;
    this.userId = userId;
  }

  async save(userId: number): void {
    await dbClient.execute(
      `INSERT INTO books(title, page_current, page_total, user_id) VALUES(?, ?, ?, ?)`,
      [this.title, this.pageCurrent, this.pageTotal, this.userId]
    );
  }
}
