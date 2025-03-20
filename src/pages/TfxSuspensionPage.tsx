import { ArrowLeft, Link as LinkSymbol } from "lucide-react";
import { Link } from "react-router-dom";
import { SimpleGallery } from "../components/SimpleGallery";

export function TfxSuspensionPage() {
  const suspensionImages = [
    { src: "/images/racing_parts/tfx/tfx1.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx2.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx3.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx4.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx5.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx6.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx7.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx8.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx9.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx10.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx11.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx12.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx13.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx14.jpeg", alt: "TFX Suspension" },
    { src: "/images/racing_parts/tfx/tfx15.jpeg", alt: "TFX Suspension" },
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
              images={suspensionImages}
              className="h-full rounded-lg"
            />
          </div>

          {/* Content section */}
          <div>
            <h1 className="text-4xl font-bold">TFX Suspension</h1>
            <div className="mt-6 space-y-6 text-gray-600">
              <p>
                TFX Suspension represents the pinnacle of quad racing suspension
                technology. Each unit is custom built to match your specific
                requirements, vehicle specifications, and riding style.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">
                Key Features
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>4-way adjustable for precise handling</li>
                <li>Custom valving specific to rider weight and style</li>
                <li>
                  High-quality materials for durability in racing conditions
                </li>
                <li>Fully rebuildable and serviceable</li>
                <li>Compatible with most popular quad racing models</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900">
                Custom Options
              </h2>
              <p>Every TFX suspension unit can be customized with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Spring rates specific to your weight and riding style</li>
                <li>Custom valving configurations</li>
                <li>Extended travel modifications</li>
              </ul>

              <div className="flex items-center space-x-2">
                <LinkSymbol className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <a
                  href="https://tfxsuspension.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 font-semibold"
                >
                  tfxsuspension.com
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
