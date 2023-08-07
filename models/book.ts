import { dbClient } from "../utility/database.ts";

export class Book {
  book_id: number;
  title: string;
  pageTotal: number;
  pageCurrent: number;
  user_id: number;

  constructor(title: string, pageTotal: number, user_id: number) {
    this.title = title;
    this.pageTotal = pageTotal;
    this.pageCurrent = 0;
    this.user_id = user_id;
  }

  async save(userId: number): void {
    await dbClient.execute(
      `INSERT INTO books(title, page_current, page_total, user_id) VALUES(?, ?, ?, ?)`,
      [this.title, this.pageCurrent, this.pageTotal, this.user_id]
    );
  }
}
