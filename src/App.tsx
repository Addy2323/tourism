import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import AdminProtectedRoute, { UserProtectedRoute } from './components/AdminProtectedRoute';
import AdminTest from './components/AdminTest';
import { usePerformance } from './hooks/usePerformance';

// Preload critical components immediately
const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const BookingPage = lazy(() => import('./pages/bookingpage'));
const PlanTrip = lazy(() => import('./pages/PlanTrip'));
const About = lazy(() => import('./pages/About'));
const AboutCompany = lazy(() => import('./pages/AboutCompany'));
const OurTeam = lazy(() => import('./pages/OurTeam'));
const OurVehicles = lazy(() => import('./pages/OurVehicles'));
const Blog = lazy(() => import('./pages/Blog'));
const CommunityImpact = lazy(() => import('./components/CommunityImpact'));
const Contact = lazy(() => import('./pages/Contact'));
import UserDashboard from './pages/UserDashboard';
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const MapExplorer = lazy(() => import('./pages/MapExplorer'));

// Destination detail pages with prefetch hints
const SerengetiDetail = lazy(() => 
  import(/* webpackChunkName: "serengeti" */ './pages/destinations/SerengetiDetail')
);

const NgorongoroDetail = lazy(() => 
  import(/* webpackChunkName: "ngorongoro" */ './pages/destinations/NgorongoroDetail')
);

const TarangireDetail = lazy(() => 
  import(/* webpackChunkName: "tarangire" */ './pages/destinations/TarangireDetail')
);
const LakeManyaraDetail = lazy(() => 
  import(/* webpackChunkName: "lake-manyara" */ './pages/destinations/LakeManyaraDetail')
);
const MikumiDetail = lazy(() => 
  import(/* webpackChunkName: "mikumi" */ './pages/destinations/MikumiDetail')
);
const UdzungwaDetail = lazy(() => 
  import(/* webpackChunkName: "udzungwa" */ './pages/destinations/UdzungwaDetail')
);
const SelousDetail = lazy(() => 
  import(/* webpackChunkName: "selous" */ './pages/destinations/SelousDetail')
);
const SaadaniDetail = lazy(() => 
  import(/* webpackChunkName: "saadani" */ './pages/destinations/SaadaniDetail')
);
const MkomaziDetail = lazy(() => 
  import(/* webpackChunkName: "mkomazi" */ './pages/destinations/MkomaziDetail')
);
const ArushaDetail = lazy(() => 
  import(/* webpackChunkName: "arusha" */ './pages/destinations/ArushaDetail')
);

// Enhanced loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
      <p className="text-emerald-700 font-medium">Loading...</p>
    </div>
  </div>
);

// Route transition component
const RouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-fadeIn">
      {children}
    </div>
  );
};

// Ensure window scrolls to top on each route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use instant jump to top to avoid any accumulated offset
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

