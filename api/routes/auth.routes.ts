import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/error.utils';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const router = Router();

// Get environment variables with fallbacks for safety
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Authentication middleware
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'JWT token is missing' });
  }

  try {
    jwt.verify(token, JWT_SECRET as string);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { error: 'Too many login attempts, please try again later' }
});

// Login route
router.post('/login', loginLimiter, (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check credentials using environment variables
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ username }, JWT_SECRET as string, { expiresIn: '7d' }); // Consider your admin usage patterns

    // Return token
    res.json({ token });
  } catch (err) {
    handleError(res, err, 'Login failed');
  }
});

// Verify token route - useful for checking if token is still valid
router.post('/verify', authenticateJWT, (req, res) => {
  res.json({ valid: true });
});

export default router;