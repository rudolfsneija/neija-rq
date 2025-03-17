import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tyre, TyreImage } from '../../lib/types';
import { tyresApi } from '../../lib/api';

export function TyreForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id && id !== 'new';

  const [formData, setFormData] = useState<Omit<Tyre, 'id' | 'created_at'>>({
    name: '',
    size: '',
    type: 'rear',  // Default value
    compound: '',
    terrain: ''
  });

  const [images, setImages] = useState<TyreImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(isEditMode));
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch images function
  const fetchImages = useCallback(async () => {
    if (!id || id === 'new') return;
    
    try {
      const data = await tyresApi.getImages(id);
      setImages(data);
    } catch (err) {
      console.error('Error fetching tyre images:', err);
      // Don't set the main error state for image fetch issues
    }
  }, [id]);

  useEffect(() => {
    // Only fetch if we're in edit mode with a valid numeric ID
    if (id && id !== 'new') {
      const fetchTyre = async () => {
        try {
          setLoading(true);
          
          try {
            const data = await tyresApi.getById(id);
            
            setFormData({
              name: data.name,
              size: data.size,
              type: data.type,
              compound: data.compound || '',
              terrain: data.terrain || ''
            });

            // Fetch images if we're in edit mode
            if (isEditMode) {
              fetchImages();
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes('404')) {
              setError(`Tyre with ID ${id} not found`);
            } else {
              throw err;
            }
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown error';
          setError(errorMsg);
        } finally {
          setLoading(false);
        }
      };

      fetchTyre();
    } else {
      // Reset form for new tyre
      setFormData({
        name: '',
        size: '',
        type: 'rear',
        compound: '',
        terrain: ''
      });
      setImages([]);
      setLoading(false);
    }
  }, [id, isEditMode, fetchImages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      let savedTyre: Tyre;
      
      if (isEditMode && id) {
        savedTyre = await tyresApi.update(id, formData);
      } else {
        savedTyre = await tyresApi.create(formData);
      }
      
      // If we're creating a new tyre and have images waiting to upload
      const fileInput = document.getElementById('tyre-image-upload') as HTMLInputElement;
      if (!isEditMode && fileInput?.files?.length) {
        await handleImageUpload(savedTyre.id);
      }

      // Successfully saved - navigate back to tyres list
      navigate('/admin/tyres');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (tyreId?: number) => {
    const fileInput = document.getElementById('tyre-image-upload') as HTMLInputElement;
    if (!fileInput?.files?.length) return;
    
    const targetId = tyreId || id;
    if (!targetId || targetId === 'new') {
      setUploadError('Cannot upload images until the tyre is saved');
      return;
    }
    
    setUploading(true);
    setUploadError(null);
    
    try {
      const formData = new FormData();
      
      // Add all selected files to the form data
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('images', fileInput.files[i]);
      }
      
      // For file uploads, we'll still use fetch directly
      const response = await fetch(`/api/tyres/${targetId}/images`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to upload images: ${response.status}`);
      }
      
      // Clear the file input
      fileInput.value = '';
      
      // Refresh the images list
      fetchImages();
    } catch (err) {
      console.error('Error uploading images:', err);
      setUploadError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/tyres/images/${imageId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
      
      // Update the images state by filtering out the deleted image
      setImages(images.filter(img => img.id !== imageId));
    } catch (err) {
      console.error('Error deleting image:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to delete image');
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      const response = await fetch(`/api/tyres/images/${imageId}/set-primary`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to set image as primary');
      }
      
      // Update the images state to reflect the new primary image
      setImages(images.map(img => ({
        ...img,
        is_primary: img.id === imageId
      })));
    } catch (err) {
      console.error('Error setting primary image:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to set primary image');
    }
  };

  if (loading) {
    return <div className="p-4 text-yellow-400">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">
          {isEditMode ? 'Edit Tyre' : 'Create New Tyre'}
        </h1>
        <button 
          onClick={() => navigate('/admin/tyres')} 
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-lg font-medium mb-4 text-yellow-400">Tyre Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-300">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-100"
              required
            >
              <option value="rear">Rear</option>
              <option value="front">Front</option>
            </select>
          </div>

          <div>
            <label htmlFor="compound" className="block text-sm font-medium text-gray-300">Compound (optional)</label>
            <input
              type="text"
              id="compound"
              name="compound"
              value={formData.compound || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="terrain" className="block text-sm font-medium text-gray-300">Terrain (optional)</label>
            <input
              type="text"
              id="terrain"
              name="terrain"
              value={formData.terrain || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-gray-100"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 disabled:bg-red-900 disabled:text-gray-300 transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Tyre'}
            </button>
          </div>
        </form>
      </div>

      {isEditMode && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-medium mb-4 text-yellow-400">Images</h2>
          
          {uploadError && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 mb-4 rounded">
              {uploadError}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="tyre-image-upload" className="block text-sm font-medium text-gray-300 mb-2">
              Upload Images
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="tyre-image-upload"
                accept="image/*"
                multiple
                className="text-gray-300 file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0 file:text-sm file:font-semibold
                    file:bg-red-700 file:text-white hover:file:bg-red-900"
              />
              <button
                type="button"
                onClick={() => handleImageUpload()}
                disabled={uploading}
                className="ml-2 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 disabled:bg-red-900 disabled:text-gray-300"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>

          {images.length === 0 ? (
            <p className="text-gray-400">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`relative bg-gray-800 rounded overflow-hidden ${image.is_primary ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  <img 
                    src={image.image_path} 
                    alt="Tyre" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-500 hover:text-red-300"
                        title="Delete image"
                      >
                        ✕
                      </button>
                    </div>
                    <div>
                      {!image.is_primary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(image.id)}
                          className="w-full bg-yellow-700 text-white text-xs py-1 px-2 rounded hover:bg-yellow-600"
                        >
                          Set as Primary
                        </button>
                      )}
                    </div>
                  </div>
                  {image.is_primary && (
                    <div className="absolute top-0 left-0 bg-yellow-600 text-white text-xs py-0.5 px-1">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}