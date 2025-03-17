import fs from 'fs';
import path from 'path';
// import { exec } from 'child_process';
import db from '../db';

// Create automatic database backups
export function setupBackupSchedule() {
  const backupDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  // Run backup daily
  setInterval(() => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `db-backup-${timestamp}.sqlite`);
    
    // Backup your database
    db.backup(backupPath)
      .then(() => {
        console.log(`Backup created successfully: ${backupPath}`);
        
        // Delete backups older than 30 days
        cleanupOldBackups(backupDir, 30);
      })
      .catch(err => {
        console.error('Backup failed:', err);
      });
  }, 24 * 60 * 60 * 1000); // 24 hours
}

function cleanupOldBackups(backupDir: string, daysToKeep: number) {
  fs.readdir(backupDir, (err, files) => {
    if (err) {
      console.error('Error reading backup directory:', err);
      return;
    }
    
    const now = Date.now();
    const maxAge = daysToKeep * 24 * 60 * 60 * 1000;
    
    files.forEach(file => {
      const filePath = path.join(backupDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${filePath}:`, err);
          return;
        }
        
        if (now - stats.mtime.getTime() > maxAge) {
          fs.unlink(filePath, err => {
            if (err) {
              console.error(`Error deleting old backup ${filePath}:`, err);
              return;
            }
            console.log(`Deleted old backup: ${filePath}`);
          });
        }
      });
    });
  });
}