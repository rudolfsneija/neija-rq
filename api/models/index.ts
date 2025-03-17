/**
 * Database and API models for the application
 */

// Core entity models
export interface Build {
  id: number;
  name: string;
  frame: string;
  engine: string;
  build_year: number;
  description?: string | null;
  featured: number;
  detailed_page: number;
  created_at: string;
}

export interface Tyre {
  id: number;
  name: string;
  size: string;
  type: 'front' | 'rear';
  compound?: string | null;
  terrain?: string | null;
  created_at: string;
}

// Database image models (with numeric boolean flags as used in SQLite)
export interface DbBuildImage {
  id: number;
  build_id: number;
  image_path: string;
  display_order: number;
  is_primary: number; // In SQLite this is 0 or 1
  created_at: string;
}

export interface DbTyreImage {
  id: number;
  tyre_id: number;
  image_path: string;
  display_order: number;
  is_primary: number; // In SQLite this is 0 or 1
  created_at: string;
}

// API response image models (with proper booleans)
export interface ResponseBuildImage extends Omit<DbBuildImage, 'is_primary'> {
  is_primary: boolean;
}

export interface ResponseTyreImage extends Omit<DbTyreImage, 'is_primary'> {
  is_primary: boolean;
}

// Upload responses
export interface SavedBuildImage {
  id: number | bigint;
  build_id: number | string;
  image_path: string;
  display_order: number;
  is_primary: boolean;
  created_at?: string;
}

export interface SavedTyreImage {
  id: number | bigint;
  tyre_id: number | string;
  image_path: string;
  display_order: number;
  is_primary: boolean;
  created_at?: string;
}

// Statistics model
export interface Stats {
  totalBuilds: number;
  featuredBuilds: number;
  detailedBuilds: number;
  totalTyres: number;
  frontTyres: number;
  rearTyres: number;
}