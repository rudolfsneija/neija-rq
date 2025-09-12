import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, MapPin } from 'lucide-react';

// Custom marker with better styling
let DefaultIcon = L.divIcon({
  html: `<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <div style="color: white; font-size: 12px; font-weight: bold;">📍</div>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  className: 'custom-div-icon'
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
  address: string;
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}

// Navigation function
const openNavigation = (lat: number, lng: number, address: string) => {
  const neijaRacingTeamUrl = 'https://maps.google.com/maps/search/Neija+Racing+Team+Ozolnieki+Latvia';
  window.open(neijaRacingTeamUrl, '_blank');
};

export function LeafletMap({ address, lat, lng, zoom = 16, className = "" }: LeafletMapProps) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* Option 1: Default OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Option 2: CartoDB Light (uncomment to use) */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        /> */}
        
        {/* Option 3: CartoDB Dark (uncomment to use) */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        /> */}
        
        {/* Option 4: Satellite-like (uncomment to use) */}
        {/* <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        /> */}

        <Marker position={[lat, lng]}>
          <Popup>
            <div className="text-sm max-w-xs">
              <div className="font-bold text-base mb-2 text-gray-800">Neija Racing Team</div>
              <div className="text-gray-600 mb-3">{address}</div>
              
              {/* Navigation buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openNavigation(lat, lng, address)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  Navigate
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    alert('Address copied to clipboard!');
                  }}
                  className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Floating navigation button */}
      <button
        onClick={() => openNavigation(lat, lng, address)}
        className="absolute top-4 right-4 z-[1000] bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        title="Get Directions"
      >
        <Navigation className="w-5 h-5" />
      </button>
    </div>
  );
}