import { relations } from "drizzle-orm/relations";
import { user, message, note } from "./schema";

export const messageRelations = relations(message, ({one}) => ({
	user: one(user, {
		fields: [message.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	messages: many(message),
	notes: many(note),
}));

export const noteRelations = relations(note, ({one}) => ({
	user: one(user, {
		fields: [note.userId],
		references: [user.id]
	}),
}));