// Inline modern FAQ page (can be extracted to src/pages/FAQ.tsx later)
const FAQPageInline: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get('q') || '';
  const initialCat = params.get('cat') || 'all';
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [open, setOpen] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1); // suggestions keyboard nav

  // Categorized FAQ data
  const data: Record<string, { q: string; a: string }[]> = {
    booking: [
      { q: 'How do I book a tour?', a: 'Choose your destination or itinerary, click “Book”, then follow the guided steps. Our team will confirm availability and next steps via email.' },
      { q: 'Can I change my dates after booking?', a: 'Yes. Date changes are possible subject to availability and supplier policies. Contact us as early as possible for the best options.' },
      { q: 'What is your cancellation policy?', a: 'Flexible within 24–48 hours of booking. Closer to departure, supplier policies apply. We’ll provide a clear breakdown before you pay.' },
    ],
    payments: [
      { q: 'What payment methods do you accept?', a: 'Major credit cards, bank transfer, and secure online payments. We’ll send an invoice link with instructions.' },
      { q: 'Do you require a deposit?', a: 'Yes. A deposit confirms your booking. The remaining balance is due before the trip starts as indicated in your invoice.' },
      { q: 'Are prices in USD?', a: 'Yes, prices are shown in USD by default. You can switch currencies in the header; final charge is processed in USD unless stated otherwise.' },
    ],
    logistics: [
      { q: 'Do you provide airport pickup?', a: 'Yes. Private airport transfers are available in all major arrival cities and included in most packages.' },
      { q: 'What is included in the safari package?', a: 'Accommodation, park fees, guide, 4x4 vehicle, and most meals. Exclusions like visas and tips are listed on each package.' },
      { q: 'Is Wi‑Fi available during the trip?', a: 'Many lodges offer Wi‑Fi. On the road, connectivity can vary. We also offer local SIM recommendations.' },
    ],
    safety: [
      { q: 'Is it safe to travel in Tanzania?', a: 'Yes. We work with licensed guides, vetted partners, and follow safety protocols. As with any travel, follow local guidance and your guide’s instructions.' },
      { q: 'Do I need travel insurance?', a: 'Highly recommended. Insurance should cover medical, evacuation, cancellation, and baggage.' },
      { q: 'What vaccinations are required?', a: 'Requirements vary. Yellow fever vaccination is recommended/required depending on your transit. Consult a travel clinic ahead of time.' },
    ],
    destinations: [
      { q: 'Best time to visit Serengeti?', a: 'Dry season June–October for classic safaris; December–March for calving season in the south.' },
      { q: 'Is Zanzibar good year-round?', a: 'Yes. Short rainy windows in April/May and November. Otherwise, warm and beach-friendly most months.' },
      { q: 'Can I climb Kilimanjaro without experience?', a: 'Yes, but good fitness is required. Choose a longer route (7–8 days) for acclimatization and higher success rates.' },
    ],
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'booking', label: 'Booking' },
    { id: 'payments', label: 'Payments' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'safety', label: 'Health & Safety' },
    { id: 'destinations', label: 'Destinations' },
  ];

  // Flatten and tag with category
  const allFaqs = Object.entries(data).flatMap(([cat, items]) => items.map(x => ({ ...x, cat })));

  // URL sync
  useEffect(() => {
    const p = new URLSearchParams();
    if (query) p.set('q', query);
    if (category && category !== 'all') p.set('cat', category);
    const search = p.toString();
    if (search !== location.search.replace(/^\?/, '')) {
      navigate({ pathname: '/faq', search: search ? `?${search}` : '' }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  // Simple scoring + filtering
  const norm = (s: string) => s.toLowerCase();
  const q = norm(query);
  const pool = category === 'all' ? allFaqs : allFaqs.filter(f => f.cat === category);
  const scored = pool
    .map((f) => {
      const text = norm(f.q + ' ' + f.a);
      const idx = q ? text.indexOf(q) : -1;
      const score = q ? (idx === -1 ? -1 : 1000 - idx) : 0; // earlier match ranks higher
      return { ...f, score };
    })
    .filter(f => q ? f.score >= 0 : true)
    .sort((a, b) => b.score - a.score || a.q.localeCompare(b.q));

  // Suggestions (top 5 questions)
  const suggestions = q ? scored.slice(0, 5) : [];

  // Highlight helper
  const highlight = (text: string) => {
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q);
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-amber-200 text-emerald-900 rounded px-0.5">{text.slice(i, i + q.length)}</mark>
        {text.slice(i + q.length)}
      </>
    );
  };

  // JSON-LD for filtered items (limit to 10)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': (q ? scored : pool).slice(0, 10).map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        className="container-mobile pt-24 pb-8 sm:py-12"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 96px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 scroll-mt-24">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-800">Frequently Asked Questions</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find quick answers about booking, payments, safety, and more.</p>
          </div>

          {/* Search + Suggestions */}
          <div className="relative mb-4 scroll-mt-24">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIdx(-1); }}
              onKeyDown={(e) => {
                if (!suggestions.length) return;
                if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
                if (e.key === 'Enter' && activeIdx >= 0) {
                  const sel = suggestions[activeIdx];
                  setQuery(sel.q);
                  setOpen(sel.q);
                }
              }}
              placeholder="Search questions... (e.g. deposit, transfer, safari)"
              aria-label="Search FAQ"
              autoComplete="off"
              enterKeyHint="search"
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">🔎</div>
            {suggestions.length > 0 && (
              <div className="absolute mt-2 w-full bg-white rounded-xl shadow-classic border border-emerald-100 z-30 overflow-hidden max-h-60 overflow-y-auto overscroll-contain">
                {suggestions.map((s, i) => (
                  <button
                    key={s.q}
                    onMouseDown={() => { setQuery(s.q); setOpen(s.q); }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-start gap-2 ${i === activeIdx ? 'bg-emerald-50' : 'hover:bg-emerald-50'}`}
                  >
                    <span className="text-emerald-600">Q:</span>
                    <span className="text-gray-800">{highlight(s.q)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Chips */}
          <div className="mb-6 -mx-4 px-4 overflow-x-auto sm:overflow-visible">
            <div className="inline-flex gap-2 whitespace-nowrap sm:whitespace-normal sm:flex sm:flex-wrap">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    category === c.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {(q ? scored : pool).length === 0 && (
              <div className="p-4 text-sm text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-100">No results. Try different keywords.</div>
            )}
            {(q ? scored : pool).map((item) => {
              const isOpen = open === item.q;
              return (
                <div key={item.q} className={`rounded-2xl border ${isOpen ? 'border-emerald-300 bg-white shadow-classic' : 'border-gray-200 bg-white/80'} transition-all`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="block font-semibold text-gray-900 text-base sm:text-lg">{highlight(item.q)}</span>
                      <span className="mt-0.5 inline-block text-xs text-gray-500 capitalize">{item.cat}</span>
                    </div>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-emerald-700 border-emerald-200 bg-emerald-50 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 sm:px-5 text-gray-700 leading-relaxed text-sm sm:text-base">{highlight(item.a)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">Still have questions? <a href="/contact" className="text-emerald-700 font-semibold hover:underline">Contact us</a>.</div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { metrics } = usePerformance();
  const hzClass = metrics.isUltraHighRefreshRate ? 'hz-240' : metrics.isHighRefreshRate ? 'hz-120' : '';

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Preload critical routes on app start
  useEffect(() => {
    const preloadRoutes = async () => {
      try {
        // Preload most visited pages
        await Promise.all([
          import('./pages/Home'),
          import('./pages/Destinations'),
        ]);
      } catch (error) {
        console.log('Preload failed:', error);
      }
    };

    preloadRoutes();
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <AuthProvider>
        <CurrencyProvider>
          <div className={`min-h-screen bg-white ${hzClass}`}>
            <ScrollToTop />
            <Header onAuthClick={() => setIsAuthModalOpen(true)} />
            
            <Suspense fallback={<PageLoader />}>
              <RouteTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/faq" element={<FAQPageInline />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/map" element={<MapExplorer />} />
                  <Route path="/destinations/serengeti" element={<SerengetiDetail />} />
                  
                  <Route path="/destinations/lake-manyara" element={<LakeManyaraDetail />} />  
                  <Route path="/destinations/tarangire" element={<TarangireDetail />} />
                 
                  <Route path="/destinations/ngorongoro" element={<NgorongoroDetail />} />
                  <Route path="/destinations/mikumi" element={<MikumiDetail />} />
                  <Route path="/destinations/udzungwa" element={<UdzungwaDetail />} />
                  <Route path="/destinations/selous" element={<SelousDetail />} />
                  <Route path="/destinations/saadani" element={<SaadaniDetail />} />
                  <Route path="/destinations/mkomazi" element={<MkomaziDetail />} />
                  <Route path="/destinations/arusha" element={<ArushaDetail />} />
                  <Route path="/experiences" element={<ExperiencesPage />} />
                  <Route path="/plan-your-trip" element={<PlanTrip />} />
                  <Route path="/impact" element={<CommunityImpact />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/about/company" element={<AboutCompany />} />
                  <Route path="/about/team" element={<OurTeam />} />
                  <Route path="/about/vehicles" element={<OurVehicles />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <UserProtectedRoute>
                        <UserDashboard />
                      </UserProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <AdminProtectedRoute>
                        <Suspense fallback={<PageLoader />}>
                          <AdminDashboard />
                        </Suspense>
                      </AdminProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/test" 
                    element={
                      <AdminProtectedRoute>
                        <AdminTest />
                      </AdminProtectedRoute>
                    } 
                  />
                </Routes>
              </RouteTransition>
            </Suspense>
            
            <Footer />
            
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onClose={() => setIsAuthModalOpen(false)} 
            />
          </div>
        </CurrencyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;