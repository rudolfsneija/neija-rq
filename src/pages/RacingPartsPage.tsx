import { ArrowRight, Link as LinkSymbol } from "lucide-react";
import { Link } from "react-router-dom";

export function RacingPartsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Racing Parts</h1>
        <p className="mt-4 text-lg text-gray-600">
          We offer a comprehensive selection of high-performance racing parts
          from industry-leading manufacturers.
        </p>

        <section className="mt-12">
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Tyres */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/goldspeed_D.jpeg"
                alt="Goldspeed Tyres"
                className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Tyres</h3>
              <p className="mt-2 text-gray-600">
                Wide selection of tyres for quads and crosscarts for all kinds
                of tracks and surfaces.
              </p>
              <Link
                to="/racing-parts/tyres"
                className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
              >
                <span>View all tyres</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* TFX Suspension */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/TFX_D.jpeg"
                alt="TFX Suspension"
                className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">TFX Suspension</h3>
              <p className="mt-2 text-gray-600">
                High-quality custom built suspension.
              </p>
              <Link
                to="/racing-parts/tfx-suspension"
                className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
              >
                <span>See more</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Beringer Brakes */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/beringer_D.jpeg"
                alt="Beringer Brakes"
                className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Beringer Brakes</h3>
              <p className="mt-2 text-gray-600">
                Performance brakes for quads, supermoto, road racing. Made in
                France.
              </p>
              <Link
                to="/racing-parts/beringer"
                className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
              >
                <span>See more</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Precision Racing Products */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/precision_damper.jpg"
                alt="Precision Steering Damper"
                className="mb-4 h-[300px] w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">
                Precision Racing Products
              </h3>
              <p className="mt-2 text-gray-600">
                ATV steering dampers/stabilizers. Official distributor of
                Precision Racing Products in Latvia.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <a
                    href="https://precision-rp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    precision-rp.com
                  </a>
                </div>
              </div>
            </div>

            {/* Bihr Parts */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/bihr.png"
                alt="Bihr Parts"
                className="mb-4 h-40 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Bihr Parts</h3>
              <p className="mt-2 text-gray-600">
                Wide range of parts for quads, ATVs, motocross bikes. Express
                delivery within a week. Full assortment can be viewed in the
                link, choose what you need and we will deliver it to you.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <a
                    href="https://www.mybihr.com/ww/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    mybihr.com
                  </a>
                </div>
              </div>
            </div>

            {/* ASP Group Parts */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/asp_logo.jpg"
                alt="Bihr Parts"
                className="mb-4 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">ASP Group Parts</h3>
              <p className="mt-2 text-gray-600">
                Wide range of parts for quads, ATVs, motocross bikes, equipment.
                Full assortment can be viewed in the link, choose what you need
                and we will deliver it to you.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <a
                    href="https://www.aspshop.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    aspshop.eu
                  </a>
                </div>
              </div>
            </div>

            {/* DRAG'ON Parts */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="/images/racing_parts/dragon_logo.png"
                alt="Dragon Racing Products"
                className="mb-4 bg-black w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">DRAG'ON Parts</h3>
              <p className="mt-2 text-gray-600">
                Wide range of parts for quads, ATVs. Full assortment can be
                viewed in the link, choose what you need and we will deliver it
                to you.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <a
                    href="https://www.dragonfrance.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    dragonfrance.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
