import { SimpleGallery } from "../components/SimpleGallery";

export function CustomPartsPage() {
  const swingarmImages = [
    { src: "/images/custom_parts/swingarm/swingarm4.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm1.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm2.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm3.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm5.jpeg", alt: "Swingarm" },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Neija Racing Quads Parts</h1>
        <p className="mt-4 text-lg text-gray-600">
          Custom CAD designed and handcrafted parts for racing quads.
        </p>

        <div className="mt-16 space-y-24">
          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <SimpleGallery 
                              images={swingarmImages} 
                              className="h-full"
                            />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Swingarm</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Hand-built ATV swingarm handcrafted from high grade chromoly steel tubes making it stronger and lighter.
                </p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600">
                  <li>Based on <i>Yamaha YFZ450R</i> suspension geometry</li>
                  <li>Chromoly steel tube construction</li>
                  <li>Integrated <i>Brembo</i> brake caliper mounts</li>
                  <li>Reinforced struts for added durability</li>
                </ul>
              </div>
            </div>
          </section>

      
          
        </div>
      </div>
    </div>
  );
}