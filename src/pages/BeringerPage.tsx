import { ArrowLeft, Link as LinkSymbol } from "lucide-react";
import { Link } from "react-router-dom";
import { SimpleGallery } from "../components/SimpleGallery";

export function BeringerPage() {
  // Sample images for the gallery
  const beringerImages = [
    {
      src: "/images/racing_parts/beringer/beringer1.jpg",
      alt: "Beringer Brakes",
    },
    {
      src: "/images/racing_parts/beringer/beringer2.png",
      alt: "Beringer Brake Caliper",
    },
    {
      src: "/images/racing_parts/beringer/beringer3.png",
      alt: "Beringer Master Cylinder",
    },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/racing-parts"
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Racing Parts</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Gallery section */}
          <div>
            <SimpleGallery
              images={beringerImages}
              className="h-full w-full max-h-[500px] rounded-lg"
            />
          </div>

          {/* Content section */}
          <div>
            <h1 className="text-4xl font-bold">Beringer Brakes</h1>
            <div className="mt-6 space-y-6 text-gray-600">
              <p>
                Beringer manufactures premium performance braking systems for
                motorcycles, quads, supermoto, and road racing vehicles. With
                precision engineering and high-quality materials, Beringer
                brakes offer superior stopping power and control.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">
                Why Choose Beringer
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Made in France with strict quality controls</li>
                <li>
                  Aerotec® technology for improved cooling and performance
                </li>
                <li>Lightweight aircraft-grade aluminum construction</li>
                <li>Precision CNC machining for optimal tolerances</li>
                <li>Racing-proven designs used by professional teams</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900">
                Available Products
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Brake calipers (2, 4, and 6 piston options)</li>
                <li>Master cylinders and brake levers</li>
                <li>Brake discs (round and wave designs)</li>
                <li>Complete brake kits for specific vehicle applications</li>
                <li>Brake lines and fittings</li>
                <li>Clutch components and controls</li>
              </ul>

              <div className="flex items-center space-x-2">
                <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <a
                  href="https://beringer-brakes.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 font-semibold"
                >
                  beringer-brakes.com
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  to="/contact"
                  className="inline-block rounded-md bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
