import { Router } from 'express';
import db from '../db';
import { handleError } from '../utils/error.utils';
import { DbBuildImage, SavedBuildImage } from '../models';
import { buildImagesDir } from '../middlewares/upload.middleware';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { authenticateJWT } from './auth.routes';

const router = Router();

// Get all builds with optional filters
router.get('/', (req, res) => {
  try {
    const { featured } = req.query;
    let query = 'SELECT * FROM builds';
    const params: (string | number)[] = [];
    
    // Add filters if provided
    if (featured === 'true' ) {
      query += ' WHERE';
      if (featured === 'true') {
        query += ' featured = 1';
      }
    }
    
    // Add order by
    query += ' ORDER BY build_year DESC';
    
    const builds = db.prepare(query).all(...params);
    res.json(builds);
  } catch (err) {
    handleError(res, err, 'Failed to fetch builds');
  }
});

// Get featured builds
router.get('/featured', (req, res) => {
  try {
    const builds = db.prepare('SELECT * FROM builds WHERE featured = 1 ORDER BY build_year DESC').all();
    res.json(builds);
  } catch (err) {
    handleError(res, err, 'Failed to fetch featured builds');
  }
});

// Get builds by year range
router.get('/by-year-range/:min/:max', (req, res) => {
  try {
    const minYear = parseInt(req.params.min);
    const maxYear = parseInt(req.params.max);
    
    if (isNaN(minYear) || isNaN(maxYear)) {
      return res.status(400).json({ error: 'Year range must be valid integers' });
    }
    
    const builds = db.prepare(
      'SELECT * FROM builds WHERE build_year >= ? AND build_year <= ? ORDER BY build_year DESC'
    ).all(minYear, maxYear);
    
    res.json(builds);
  } catch (err) {
    handleError(res, err, 'Failed to fetch builds by year range');
  }
});

// Template for new builds
router.get('/new', (req, res) => {
  res.json({
    id: 0,
    name: '',
    frame: '',
    engine: '',
    build_year: new Date().getFullYear(),
    description: '',
    featured: 0,
    created_at: new Date().toISOString()
  });
});

// Get build by ID
router.get('/:id', (req, res) => {
  try {
    // Special case for "new" to prevent confusion
    if (req.params.id === 'new') {
      return res.status(400).json({ error: 'Invalid build ID' });
    }

    const build = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }
    res.json(build);
  } catch (err) {
    handleError(res, err, 'Failed to fetch build');
  }
});

// Create new build
router.post('/', authenticateJWT, (req, res) => {
  try {
    const { name, frame, engine, build_year, description, featured } = req.body;
    
    // Validate required fields
    if (!name || build_year === undefined) {
      return res.status(400).json({ error: 'Name and build year are required' });
    }
    
    // Validate build year
    if (isNaN(parseInt(String(build_year)))) {
      return res.status(400).json({ error: 'Build year must be a number' });
    }
    
    // Convert boolean values to integers for SQLite
    const featuredValue = featured ? 1 : 0;
    
    const result = db.prepare(
      'INSERT INTO builds (name, frame, engine, build_year, description, featured) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, frame, engine, build_year, description || null, featuredValue);
    
    const newBuild = db.prepare('SELECT * FROM builds WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newBuild);
  } catch (err) {
    handleError(res, err, 'Failed to create build');
  }
});

// Update existing build
router.put('/:id', authenticateJWT, (req, res) => {
  try {
    const { name, frame, engine, build_year, description, featured } = req.body;
    
    // Validate required fields
    if (!name || !frame || !engine || build_year === undefined) {
      return res.status(400).json({ error: 'Name, frame, engine, and build year are required' });
    }
    
    // Validate build year
    if (isNaN(parseInt(String(build_year)))) {
      return res.status(400).json({ error: 'Build year must be a number' });
    }
    
    // Convert boolean values to integers for SQLite
    const featuredValue = featured ? 1 : 0;
    
    const result = db.prepare(
      'UPDATE builds SET name = ?, frame = ?, engine = ?, build_year = ?, description = ?, featured = ? WHERE id = ?'
    ).run(name, frame, engine, build_year, description || null, featuredValue, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Build not found' });
    }
    
    const updatedBuild = db.prepare('SELECT * FROM builds WHERE id = ?').get(req.params.id);
    res.json(updatedBuild);
  } catch (err) {
    handleError(res, err, 'Failed to update build');
  }
});

// Delete a build
router.delete('/:id', authenticateJWT, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM builds WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Build not found' });
    }
    
    res.json({ message: 'Build deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete build');
  }
});

