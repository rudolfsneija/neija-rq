import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'true') {
      enableAnalytics();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
    enableAnalytics();
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
  };

  const enableAnalytics = () => {
    // Ensure gtag is available
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // Define gtag function if it doesn't exist yet
      if (typeof window.gtag !== 'function') {
        window.gtag = function() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer.push(arguments);
        };
      }
      
      // Initialize GA
      window.gtag('js', new Date());
      window.gtag('config', 'G-XF2JBX7SE4');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm mb-4 sm:mb-0 sm:mr-8">
          <p className="mb-1">
            We use cookies to enhance your experience and analyze website traffic. 
            By clicking "Accept", you consent to our website's cookie use.
          </p>
          <Link to="/cookie-policy" className="text-blue-300 hover:text-blue-200 underline text-xs">
            Learn more about our Cookie Policy
          </Link>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={acceptCookies}
            className="bg-green-600 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-2 px-4 rounded-md transition-colors"
            aria-label="Decline cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}