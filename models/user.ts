import { dbClient } from "../utility/database.ts";

export class User {
  user_id: number;
  name: string;

  constructor(name: string) {
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
    else return userQuery[0];
  }
}