// Get build images
router.get('/:id/images', (req, res) => {
  try {
    const buildId = req.params.id;
    
    const images = db.prepare(
      'SELECT * FROM build_images WHERE build_id = ? ORDER BY display_order ASC'
    ).all(buildId) as DbBuildImage[];
    
    // Convert SQLite integers to booleans
    const imagesWithBooleans = images.map(img => ({
      ...img,
      is_primary: Boolean(img.is_primary)
    }));
    
    res.json(imagesWithBooleans);
  } catch (err) {
    handleError(res, err, 'Failed to fetch build images');
  }
});

// Upload images for a build
router.post('/:id/images', authenticateJWT, (req, res) => {
  try {
    const buildId = req.params.id;
    
    // Check if build exists
    const build = db.prepare('SELECT id FROM builds WHERE id = ?').get(buildId);
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }
    
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    
    const uploadedFiles = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];
    
    // Specify the type of the array
    const savedImages: SavedBuildImage[] = [];
    
    for (const file of uploadedFiles) {
      // Generate unique filename
      const fileExt = extname(file.name);
      const fileName = `${uuidv4()}${fileExt}`;
      const filePath = join(buildImagesDir, fileName);
      const dbPath = `/uploads/builds/${fileName}`;
      
      // Move file to uploads directory
      file.mv(filePath, (err) => {
        if (err) {
          console.error('Error saving file:', err);
          return res.status(500).json({ error: 'Failed to save file' });
        }
      });
      
      // Get the highest current display order
      const maxOrderResult = db.prepare(
        'SELECT MAX(display_order) as maxOrder FROM build_images WHERE build_id = ?'
      ).get(buildId) as { maxOrder: number | null };
      
      const displayOrder = (maxOrderResult.maxOrder || 0) + 1;
      
      // Default first image to primary if no other images exist
      const imageCount = db.prepare(
        'SELECT COUNT(*) as count FROM build_images WHERE build_id = ?'
      ).get(buildId) as { count: number };
      
      const isPrimary = imageCount.count === 0 ? 1 : 0;
      
      // Save image info to database
      const result = db.prepare(
        'INSERT INTO build_images (build_id, image_path, display_order, is_primary) VALUES (?, ?, ?, ?)'
      ).run(buildId, dbPath, displayOrder, isPrimary);
      
      savedImages.push({
        id: result.lastInsertRowid,
        build_id: buildId,
        image_path: dbPath,
        display_order: displayOrder,
        is_primary: Boolean(isPrimary)
      });
    }
    
    res.status(201).json(savedImages);
  } catch (err) {
    handleError(res, err, 'Failed to upload build images');
  }
});

// Image management routes
router.delete('/images/:imageId', authenticateJWT, (req, res) => {
  try {
    const imageId = req.params.imageId;
    
    // Get image info before deletion
    const image = db.prepare('SELECT * FROM build_images WHERE id = ?').get(imageId) as DbBuildImage | undefined;
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Delete from database
    db.prepare('DELETE FROM build_images WHERE id = ?').run(imageId);
    
    // If it was the primary image, make the first remaining image primary
    if (image.is_primary === 1) {
      const firstImage = db.prepare(
        'SELECT id FROM build_images WHERE build_id = ? ORDER BY display_order ASC LIMIT 1'
      ).get(image.build_id) as { id: number } | undefined;
      
      if (firstImage) {
        db.prepare('UPDATE build_images SET is_primary = 1 WHERE id = ?').run(firstImage.id);
      }
    }
    
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete build image');
  }
});

router.put('/images/:imageId/set-primary', authenticateJWT, (req, res) => {
  try {
    const imageId = req.params.imageId;
    
    // Get image info
    const image = db.prepare('SELECT * FROM build_images WHERE id = ?').get(imageId) as DbBuildImage | undefined;
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Begin transaction to ensure data integrity
    db.transaction(() => {
      // Reset all images for this build to not primary
      db.prepare('UPDATE build_images SET is_primary = 0 WHERE build_id = ?').run(image.build_id);
      
      // Set this image as primary
      db.prepare('UPDATE build_images SET is_primary = 1 WHERE id = ?').run(imageId);
    })();
    
    res.json({ message: 'Primary image updated successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to set primary build image');
  }
});

// Reordering images
router.put('/:buildId/reorder-images', authenticateJWT, (req, res) => {
  try {
    const buildId = req.params.buildId;
    const { imageIds } = req.body;
    
    if (!Array.isArray(imageIds)) {
      return res.status(400).json({ error: 'Invalid image IDs array' });
    }
    
    // Begin transaction
    db.transaction(() => {
      // Update display order for each image
      imageIds.forEach((imageId, index) => {
        db.prepare(
          'UPDATE build_images SET display_order = ? WHERE id = ? AND build_id = ?'
        ).run(index + 1, imageId, buildId);
      });
    })();
    
    res.json({ message: 'Images reordered successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to reorder build images');
  }
});

export default router;