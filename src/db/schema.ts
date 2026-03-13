import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postSlug: text('post_slug').notNull(),
  postLocale: text('post_locale').notNull(),
  authorName: text('author_name').notNull(),
  authorEmail: text('author_email'),
  content: text('content').notNull(),
  approved: integer('approved', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
});
