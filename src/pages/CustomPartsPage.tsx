import { SimpleGallery } from "../components/SimpleGallery";

export function CustomPartsPage() {
  const prices = {
    frame: 2950,
    a_arms: 990,
    swingarm: 950,
    steering_stem: 270,
    subframe: 490,
    fuel_tank_s: 490,
    nerfbars: 450,
    pivot_bolt: 90,
    carbon_intake: 200,
    front_bumper: 90,
    battery_box: 55,
    all_set: 6500,
  };

  const formatPrice = (price: number) => {
    return `€ ${price.toLocaleString()}`;
  };

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
                <img
                  src="images/custom_parts/frame/ramis_pliks_BG.webp"
                  alt="Neija Racing Quads Frame"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Frame</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.frame)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  ATV frame handcrafted from high grade chromoly steel tubes.
                </p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600">
                  <li>
                    Based on <i>Yamaha YFZ450R</i> suspension geometry
                  </li>
                  <li>
                    Mounts for a <i>KTM SXF</i> engine
                  </li>
                  <li>
                    Robust design for quick and easy assembly and disassembly
                  </li>
                  <li>
                    Included mounts for <i>Precision</i> steering stabilizer
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/swingarm/daksa_BG.webp"
                  alt="Neija Racing Quads Swingarm"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Swingarm</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.swingarm)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Swingarm based on <i>Yamaha YFZ450R</i> suspension geometry.
                  Integrated <i>Brembo</i> brake caliper mounts.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/a_arms/plaukti_BG.webp"
                  alt="Neija Racing Quads A-Arms"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">A-Arms</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.a_arms)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Custom A-Arms based on Yamaha YFZ450R suspension geometry.
                  Designed for use with FRAP ball joints for easy bolt-on
                  installation without the need for a press, unlike cup-style
                  ball joints.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/subframe/pusramis_BG.webp"
                  alt="Neija Racing Quads Subframe"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Subframe</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.subframe)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Built to use unmodified MX exhaust systems.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/nerfbars/dugas_BG.webp"
                  alt="Neija Racing Quads Nerf Bars"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Nerf Bars</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.nerfbars)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Extra light nerf bars with large laser-cut foot pegs. Nets
                  included.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/bumper/bamperis_BG.webp"
                  alt="Neija Racing Quads Front Bumper"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Front Grab Bar</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.front_bumper)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Aluminium front grab bar designed to save weight.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <img
                  src="images/custom_parts/steering_stem/st_stienis_BG.webp"
                  alt="Neija Racing Quads Steering Stem"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Steering Stem</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.steering_stem)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  Steering stem with integrated mounts for <i>Precision</i> stabiliser.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <SimpleGallery
                  images={[
                    {
                      src: "/images/custom_parts/fuel_tank/tank1.jpeg",
                      alt: "Neija Racing Quads Fuel Tank",
                    },
                    {
                      src: "/images/custom_parts/fuel_tank/tank2.jpeg",
                      alt: "Neija Racing Quads Fuel Tank",
                    },
                    {
                      src: "/images/custom_parts/fuel_tank/tank3.jpeg",
                      alt: "Neija Racing Quads Fuel Tank",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Fuel Tank</h2>
                  <span className="text-base font-semibold text-gray-700 bg-gray-200 px-4 py-2 rounded-full">
                    {formatPrice(prices.fuel_tank_s)}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">
                  22 Liter capacity fuel tank for endurance racing.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
