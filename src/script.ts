import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { user, note, color } from "../drizzle/schema";
import randInt from "./randInt";
import generateQuote from "./generator";

// console assert existence of env variables, helpful for detecting this issue in docker
console.assert(
  process.env.DATABASE_URL ?? false,
  "Env variable DATABASE_URL was not found."
);
console.assert(
  process.env.DIRECT_URL ?? false,
  "Env variable DIRECT_URL was not found."
);
console.assert(
  process.env.API_NINJAS_KEY ?? false,
  "Env variable DATABASE_URL was not found."
);

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString);
const db = drizzle(client);

// will raise an Index Error if no user with username of admin is found,
// which shouldn't happen unless we manually delete the user with the "admin" username from supabase
const userWithUsernameAdmin = (
  await db.select().from(user).where(eq(user.username, "admin"))
)[0];

// fetch a random quote to use in this
const { quote, author } = (await generateQuote())[0];

// will create a new post, using the above selected user as the author
const newPost = await db.insert(note).values({
  positionX: randInt(-4000, 4000),
  positionY: randInt(-4000, 4000),
  text: `${quote.slice(0, 400)}\n- ${author.slice(0, 100)}`,
  title: "Wisdom",
  color: color.enumValues[randInt(0, color.length - 1)],
  userId: userWithUsernameAdmin.id,
});

await client.end();

console.log("End Script.");
