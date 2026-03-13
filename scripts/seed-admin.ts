import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { adminUsers } from '../src/db/schema';
import bcrypt from 'bcryptjs';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const dbPath = process.env.DATABASE_URL ?? './db/site.db';
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: './drizzle' });

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/seed-admin.ts');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

db.insert(adminUsers).values({ email, password: hash }).run();

console.log(`Admin user created: ${email}`);
sqlite.close();
