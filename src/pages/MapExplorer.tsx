import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, MapPin, Search, X, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

interface DestinationItem {
  name: string;
  region?: string;
  slug: string;
}
// Tanzania map background (served from public/ for reliability)

const MAP_BG_URL = "/images/map.png";
// Toggle to true temporarily to calibrate pin positions by clicking on the map
const CALIBRATE_PINS = false;

const ALL_DESTINATIONS: DestinationItem[] = [
  { name: 'Serengeti National Park', region: 'Northern Circuit', slug: 'serengeti' },
  { name: 'Ngorongoro Crater', region: 'Northern Circuit', slug: 'ngorongoro' },
  { name: 'Mount Kilimanjaro', region: 'Northern Circuit', slug: 'kilimanjaro' },
  { name: 'Tarangire National Park', region: 'Northern Circuit', slug: 'tarangire' },
  { name: 'Lake Manyara National Park', region: 'Northern Circuit', slug: 'lake-manyara' },
 
  { name: 'Zanzibar (Unguja)', region: 'Islands', slug: 'zanzibar' },
  { name: 'Pemba Island', region: 'Islands', slug: 'pemba' },
 

];

const PIN_POS: Record<string, { x: number; y: number }> = {
  kilimanjaro: { x: 55, y: 25 },
  'lake-manyara': { x: 50, y: 35 },
  tarangire: { x: 57, y: 36 },
  ngorongoro: { x: 46, y: 34 },
  serengeti: { x: 38, y: 28 },
  zanzibar: { x: 80, y: 40 },
};

const MapExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Lock background scroll while explorer is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_DESTINATIONS;
    return ALL_DESTINATIONS.filter(d => d.name.toLowerCase().includes(q) || (d.region?.toLowerCase().includes(q)));
  }, [query]);

  useEffect(() => {
    if (!active || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLButtonElement>(`[data-slug="${active}"]`);
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [active]);

  const goTo = (slug: string) => {
    navigate(`/destinations/${slug}`);
  };

  const overlay = (
    <div className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-black/40">{/* lighter backdrop */}
      {/* Left map */}
      <div
        className={`relative flex-1 md:flex-[1_1_auto] block h-1/2 md:h-auto ${CALIBRATE_PINS ? 'cursor-crosshair' : ''}`}
        onClick={(e) => {
          if (!CALIBRATE_PINS || !active) return;
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          console.log(`'${active}': { x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },`);
        }}
      >
        <img
          src={MAP_BG_URL}
          alt="Tanzania Satellite Map"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-110"
        />
        {/* Softer, subtle gradient to improve contrast without killing visibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent"></div>
        {CALIBRATE_PINS && (
          <div className="absolute top-3 left-3 z-10 text-xs bg-yellow-100/90 text-yellow-900 border border-yellow-300 px-2 py-1 rounded">
            Hover a destination, then click the map to log x/y%. Toggle off CALIBRATE_PINS when done.
          </div>
        )}
        {ALL_DESTINATIONS.map((d) => {
          const pos = PIN_POS[d.slug];
          if (!pos) return null;
          const isActive = active === d.slug;
          return (
            <button
              key={d.slug}
              onMouseEnter={() => setActive(d.slug)}
              onFocus={() => setActive(d.slug)}
              onClick={() => goTo(d.slug)}
              className="absolute group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', willChange: 'transform' }}
              aria-label={`Open ${d.name}`}
            >
              <span className="absolute -inset-4 rounded-full bg-emerald-400/15 opacity-0 group-hover:opacity-100 transition"></span>
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-300/60 ${isActive ? 'animate-ping' : 'group-hover:animate-ping'}`}></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white/90 shadow"></span>
              </span>
            </button>
          );
        })}
      </div>
  
      {/* Right panel */}
      <div className="relative w-full md:w-[480px] bg-white h-1/2 md:h-full shadow-2xl translate-x-0 md:animate-[slideIn_380ms_cubic-bezier(0.22,1,0.36,1)]" style={{ willChange: 'transform, opacity' }}>
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="font-bold">Explore Tanzania places</div>
          <button onClick={() => navigate(-1)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close explorer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-5 py-3 border-b bg-gray-50">
          <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search destination or region (e.g., Zanzibar)"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        <div ref={listRef} className="overflow-auto h-[calc(100%-112px)] p-3 sm:p-4">
          <div className="space-y-3">
            {filtered.map((d) => (
              <button
                key={d.slug}
                data-slug={d.slug}
                onMouseEnter={() => setActive(d.slug)}
                onFocus={() => setActive(d.slug)}
                onClick={() => goTo(d.slug)}
                className={`w-full text-left p-3 rounded-xl border transition group hover:border-emerald-500 hover:bg-emerald-50 ${active === d.slug ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {d.name}
                      <span className="flex items-center gap-1 text-amber-500 text-xs"><Star className="w-3 h-3" /> 5.0</span>
                    </div>
                    {d.region && <div className="text-xs text-gray-500">{d.region}</div>}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-gray-500 py-8">No destinations found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render overlay at document.body to avoid stacking context issues with header/footer
  return createPortal(overlay, document.body);
};

export default MapExplorer;
