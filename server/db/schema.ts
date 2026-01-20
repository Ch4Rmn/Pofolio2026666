import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const fruitsTable = sqliteTable("fruits", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    color: text("color").notNull(),
    price: text("price").notNull(),
}); 