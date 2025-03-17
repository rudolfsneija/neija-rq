import Database from 'better-sqlite3';

/**
 * Initialize the database schema
 */
export function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tyres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      size TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('rear', 'front')),
      compound TEXT,
      terrain TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS builds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      frame TEXT NOT NULL,
      engine TEXT NOT NULL,
      build_year INTEGER NOT NULL,
      description TEXT,
      featured INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS build_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      build_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      is_primary INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (build_id) REFERENCES builds(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tyre_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tyre_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      is_primary INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tyre_id) REFERENCES tyres(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tyres_type ON tyres(type);
    CREATE INDEX IF NOT EXISTS idx_builds_featured ON builds(featured);
    CREATE INDEX IF NOT EXISTS idx_build_images_build_id ON build_images(build_id);
    CREATE INDEX IF NOT EXISTS idx_tyre_images_tyre_id ON tyre_images(tyre_id);
  `);
}