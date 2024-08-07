import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "../drizzle/schema";

const connectionString = process.env.DATABASE_URL!;

console.log("connecting to ", connectionString);
const client = postgres(connectionString);
const db = drizzle(client);

const allUsers = await db.select().from(user);

console.log(allUsers);

console.log("closing connection.");
await client.end();
