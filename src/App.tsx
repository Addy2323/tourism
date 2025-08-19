import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
const KilimanjaroDetail = lazy(() => 
  import(/* webpackChunkName: "kilimanjaro" */ './pages/destinations/KilimanjaroDetail')
);
const NgorongoroDetail = lazy(() => 
  import(/* webpackChunkName: "ngorongoro" */ './pages/destinations/NgorongoroDetail')
);
const ZanzibarDetail = lazy(() => 
  import(/* webpackChunkName: "zanzibar" */ './pages/destinations/ZanzibarDetails')
);
const TarangireDetail = lazy(() => 
  import(/* webpackChunkName: "tarangire" */ './pages/destinations/TarangireDetail')
);
const LakeManyaraDetail = lazy(() => 
  import(/* webpackChunkName: "lake-manyara" */ './pages/destinations/LakeManyaraDetail')
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
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: 'What is the best time to visit Tanzania?', a: 'June to October for safaris (dry season) and December to March for the Serengeti calving season. Zanzibar is great year-round with two short rainy windows.' },
    { q: 'Do you arrange airport pickups and transfers?', a: 'Yes. We provide private airport transfers and inter-destination transport with licensed guides and comfortable vehicles.' },
    { q: 'Are your tours customizable?', a: 'Absolutely. All itineraries can be tailored—accommodation level, pace, activities, and special interests.' },
    { q: 'What payment options are available?', a: 'We accept major credit cards, bank transfers, and secure online payments. Deposits confirm bookings, balance due before trip start.' },
    { q: 'Is travel insurance required?', a: 'We strongly recommend comprehensive travel insurance covering medical, trip cancellation, and baggage.' },
  ];
  const filtered = faqs.filter(x => (x.q + ' ' + x.a).toLowerCase().includes(query.toLowerCase()));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': filtered.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-mobile py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-emerald-800">Frequently Asked Questions</h1>
            <p className="text-gray-600 mt-2">Everything you need to know about traveling with Babblers Tours.</p>
          </div>

          <div className="relative mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">🔎</div>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="p-4 text-sm text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-100">No results. Try different keywords.</div>
            )}
            {filtered.map((item, idx) => {
              // Map back to original index to maintain a stable open index if needed
              const i = faqs.findIndex(f => f.q === item.q);
              const isOpen = open === i;
              return (
                <div key={item.q} className={`rounded-2xl border ${isOpen ? 'border-emerald-300 bg-white shadow-classic' : 'border-gray-200 bg-white/80'} transition-all`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-emerald-700 border-emerald-200 bg-emerald-50 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 text-gray-700 leading-relaxed">{item.a}</div>
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
                  <Route path="/destinations/zanzibar" element={<ZanzibarDetail />} />
                  <Route path="/destinations/lake-manyara" element={<LakeManyaraDetail />} />  
                  <Route path="/destinations/tarangire" element={<TarangireDetail />} />
                  <Route path="/destinations/kilimanjaro" element={<KilimanjaroDetail />} />
                  <Route path="/destinations/ngorongoro" element={<NgorongoroDetail />} />
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