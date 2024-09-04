import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { user, note, color } from "./drizzle/schema";
import randInt from "./utils/randInt";
import generateQuote from "./utils/generator";
import consoleAssertEnvVars from "./utils/consoleAssertions";

export const handler = async () => {
  console.log("Start Script.");
  consoleAssertEnvVars();

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
  await db.insert(note).values({
    positionX: randInt(-4000, 4000),
    positionY: randInt(-4000, 4000),
    text: `${quote.slice(0, 500)}`,
    title: `Quote from ${author.slice(0, 40)}`,
    color: color.enumValues[randInt(0, 4)],
    userId: userWithUsernameAdmin.id,
  });

  console.log("Created post with quote from", author);

  await client.end();
  console.log("End Script.");
};
