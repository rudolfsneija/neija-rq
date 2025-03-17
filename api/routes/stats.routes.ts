import { Router } from 'express';
import db from '../db';
import { handleError } from '../utils/error.utils';
import { Stats } from '../models';

const router = Router();

// Get system stats
router.get('/', (req, res) => {
  try {
    const stats: Stats = {
      totalBuilds: (db.prepare('SELECT COUNT(*) as count FROM builds').get() as { count: number }).count,
      featuredBuilds: (db.prepare('SELECT COUNT(*) as count FROM builds WHERE featured = 1').get() as { count: number }).count,
      detailedBuilds: (db.prepare('SELECT COUNT(*) as count FROM builds WHERE detailed_page = 1').get() as { count: number }).count,
      totalTyres: (db.prepare('SELECT COUNT(*) as count FROM tyres').get() as { count: number }).count,
      frontTyres: (db.prepare('SELECT COUNT(*) as count FROM tyres WHERE type = "front"').get() as { count: number }).count,
      rearTyres: (db.prepare('SELECT COUNT(*) as count FROM tyres WHERE type = "rear"').get() as { count: number }).count,
    };
    
    res.json(stats);
  } catch (err) {
    handleError(res, err, 'Failed to fetch statistics');
  }
});

export default router;