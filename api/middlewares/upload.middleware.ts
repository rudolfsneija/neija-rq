import { join } from 'path';
import { mkdir, existsSync } from 'fs';
import fileUpload from 'express-fileupload';

// Path configurations
export const uploadsDir = join(process.cwd(), 'uploads');
export const buildImagesDir = join(uploadsDir, 'builds');
export const tyreImagesDir = join(uploadsDir, 'tyres');

/**
 * Sets up upload directories needed for file storage
 */
export function setupUploadsDirectory(): void {
  if (!existsSync(uploadsDir)) {
    mkdir(uploadsDir, { recursive: true }, (err) => {
      if (err) console.error('Error creating uploads directory:', err);
    });
  }

  if (!existsSync(buildImagesDir)) {
    mkdir(buildImagesDir, { recursive: true }, (err) => {
      if (err) console.error('Error creating builds images directory:', err);
    });
  }

  if (!existsSync(tyreImagesDir)) {
    mkdir(tyreImagesDir, { recursive: true }, (err) => {
      if (err) console.error('Error creating tyres images directory:', err);
    });
  }
}

/**
 * Express middleware for handling file uploads
 */
export const fileUploadMiddleware = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  createParentPath: true,
  abortOnLimit: true,
});