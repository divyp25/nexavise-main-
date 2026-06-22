import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, CheckCircle } from 'lucide-react';

export const CookieBanner = () => {
  const [consentStatus, setConsentStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    setConsentStatus(consent);
    
    // Always show a popup, small delay for better UX
    const timer = window.setTimeout(() => setIsVisible(true), 1000);
    
    let hideTimer: number;
    if (consent === 'accepted') {
      setConsentStatus('accepted');
      hideTimer = window.setTimeout(() => setIsVisible(false), 3000);
    } else if (consent === 'declined') {
      setConsentStatus('declined');
      hideTimer = window.setTimeout(() => setIsVisible(false), 3000);
    }

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsentStatus('accepted');
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setConsentStatus('declined');
    setIsVisible(false);
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-md bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
          style={{ zoom: 'var(--a11y-scale, 1)' } as React.CSSProperties}
        >
          {consentStatus === 'accepted' ? (
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 items-center">
                <div className="bg-green-50 dark:bg-green-500/10 p-2 rounded-xl h-fit">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold">Cookies Accepted</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your cookie preferences have been saved.
                  </p>
                </div>
              </div>
              <button 
                onClick={closeBanner}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-xl h-fit">
                  <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold mb-1">We value your privacy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptCookies}
                      className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={declineCookies}
                      className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={closeBanner}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
