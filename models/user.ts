import { dbClient } from "../utility/database.ts";
import { Book } from "./book.ts";

export class User {
  userId: number;
  name: string;

  constructor(userId: number, name: string) {
    this.userId = userId;
    this.name = name;
  }

  async save(): void {
    await dbClient.execute(`INSERT INTO users(name) VALUES(?)`, [this.name]);
  }

  static async findUser(name: string): User {
    const userQuery: User[] = await dbClient.query(
      "SELECT * FROM users WHERE users.name = ?",
      [name]
    );
    if (userQuery.length === 0) return undefined;
  }
  }
}
