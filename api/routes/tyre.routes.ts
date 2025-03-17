import { Router } from 'express';
import db from '../db';
import { handleError } from '../utils/error.utils';
import { DbTyreImage, SavedTyreImage } from '../models';
import { tyreImagesDir } from '../middlewares/upload.middleware';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all tyres with optional filters
router.get('/', (req, res) => {
  try {
    const type = req.query.type as string;
    const terrain = req.query.terrain as string;
    let query = 'SELECT * FROM tyres';
    const params: string[] = []; 
    
    // Add filters if provided
    if (type || terrain) {
      query += ' WHERE';
      if (type) {
        query += ' type = ?';
        params.push(type);
      }
      if (terrain) {
        if (type) query += ' AND';
        query += ' terrain = ?';
        params.push(terrain);
      }
    }
    
    // Add order by
    query += ' ORDER BY name ASC';
    
    const tyres = db.prepare(query).all(...params);
    res.json(tyres);
  } catch (err) {
    handleError(res, err, 'Failed to fetch tyres');
  }
});

// Get tyres by type (front/rear)
router.get('/by-type/:type', (req, res) => {
  try {
    const type = req.params.type;
    if (type !== 'front' && type !== 'rear') {
      return res.status(400).json({ error: 'Type must be front or rear' });
    }
    
    const tyres = db.prepare('SELECT * FROM tyres WHERE type = ? ORDER BY name ASC').all(type);
    res.json(tyres);
  } catch (err) {
    handleError(res, err, 'Failed to fetch tyres by type');
  }
});

// Get tyres by terrain
router.get('/by-terrain/:terrain', (req, res) => {
  try {
    const tyres = db.prepare('SELECT * FROM tyres WHERE terrain = ? ORDER BY name ASC').all(req.params.terrain);
    res.json(tyres);
  } catch (err) {
    handleError(res, err, 'Failed to fetch tyres by terrain');
  }
});

// Special route for new tyres template
router.get('/new', (req, res) => {
  // Return an empty tyre template
  res.json({
    id: 0,
    name: '',
    size: '',
    type: 'rear',
    compound: null,
    terrain: null,
    created_at: new Date().toISOString()
  });
});

// Get tyre by ID
router.get('/:id', (req, res) => {
  try {
    // Special case for "new" to prevent confusion
    if (req.params.id === 'new') {
      return res.status(400).json({ error: 'Invalid tyre ID' });
    }

    const tyre = db.prepare('SELECT * FROM tyres WHERE id = ?').get(req.params.id);
    if (!tyre) {
      return res.status(404).json({ error: 'Tyre not found' });
    }
    res.json(tyre);
  } catch (err) {
    handleError(res, err, 'Failed to fetch tyre');
  }
});

// Create new tyre
router.post('/', (req, res) => {
  try {
    const { name, size, type, compound, terrain } = req.body;
    
    // Validate required fields
    if (!name || !size || !type) {
      return res.status(400).json({ error: 'Name, size, and type are required' });
    }
    
    // Validate type
    if (type !== 'front' && type !== 'rear') {
      return res.status(400).json({ error: 'Type must be front or rear' });
    }
    
    const result = db.prepare(
      'INSERT INTO tyres (name, size, type, compound, terrain) VALUES (?, ?, ?, ?, ?)'
    ).run(name, size, type, compound || null, terrain || null);
    
    const newTyre = db.prepare('SELECT * FROM tyres WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTyre);
  } catch (err) {
    handleError(res, err, 'Failed to create tyre');
  }
});

// Update existing tyre
router.put('/:id', (req, res) => {
  try {
    const { name, size, type, compound, terrain } = req.body;
    
    // Validate required fields
    if (!name || !size || !type) {
      return res.status(400).json({ error: 'Name, size, and type are required' });
    }
    
    // Validate type
    if (type !== 'front' && type !== 'rear') {
      return res.status(400).json({ error: 'Type must be front or rear' });
    }
    
    const result = db.prepare(
      'UPDATE tyres SET name = ?, size = ?, type = ?, compound = ?, terrain = ? WHERE id = ?'
    ).run(name, size, type, compound || null, terrain || null, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tyre not found' });
    }
    
    const updatedTyre = db.prepare('SELECT * FROM tyres WHERE id = ?').get(req.params.id);
    res.json(updatedTyre);
  } catch (err) {
    handleError(res, err, 'Failed to update tyre');
  }
});

// Delete a tyre
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM tyres WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tyre not found' });
    }
    
    res.json({ message: 'Tyre deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete tyre');
  }
});

// Bulk create tyres
router.post('/bulk', (req, res) => {
  try {
    const { tyres } = req.body;
    
    if (!Array.isArray(tyres) || tyres.length === 0) {
      return res.status(400).json({ error: 'No tyres provided for bulk creation' });
    }
    
    const insertTyre = db.prepare(
      'INSERT INTO tyres (name, size, type, compound, terrain) VALUES (?, ?, ?, ?, ?)'
    );
    
    const results: (number | bigint)[] = [];
    
    db.transaction(() => {
      for (const tyre of tyres) {
        const { name, size, type, compound, terrain } = tyre;
        
        if (!name || !size || !type) {
          throw new Error('Name, size, and type are required for all tyres');
        }
        
        if (type !== 'front' && type !== 'rear') {
          throw new Error(`Type must be front or rear. Invalid type: ${type}`);
        }
        
        const result = insertTyre.run(name, size, type, compound || null, terrain || null);
        results.push(result.lastInsertRowid);
      }
    })();
    
    // Fetch all inserted tyres
    const insertedTyres = db.prepare(
      `SELECT * FROM tyres WHERE id IN (${results.join(',')})`
    ).all();
    
    res.status(201).json(insertedTyres);
  } catch (err) {
    handleError(res, err, 'Failed to create tyres in bulk');
  }
});

