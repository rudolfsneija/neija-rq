import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  address: string;
  lat: number;
  lng: number;
  zoom?: number;
  placeId?: string; // Google Maps Place ID
}

interface PlaceData {
  name: string;
  rating?: number;
  userRatingsTotal?: number;
  formattedAddress?: string;
  weekdayText?: string[];
  phone?: string;
  website?: string;
}

export function GoogleMap({ lat, lng, zoom = 15, placeId = 'ChIJv7pfUB4l70YRxCKM5EyY_yc' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Google Maps API
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    // Define the global callback function
    window.initMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        setIsLoading(false);
        
        // Create map instance
        const mapOptions: google.maps.MapOptions = {
          center: { lat, lng },
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        };

        mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

        // Add marker
        markerRef.current = new google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
          title: 'Neija Racing Team',
        });

        // Fetch place details if placeId is provided
        if (placeId) {
          const service = new google.maps.places.PlacesService(mapInstanceRef.current);
          
          service.getDetails(
            {
              placeId,
              fields: ['name', 'rating', 'formatted_address', 'opening_hours', 'formatted_phone_number', 'website', 'user_ratings_total']
            },
            (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                setPlaceData({
                  name: place.name || 'Neija Racing Quads',
                  rating: place.rating,
                  userRatingsTotal: place.user_ratings_total,
                  formattedAddress: place.formatted_address,
                  weekdayText: place.opening_hours?.weekday_text,
                  phone: place.formatted_phone_number,
                  website: place.website
                });
              }
            }
          );
        }
      }
    };

    // Add script to document
    document.head.appendChild(googleMapsScript);

    return () => {
      // Clean up
      window.initMap = () => {};
      if (document.head.contains(googleMapsScript)) {
        document.head.removeChild(googleMapsScript);
      }
    };
  }, [lat, lng, zoom, placeId]);

  const openGoogleMapsDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${placeId}`, '_blank');
  };

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      )}

      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm"
        aria-label="Map showing our location"
      />

      {placeData && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 max-w-[280px] text-sm">
          <div className="font-bold text-gray-900">{placeData.name}</div>
          
          {placeData.formattedAddress && (
            <div className="mt-2 text-gray-700">
              {placeData.formattedAddress}
            </div>
          )}
          
          <div className="mt-3 flex space-x-2">
            <button 
              onClick={openGoogleMapsDirections}
              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
            >
              Directions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this to make TypeScript happy
declare global {
  interface Window {
    initMap: () => void;
  }
  
  namespace google.maps.places {
    
    interface PlaceResult {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      formatted_address?: string;
      formatted_phone_number?: string;
      website?: string;
      opening_hours?: {
        weekday_text?: string[];
      };
    }
  }
}