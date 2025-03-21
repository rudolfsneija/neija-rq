import { ArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src="images/other/emx_start_v1_D.jpg"
            alt="ATV Racing"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            MOTOCROSS ATV SERVICE & PERFORMANCE PARTS
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Specializing in high-performance ATV builds, racing parts, and professional maintenance services.
            Years of experience in quad racing, service, design and several championship-winning quad builds.
          </p>
        </div>
      </section>

      {/* Custom Parts */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <img
              src="/images/custom_parts/swingarm/swingarm-transparent4_D.png"
              alt="Swingarm"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Neija Racing Quads Parts</h2>
            <p className="mt-4 text-lg text-gray-600">
              Custom CAD designed and handcrafted parts for racing quads.
            </p>
            <Link
              to="/custom-parts"
              className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <span>See NRQ parts</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Build */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 bg-gray-50 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Featured Build: NRQ25</h2>
            <p className="mt-4 text-lg text-gray-600">
              The NRQ25 is the latest build by Neija Racing Quads. It features a custom built frame, subframe, a-arms, steering stem, nerfbars and fuel tank.
            </p>
            <Link
              to="/quad-builds/6"
              className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <span>See build</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div>
            <img
              src="images/other/NRQ1_C.jpeg"
              alt="ATV Racing"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Racing Parts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Racing Parts</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="images/racing_parts/goldspeed_D.jpeg"
                alt="Racing Parts"
                className="mb-4 h-64 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Tyres</h3>
              <p className="mt-2 text-gray-600">
                Wide selection of tyres for quads and crosscarts for all kinds of tracks and surfaces.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="images/racing_parts/TFX_D.jpeg"
                alt="Racing Parts"
                className="mb-4 h-64 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">TFX Suspension</h3>
              <p className="mt-2 text-gray-600">
                High-quality custom built suspension.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img
                src="images/racing_parts/beringer_D.jpeg"
                alt="Racing Parts"
                className="mb-4 h-64 w-full rounded object-cover"
              />
              <h3 className="text-xl font-semibold">Beringer Brakes</h3>
              <p className="mt-2 text-gray-600">
                Performance brakes for quads, supermoto, road racing. Made in France.
              </p>
            </div>
          </div>
          <Link
            to="/racing-parts"
            className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
          >
            <span>View all parts</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Service Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 bg-gray-50 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <img
                src="images/other/garaza2_D.jpeg"
                alt="Service Center"
                className="rounded-lg object-cover"
              />
            </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Engine and Suspension Service</h2>
            <p className="mt-4 text-lg text-gray-600">
              Engine and suspension maintenance and repair. Specialising in motocross bikes and quads. Regular maintenance and adjustment to rider needs. For all required services we supply all the necessary parts.
            </p>
            <Link
              to="/service"
              className="mt-8 inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <span>Learn more about our services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
}