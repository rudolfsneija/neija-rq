import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RacingPartsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Racing Parts</h1>
        <p className="mt-4 text-lg text-gray-600">
          We offer a comprehensive selection of high-performance racing parts from industry-leading manufacturers.
        </p>

        {/* Main Tyres Section */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <img
                src="/images/racing_parts/goldspeed_D.jpeg"
                alt="Goldspeed Tyres"
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Tyres</h2>
                <p className="mt-4 text-lg text-gray-600">
                Wide selection of tyres for quads and crosscarts for all kinds of tracks and surfaces. Most popular models are available in stock. Special orders are delivered within a week from the Netherlands.<br />
                Official distributor of Goldspeed tyres in Latvia.
                </p>
              <Link
                to="/racing-parts/tyres"
                className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
              >
                <span>View all tyres</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Other Manufacturers */}
        <section className="mt-24">
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
              src="/images/racing_parts/TFX_D.jpeg"
              alt="TFX Suspension"
              className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">TFX Suspension</h3>
              <p className="mt-2 text-gray-600">
              High-quality custom built suspension. 4-way adjustable.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/beringer_D.jpeg"
                alt="Beringer Brakes"
                className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Beringer Brakes</h3>
              <p className="mt-2 text-gray-600">
                Performance brakes for quads, supermoto, road racing. Made in France. Official distributor in Latvia.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/bihr.png"
                alt="Bihr Parts"
                className="mb-4 h-40 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Bihr Parts</h3>
              <p className="mt-2 text-gray-600">
              Wide range of parts for quads, ATVs, motocross bikes. Express delivery within a week.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}