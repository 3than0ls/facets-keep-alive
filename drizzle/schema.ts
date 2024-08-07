import {
  pgTable,
  uniqueIndex,
  pgEnum,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
  foreignKey,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const color = pgEnum("Color", [
  "CYAN",
  "ORANGE",
  "YELLOW",
  "GREEN",
  "RED",
]);

export const user = pgTable(
  "User",
  {
    id: uuid("id").primaryKey().notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("User_id_key").using("btree", table.id),
      usernameKey: uniqueIndex("User_username_key").using(
        "btree",
        table.username
      ),
    };
  }
);

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const message = pgTable("Message", {
  id: serial("id").primaryKey().notNull(),
  sentAt: timestamp("sentAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  text: text("text").notNull(),
  userId: uuid("userId").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const note = pgTable("Note", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
  color: color("color").default("YELLOW").notNull(),
  positionX: integer("positionX").notNull(),
  positionY: integer("positionY").notNull(),
  text: varchar("text", { length: 500 }).notNull(),
});
