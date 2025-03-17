declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      // Add other methods as needed
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      // Add other methods as needed
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      // Add other methods as needed
    }

    enum Animation {
      DROP,
      BOUNCE
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapOptions {
      center: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      zoomControl?: boolean;
      styles?: any[];
      // Add other options as needed
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      animation?: Animation;
      // Add other options as needed
    }
    
    namespace places {
      class PlacesService {
        constructor(attrContainer: HTMLElement | Map);
        getDetails(
          request: PlaceDetailsRequest,
          callback: (result: PlaceResult, status: PlacesServiceStatus) => void
        ): void;
      }
      
      interface PlaceDetailsRequest {
        placeId: string;
        fields: string[];
      }
      
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
      
      const PlacesServiceStatus: {
        OK: string;
        ZERO_RESULTS: string;
        OVER_QUERY_LIMIT: string;
        REQUEST_DENIED: string;
        INVALID_REQUEST: string;
        UNKNOWN_ERROR: string;
      };
    }
  }
}