import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Navigation } from 'lucide-react';
import { useLocation, defaultLocations } from '../contexts/LocationContext';
import type { LocationData } from '../contexts/LocationContext';

export const LocationModal = () => {
  const { isModalOpen, setIsModalOpen, currentLocation, setCurrentLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLocations = defaultLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, setIsModalOpen]);

  const handleSelect = (loc: LocationData) => {
    setCurrentLocation(loc);
    setIsModalOpen(false);
  };

  const handleAutoDetect = () => {
    setIsDetecting(true);
    // Mocking an API call for detection
    setTimeout(() => {
      handleSelect(defaultLocations[1]); // Mocks resolving to United States
      setIsDetecting(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-start p-4 sm:p-6" style={{ zoom: 'var(--a11y-scale, 1)' } as React.CSSProperties}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-full max-w-2xl bg-white dark:bg-[#0a0e14] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-gray-900 dark:text-gray-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Select Region</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customize your experience based on your location</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search & Auto-detect */}
              <div className="p-6 pb-2 border-b border-black/5 dark:border-white/5 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for a city or state..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/10 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-500"
                  />
                </div>

                <button 
                  onClick={handleAutoDetect}
                  disabled={isDetecting}
                  className="w-full flex items-center justify-start gap-2 py-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDetecting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Navigation className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Navigation className="h-4 w-4" />
                  )}
                  {isDetecting ? 'Detecting Location...' : 'Use Current Location'}
                </button>
              </div>

              {/* Location List */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {filteredLocations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredLocations.map((loc) => {
                      const isActive = currentLocation.id === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => handleSelect(loc)}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                            isActive 
                              ? 'border-gray-200 dark:border-gray-700 bg-black/5 dark:bg-white/5 shadow-sm dark:shadow-md' 
                              : 'border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                        >
                          <div>
                            <div className={`text-sm font-bold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                              {loc.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{loc.region}</div>
                          </div>
                          {isActive && (
                            <div className="h-2 w-2 rounded-full bg-gray-800 dark:bg-gray-200 shadow-sm dark:shadow-md" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-left text-gray-500">
                    No locations found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