// Get tyre images
router.get('/:id/images', (req, res) => {
  try {
    const tyreId = req.params.id;
    
    const images = db.prepare(
      'SELECT * FROM tyre_images WHERE tyre_id = ? ORDER BY display_order ASC'
    ).all(tyreId) as DbTyreImage[];
    
    // Convert SQLite integers to booleans
    const imagesWithBooleans = images.map(img => ({
      ...img,
      is_primary: Boolean(img.is_primary)
    }));
    
    res.json(imagesWithBooleans);
  } catch (err) {
    handleError(res, err, 'Failed to fetch tyre images');
  }
});

// Upload images for a tyre
router.post('/:id/images', (req, res) => {
  try {
    const tyreId = req.params.id;
    
    // Check if tyre exists
    const tyre = db.prepare('SELECT id FROM tyres WHERE id = ?').get(tyreId);
    if (!tyre) {
      return res.status(404).json({ error: 'Tyre not found' });
    }
    
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    
    const uploadedFiles = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];
    
    // Specify the type of the array
    const savedImages: SavedTyreImage[] = [];
    
    for (const file of uploadedFiles) {
      // Generate unique filename
      const fileExt = extname(file.name);
      const fileName = `${uuidv4()}${fileExt}`;
      const filePath = join(tyreImagesDir, fileName);
      const dbPath = `/uploads/tyres/${fileName}`;
      
      // Move file to uploads directory
      file.mv(filePath, (err) => {
        if (err) {
          console.error('Error saving file:', err);
          return res.status(500).json({ error: 'Failed to save file' });
        }
      });
      
      // Get the highest current display order
      const maxOrderResult = db.prepare(
        'SELECT MAX(display_order) as maxOrder FROM tyre_images WHERE tyre_id = ?'
      ).get(tyreId) as { maxOrder: number | null };
      
      const displayOrder = (maxOrderResult.maxOrder || 0) + 1;
      
      // Default first image to primary if no other images exist
      const imageCount = db.prepare(
        'SELECT COUNT(*) as count FROM tyre_images WHERE tyre_id = ?'
      ).get(tyreId) as { count: number };
      
      const isPrimary = imageCount.count === 0 ? 1 : 0;
      
      // Save image info to database
      const result = db.prepare(
        'INSERT INTO tyre_images (tyre_id, image_path, display_order, is_primary) VALUES (?, ?, ?, ?)'
      ).run(tyreId, dbPath, displayOrder, isPrimary);
      
      savedImages.push({
        id: result.lastInsertRowid,
        tyre_id: tyreId,
        image_path: dbPath,
        display_order: displayOrder,
        is_primary: Boolean(isPrimary)
      });
    }
    
    res.status(201).json(savedImages);
  } catch (err) {
    handleError(res, err, 'Failed to upload tyre images');
  }
});

// Image management routes
router.delete('/images/:imageId', (req, res) => {
  try {
    const imageId = req.params.imageId;
    
    // Get image info before deletion
    const image = db.prepare('SELECT * FROM tyre_images WHERE id = ?').get(imageId) as DbTyreImage | undefined;
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Delete from database
    db.prepare('DELETE FROM tyre_images WHERE id = ?').run(imageId);
    
    // If it was the primary image, make the first remaining image primary
    if (image.is_primary === 1) {
      const firstImage = db.prepare(
        'SELECT id FROM tyre_images WHERE tyre_id = ? ORDER BY display_order ASC LIMIT 1'
      ).get(image.tyre_id) as { id: number } | undefined;
      
      if (firstImage) {
        db.prepare('UPDATE tyre_images SET is_primary = 1 WHERE id = ?').run(firstImage.id);
      }
    }
    
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to delete tyre image');
  }
});

router.put('/images/:imageId/set-primary', (req, res) => {
  try {
    const imageId = req.params.imageId;
    
    // Get image info
    const image = db.prepare('SELECT * FROM tyre_images WHERE id = ?').get(imageId) as DbTyreImage | undefined;
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Begin transaction to ensure data integrity
    db.transaction(() => {
      // Reset all images for this tyre to not primary
      db.prepare('UPDATE tyre_images SET is_primary = 0 WHERE tyre_id = ?').run(image.tyre_id);
      
      // Set this image as primary
      db.prepare('UPDATE tyre_images SET is_primary = 1 WHERE id = ?').run(imageId);
    })();
    
    res.json({ message: 'Primary image updated successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to set primary tyre image');
  }
});

// Reordering images
router.put('/:tyreId/reorder-images', (req, res) => {
  try {
    const tyreId = req.params.tyreId;
    const { imageIds } = req.body;
    
    if (!Array.isArray(imageIds)) {
      return res.status(400).json({ error: 'Invalid image IDs array' });
    }
    
    // Begin transaction
    db.transaction(() => {
      // Update display order for each image
      imageIds.forEach((imageId, index) => {
        db.prepare(
          'UPDATE tyre_images SET display_order = ? WHERE id = ? AND tyre_id = ?'
        ).run(index + 1, imageId, tyreId);
      });
    })();
    
    res.json({ message: 'Images reordered successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to reorder tyre images');
  }
});

export default router;