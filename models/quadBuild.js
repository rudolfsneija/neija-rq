const db = require('../config/db');

class QuadBuild {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM quad_builds');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM quad_builds WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(quadBuildData) {
    const {
      build_name,
      frame_type,
      engine,
      year_of_build,
      achievements,
      image_path
    } = quadBuildData;

    const [result] = await db.query(
      'INSERT INTO quad_builds (build_name, frame_type, engine, year_of_build, achievements, image_path) VALUES (?, ?, ?, ?, ?, ?)',
      [build_name, frame_type, engine, year_of_build, achievements, image_path]
    );
    return result.insertId;
  }

  static async update(id, quadBuildData) {
    const {
      build_name,
      frame_type,
      engine,
      year_of_build,
      achievements,
      image_path
    } = quadBuildData;

    await db.query(
      'UPDATE quad_builds SET build_name = ?, frame_type = ?, engine = ?, year_of_build = ?, achievements = ?, image_path = ? WHERE id = ?',
      [build_name, frame_type, engine, year_of_build, achievements, image_path, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM quad_builds WHERE id = ?', [id]);
  }
}

module.exports = QuadBuild;