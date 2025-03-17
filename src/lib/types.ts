// Type definitions for frontend use - derived from API models

// Core entity models
export interface Tyre {
  id: number;
  name: string;
  size: string;
  type: 'front' | 'rear';
  compound: string | null;
  terrain: string | null;
  created_at: string;
}

export interface Build {
  id: number;
  name: string;
  frame: string;
  engine: string;
  build_year: number;
  description: string | null;
  featured: boolean;
  created_at: string;
}

// Image models (with proper booleans for frontend)
export interface BuildImage {
  id: number;
  build_id: number;
  image_path: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface TyreImage {
  id: number;
  tyre_id: number;
  image_path: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
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