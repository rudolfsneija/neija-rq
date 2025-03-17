import { Build, Tyre, BuildImage, TyreImage, Stats } from './types';

// Debug flag - set to true to see API requests/responses in console
const DEBUG = false;

const API_BASE = '/api';

// Enhanced error handling
const handleResponse = async (response: Response) => {
  const url = response.url;
  
  if (DEBUG) {
    console.log(`API ${response.status}: ${url}`);
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `API error: ${response.status}`;
    if (DEBUG) console.error(`API Error: ${errorMessage}`, errorData);
    throw new Error(errorMessage);
  }
  
  const data = await response.json();
  if (DEBUG) console.log(`API Response:`, data);
  return data;
};

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token 
    ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
};

// Auth API
export const authApi = {
  login: (username: string, password: string) => 
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handleResponse),
    
  verify: () => 
    fetch(`${API_BASE}/auth/verify`, {
      headers: getAuthHeaders() as HeadersInit,
    }).then(handleResponse),
};

// Builds API with auth headers
export const buildsApi = {
  getAll: (): Promise<Build[]> => 
    fetch(`${API_BASE}/builds`).then(handleResponse),
    
  getFeatured: (): Promise<Build[]> => 
    fetch(`${API_BASE}/builds/featured`).then(handleResponse),
    
  getById: (id: number | string): Promise<Build> => 
    fetch(`${API_BASE}/builds/${id}`).then(handleResponse),
    
  create: (build: Omit<Build, 'id' | 'created_at'>): Promise<Build> => 
    fetch(`${API_BASE}/builds`, {
      method: 'POST',
      headers: getAuthHeaders() as HeadersInit,
      body: JSON.stringify(build),
    }).then(handleResponse),
    
  update: (id: number | string, build: Omit<Build, 'id' | 'created_at'>): Promise<Build> => 
    fetch(`${API_BASE}/builds/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders() as HeadersInit,
      body: JSON.stringify(build),
    }).then(handleResponse),
    
  delete: (id: number | string): Promise<void> => 
    fetch(`${API_BASE}/builds/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders() as HeadersInit,
    }).then(handleResponse),
    
  getImages: (buildId: number | string): Promise<BuildImage[]> => 
    fetch(`${API_BASE}/builds/${buildId}/images`).then(handleResponse),
};

// Tyres API with auth headers
export const tyresApi = {
  getAll: (): Promise<Tyre[]> => 
    fetch(`${API_BASE}/tyres`).then(handleResponse),
    
  getByType: (type: 'front' | 'rear'): Promise<Tyre[]> => 
    fetch(`${API_BASE}/tyres/by-type/${type}`).then(handleResponse),
    
  getById: (id: number | string): Promise<Tyre> => 
    fetch(`${API_BASE}/tyres/${id}`).then(handleResponse),
    
  create: (tyre: Omit<Tyre, 'id' | 'created_at'>): Promise<Tyre> => 
    fetch(`${API_BASE}/tyres`, {
      method: 'POST',
      headers: getAuthHeaders() as HeadersInit,
      body: JSON.stringify(tyre),
    }).then(handleResponse),
    
  update: (id: number | string, tyre: Omit<Tyre, 'id' | 'created_at'>): Promise<Tyre> => 
    fetch(`${API_BASE}/tyres/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders() as HeadersInit,
      body: JSON.stringify(tyre),
    }).then(handleResponse),
    
  delete: (id: number | string): Promise<void> => 
    fetch(`${API_BASE}/tyres/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders() as HeadersInit,
    }).then(handleResponse),
    
  getImages: (tyreId: number | string): Promise<TyreImage[]> => 
    fetch(`${API_BASE}/tyres/${tyreId}/images`).then(handleResponse),
};

// Stats API
export const statsApi = {
  getStats: (): Promise<Stats> => 
    fetch(`${API_BASE}/stats`).then(handleResponse),
};