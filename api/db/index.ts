import Database from 'better-sqlite3';
import { join } from 'path';
import { initSchema } from './schema';

/**
 * Database singleton for the application
 */
const db = new Database(join(process.cwd(), 'database.sqlite'));

// Initialize schema
initSchema(db);

// Close database when server is terminated
process.on('SIGINT', () => {
  console.log('Closing database connection...');
  db.close();
});

export default db;