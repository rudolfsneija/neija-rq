import { SimpleGallery } from "../components/SimpleGallery";

export function CustomPartsPage() {
  const frameImages = [
    { src: "/images/custom_parts/frame/frame1.webp", alt: "Frame" },
    { src: "/images/custom_parts/frame/frame2.webp", alt: "Frame" },
    { src: "/images/custom_parts/frame/frame3.webp", alt: "Frame" },
    { src: "/images/custom_parts/frame/frame4.webp", alt: "Frame" },
  ];

  const swingarmImages = [
    { src: "/images/custom_parts/swingarm/swingarm4.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm1.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm2.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm3.jpeg", alt: "Swingarm" },
    { src: "/images/custom_parts/swingarm/swingarm5.jpeg", alt: "Swingarm" },
  ];

  const a_armsImages = [
    { src: "/images/custom_parts/a_arms/a_arms_main.jpeg", alt: "A-Arms" },
    { src: "/images/custom_parts/a_arms/a_arms1.jpeg", alt: "A-Arms" },
    { src: "/images/custom_parts/a_arms/a_arms2.jpeg", alt: "A-Arms" },
    { src: "/images/custom_parts/a_arms/a_arms3.jpeg", alt: "A-Arms" },
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
                              images={frameImages} 
                              className="h-full"
                            />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Frame</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Hand-built ATV frame handcrafted from high grade chromoly steel tubes.
                </p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600">
                  <li>Based on <i>Yamaha YFZ450R</i> suspension geometry</li>
                  <li>Mounts for a <i>KTM SXF</i> engine</li>
                  <li>Robust design for quick and easy assembly and disassembly</li>
                  <li>Chromoly steel tube construction - strong and light</li>
                  <li>Reinforced struts - Added support for increased durability</li>
                </ul>
              </div>
            </div>
          </section>

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
                  <li>Chromoly steel tube construction - strong and light</li>
                  <li>Reinforced struts - Added support for increased durability</li>
                  <li>Integrated <i>Brembo</i> brake caliper mounts</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <SimpleGallery 
                              images={a_armsImages} 
                              className="h-full"
                            />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">A-Arms</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Custom A-Arms designed for racing quads, built for performance and durability. Made from high-grade chromoly steel tubes.
                </p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600">
                  <li>Based on <i>Yamaha YFZ450R</i> suspension geometry</li>
                  <li>Chromoly steel tube construction - strong and light</li>
                  <li>Reinforced struts - Added support for increased durability</li>
                  <li>Adjustable camber and caster - Allows fine-tuning of suspension geometry for different riding styles and track conditions</li>
                  <li>Designed for use with FRAP ball joints - Easy bolt-on installation without the need for a press, unlike cup-style ball joints</li>
                </ul>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}