import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-red-950 text-white mt-[16vh]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <p className="text-sm leading-6 text-gray-300">
              Professional motocross ATV service and performance parts.
              Located in Ozolnieki, Latvia.
            </p>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+371 26551197</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>agris@neija.lv</span>
              </div>
            </div>
          </div>
          <div className="mt-16 xl:col-span-2 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 mb-6 text-center xl:text-left">Navigation</h3>
            <nav>
              <ul className="flex flex-wrap justify-center xl:justify-start gap-y-4 gap-x-8">
                <li>
                  <Link to="/racing-parts" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Racing Parts
                  </Link>
                </li>
                <li>
                  <Link to="/custom-parts" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Custom Parts
                  </Link>
                </li>
                <li>
                  <Link to="/quad-builds" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Quad Builds
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Service
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-sm leading-6 text-gray-300 hover:text-white whitespace-nowrap">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            {new Date().getFullYear()} Neija Racing Quads
          </p>
        </div>
      </div>
    </footer>
  );
}