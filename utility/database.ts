import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

export const dbClient = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "book-tracker",
  poolSize: 3, // connection limit
  password: Deno.env.get("MYSQL_PASSWORD"),
});
