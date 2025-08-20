import React, { useEffect, useState } from 'react';
import { X, MapPin, Loader2, TreePine, Mountain, Waves, Camera, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  // All destinations with coordinates
  const destinations = [
    // Northern Circuit
    { id: 1, name: 'Serengeti National Park', lat: -2.3333, lng: 34.8333, icon: TreePine, circuit: 'Northern', color: 'emerald' },
    { id: 2, name: 'Ngorongoro Crater', lat: -3.2, lng: 35.5, icon: Camera, circuit: 'Northern', color: 'emerald' },
    { id: 3, name: 'Tarangire National Park', lat: -3.8333, lng: 36.0, icon: TreePine, circuit: 'Northern', color: 'emerald' },
    { id: 4, name: 'Lake Manyara', lat: -3.4833, lng: 35.8167, icon: Waves, circuit: 'Northern', color: 'emerald' },
    { id: 5, name: 'Mkomazi National Park', lat: -4.2, lng: 37.8, icon: TreePine, circuit: 'Northern', color: 'emerald' },
    { id: 6, name: 'Arusha National Park', lat: -3.25, lng: 36.8333, icon: Mountain, circuit: 'Northern', color: 'emerald' },
    
    // Southern Circuit
    { id: 7, name: 'Mikumi National Park', lat: -7.4, lng: 36.9833, icon: TreePine, circuit: 'Southern', color: 'amber' },
    { id: 8, name: 'Udzungwa Mountains', lat: -7.75, lng: 36.5, icon: Mountain, circuit: 'Southern', color: 'amber' },
    { id: 9, name: 'Selous Game Reserve', lat: -8.5, lng: 37.5, icon: Waves, circuit: 'Southern', color: 'amber' },
    { id: 10, name: 'Saadani National Park', lat: -6.0, lng: 38.7833, icon: Waves, circuit: 'Southern', color: 'amber' }
  ];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    // Show loading for 1 second, then display map
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => { 
      document.body.style.overflow = prev;
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleDestinationClick = (destination: any) => {
    const routeMap: { [key: string]: string } = {
      'Serengeti National Park': '/destinations/serengeti',
      'Ngorongoro Crater': '/destinations/ngorongoro',
      'Tarangire National Park': '/destinations/tarangire',
      'Lake Manyara': '/destinations/lake-manyara',
      'Mkomazi National Park': '/destinations/mkomazi',
      'Arusha National Park': '/destinations/arusha',
      'Mikumi National Park': '/destinations/mikumi',
      'Udzungwa Mountains': '/destinations/udzungwa',
      'Selous Game Reserve': '/destinations/selous',
      'Saadani National Park': '/destinations/saadani'
    };
    
    const route = routeMap[destination.name];
    if (route) {
      navigate(route);
    }
  };

  // Unified red Google-style pin icon (SVG data URL)
  const pinIcon = L.icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23EA4335' d='M12 2c-4.42 0-8 3.58-8 8 0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8Z'/%3E%3Ccircle cx='12' cy='10' r='3.25' fill='%23B21F24'/%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
  });

  const overlay = (
    <div className="fixed inset-0 z-[99999] flex bg-white">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-200 rounded-full animate-ping"></div>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="text-lg font-semibold text-emerald-700">Loading Map...</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Preparing your Tanzania adventure map
            </p>
          </div>
        </div>
      )}

      {/* Full-screen Map (Leaflet) */}
      <div className={`relative flex-1 h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <MapContainer
          center={[-6.369028, 34.888822]} // Tanzania approx center
          zoom={6}
          minZoom={4}
          maxZoom={18}
          zoomControl={false}
          className="absolute inset-0 w-full h-full"
          whenReady={handleMapLoad as any}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {destinations.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lng]} icon={pinIcon} eventHandlers={{ click: () => handleDestinationClick(d) }}>
              <Popup>
                <div className="font-semibold">{d.name}</div>
                <div className="text-xs text-gray-600">{d.circuit} Circuit</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Map Controls */}
        <div className={`absolute top-3 left-3 z-10 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Tanzania+Safari+Destinations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-emerald-700 border border-emerald-200 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4" />
            <span className="font-medium">View larger map</span>
          </a>
        </div>
        
        {/* Close button */}
        <div className={`absolute top-3 right-3 z-10 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 rounded-full bg-white/95 border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 backdrop-blur-sm group" 
            aria-label="Close explorer"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
        </div>

        {/* Legend */}
        <div className={`absolute bottom-6 left-6 z-10 transition-all duration-500 ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tanzania Safari Map</h3>
                <p className="text-sm text-gray-600">Click markers to explore destinations</p>
              </div>
            </div>
            
            {/* Circuit Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Northern Circuit (6 destinations)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span className="text-gray-700">Southern Circuit (4 destinations)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default MapExplorer;
