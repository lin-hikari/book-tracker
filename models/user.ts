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
}
