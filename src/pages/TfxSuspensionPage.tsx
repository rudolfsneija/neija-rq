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
          <div className="h-[600px]">
            <SimpleGallery
              images={suspensionImages}
              className="h-full rounded-lg"
            />
          </div>

          {/* Content section */}
          <div>
            <h1 className="text-4xl font-bold">TFX Suspension</h1>
            <div className="mt-6 space-y-6 text-gray-600">
              <p className="font-medium">
                Premium performance suspension systems for quads and ATVs, engineered for exceptional handling in racing and recreational applications. <br />
                Neija Racing Quads is the official distributor for TFX Suspension in Latvia.
              </p>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Front Shock - The Xtreme
                </h2>
                <p>
                  Built for ultra-high performance, these twin shock absorbers deliver superior control for all riding styles - from adventure riding to MX racing. Each shock features:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>CNC milled aluminum 7075 upper mount with compression reservoir</li>
                  <li>Dynamic compression valve system that automatically adjusts to conditions</li>
                  <li>Integrated high and low-speed compression adjustment</li>
                  <li>Customizable rebound damping for fine-tuning</li>
                  <li>Single or dual spring configuration with included C-spanner for preload adjustments</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Rear Shock - The Freelexer
                </h2>
                <p>
                  This high-performance mono shock delivers exceptional flexibility and control for all riding purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>3-way adjustable independent damping system</li>
                  <li>Remote nitrogen reservoir for enhanced cooling</li>
                  <li>High and low-speed compression adjustment</li>
                  <li>Adjustable rebound damping</li>
                  <li>Optional Hydraulic Preload Adjuster (HPA) for quick ride-height changes</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Customization Options
                </h2>
                <p>
                  Every TFX shock is built specifically for your application:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Custom damping valving developed for your specific application</li>
                  <li>Springs selected for your weight and intended use</li>
                  <li>Special requirements available (spring colors, anodizing options)</li>
                  <li>Custom length modifications</li>
                </ul>
              </div>

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