const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('./config/db');

async function importQuadBuilds() {
  const csvFilePath = path.join(__dirname, 'quad_builds.csv');
  const quadBuilds = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      quadBuilds.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      try {
        for (const build of quadBuilds) {
          const {
            build_name,
            frame_type,
            engine,
            year_of_build,
            achievements,
            image_path,
          } = build;

          await db.query(
            'INSERT INTO quad_builds (build_name, frame_type, engine, year_of_build, achievements, image_path) VALUES (?, ?, ?, ?, ?, ?)',
            [
              build_name,
              frame_type,
              engine,
              year_of_build,
              achievements,
              image_path,
            ]
          );
        }
        console.log('Data imported successfully');
        process.exit(0);
      } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
      }
    });
}

importQuadBuilds();