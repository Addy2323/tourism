import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const MapExplorer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const overlay = (
    <div className="fixed inset-0 z-[9999] flex bg-black/40">
      {/* Full-screen Map (Google Maps embed) */}
      <div className="relative flex-1 h-full">
        <iframe
          title="Babblers Tours & Safaris - Map"
          src={
            'https://www.google.com/maps?q=' +
            encodeURIComponent('Babblers Tours & Safaris') +
            '&output=embed'
          }
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-3 left-3 z-10">
          <a
            href={
              'https://www.google.com/maps/search/?api=1&query=' +
              encodeURIComponent('Babblers Tours & Safaris')
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-emerald-700 border border-emerald-200 shadow hover:bg-white"
          >
            View larger map
          </a>
        </div>
        {/* Close button */}
        <div className="absolute top-3 right-3 z-10">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/95 border border-gray-200 shadow hover:bg-white" aria-label="Close explorer">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default MapExplorer;
