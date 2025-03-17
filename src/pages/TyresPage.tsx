import { useState, useEffect } from 'react';
import { tyresApi } from '../lib/api';
import { Tyre, TyreImage } from '../lib/types';
import { ArrowLeft, CircleDashed, Mountain, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TyresPage() {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [tyreImages, setTyreImages] = useState<Record<number, TyreImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'all' | 'front' | 'rear'>('all');

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        setLoading(true);
        let data: Tyre[];
        
        if (activeType === 'all') {
          data = await tyresApi.getAll();
        } else {
          data = await tyresApi.getByType(activeType);
        }
        
        setTyres(data);
        
        // Fetch images for each tyre
        const imagesPromises = data.map(async (tyre) => {
          try {
            const tyreImages = await tyresApi.getImages(tyre.id.toString());
            return { tyreId: tyre.id, images: tyreImages };
          } catch (err) {
            console.error(`Error fetching images for tyre ${tyre.id}:`, err);
            return { tyreId: tyre.id, images: [] };
          }
        });
        
        const imagesResults = await Promise.all(imagesPromises);
        
        // Convert array of results to a record object
        const imagesMap: Record<number, TyreImage[]> = {};
        imagesResults.forEach(result => {
          imagesMap[result.tyreId] = result.images;
        });
        
        setTyreImages(imagesMap);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching tyres:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTyres();
  }, [activeType]);

  // Helper function to get primary image for a tyre
  const getPrimaryImage = (tyreId: number): string => {
    const images = tyreImages[tyreId] || [];
    const primaryImage = images.find(img => img.is_primary);
    
    if (primaryImage) {
      return primaryImage.image_path;
    }
    
    // Return the first image if no primary image is set
    if (images.length > 0) {
      return images[0].image_path;
    }
    
    // Fallback to a default image
    return "https://placehold.co/600x600?text=No+Image";
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/racing-parts" 
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Racing Parts</span>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold">Tyres</h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse our selection of high-performance racing tyres for all terrain types.
        </p>
        
        {/* Filter tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveType('all')}
              className={`pb-4 font-medium text-sm ${
                activeType === 'all'
                  ? 'border-b-2 border-yellow-500 text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
            >
              All Tyres
            </button>
            <button
              onClick={() => setActiveType('front')}
              className={`pb-4 font-medium text-sm ${
                activeType === 'front'
                  ? 'border-b-2 border-yellow-500 text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
            >
              Front Tyres
            </button>
            <button
              onClick={() => setActiveType('rear')}
              className={`pb-4 font-medium text-sm ${
                activeType === 'rear'
                  ? 'border-b-2 border-yellow-500 text-yellow-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
            >
              Rear Tyres
            </button>
          </div>
        </div>

        {loading && (
          <div className="my-12 text-center">
            <p className="text-lg">Loading tyres...</p>
          </div>
        )}

        {error && (
          <div className="my-12 rounded-md bg-red-50 p-4 text-red-700">
            <p>Error loading tyres: {error}</p>
          </div>
        )}

        {/* Tyres grid */}
        {!loading && !error && (
          <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {tyres.map((tyre) => (
              <div key={tyre.id} className="group">
                <div className="aspect-square w-full overflow-hidden rounded-lg flex justify-center">
                  <img
                    src={getPrimaryImage(tyre.id)}
                    alt={tyre.name}
                    className="h-full y-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900">{tyre.name}</h3>
                  <p className="text-m text-gray-500">{tyre.size}</p>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-xs text-gray-600 font-medium">
                      <CircleDashed className="h-4 w-4 mr-1.5 text-blue-600" />
                      <span>{tyre.type.charAt(0).toUpperCase() + tyre.type.slice(1)} </span>
                    </div>
                    
                    {tyre.compound && (
                      <div className="flex items-center text-xs text-gray-600 font-medium">
                        <div className="h-4 w-4 mr-1.5 flex items-center justify-center text-orange-600">
                          <span className="font-semibold text-[16px]">C</span>
                        </div>
                        <span>{tyre.compound}</span>
                      </div>
                    )}
                    
                    {tyre.terrain && (
                      <div className="flex items-center text-xs text-gray-600 font-medium">
                        <Mountain className="h-4 w-4 mr-1.5 text-purple-600" />
                        <span>{tyre.terrain}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/contact?inquiry=tyre&name=${encodeURIComponent(tyre.name)}`}
                      className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-500"
                    >
                      Contact for pricing
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && tyres.length === 0 && (
          <div className="my-16 text-center">
            <p className="text-lg text-gray-500">No tyres found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}