import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Load environment variables early
dotenv.config();

import express from 'express';
import cors from 'cors';
import { join } from 'path';

// Import middleware
import { fileUploadMiddleware, setupUploadsDirectory } from './middlewares/upload.middleware';

// Import routes
import tyreRoutes from './routes/tyre.routes';
import buildRoutes from './routes/build.routes';
import statsRoutes from './routes/stats.routes';
import contactRoutes from './routes/contact.routes';
import authRoutes from './routes/auth.routes';

// Initialize app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'https://www.msport.lv',
  credentials: true
}));
app.use(express.json());
app.use(fileUploadMiddleware);

// Setup uploads directory
setupUploadsDirectory();

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../public')));

// Serve uploads with proper caching
app.use('/uploads', express.static(join(process.cwd(), 'uploads'), {
  maxAge: '1d', // Cache for 1 day
  etag: true
}));

// Trust proxy headers if your app is behind a reverse proxy
app.set('trust proxy', true);

// Create logs directory
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Setup request logging
if (process.env.NODE_ENV === 'production') {
  // Log to file in production
  const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'), 
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  // Log to console in development
  app.use(morgan('dev'));
}

// Routes
app.use('/api/tyres', tyreRoutes);
app.use('/api/builds', buildRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Improved error handling
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const timestamp = new Date().toISOString();
  const errorDetails = {
    timestamp,
    error: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    path: req.path,
    method: req.method
  };
  
  // Log error to file in production
  if (process.env.NODE_ENV === 'production') {
    fs.appendFileSync(
      path.join(logsDir, 'error.log'), 
      JSON.stringify(errorDetails) + '\n'
    );
  } else {
    console.error('API Error:', errorDetails);
  }
  
  // Send appropriate response to client
  res.status(500).json({ 
    error: 'Internal server error',
    requestId: timestamp.replace(/[^0-9]/g, '') // Simple request ID for reference
  });
});

// Handle React routing for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit();
});