import { Facebook, Instagram, Link } from "lucide-react";
import { SimpleGallery } from "../components/SimpleGallery";

export function AboutUsPage() {
  const agrisImages = [
    {
      src: "/images/about_us/agris_1985.jpeg",
      alt: "Agris Neija 1985 Motorcycle",
    },
    { src: "/images/about_us/agris1.jpeg", alt: "Agris Neija Quad" },
    { src: "images/about_us/agris3.jpeg", alt: "Agris Neija Quad" },
  ];

  const karlisImages = [
    { src: "/images/about_us/kaza1_D.jpeg", alt: "Karlis Neija Quad" },
    { src: "/images/about_us/kaza2_D.jpeg", alt: "Karlis Neija Quad" },
  ];

  const rudisImages = [
    { src: "/images/about_us/es_kramolin.jpg", alt: "Niks Rudolfs Neija" },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">About Us</h1>

        <div className="mt-16 space-y-24">
          <section className="bg-white p-6 rounded-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg overflow-hidden">
                <SimpleGallery
                  images={agrisImages}
                  className="h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Agris Neija</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Founded by Agris Neija, Neija Racing Quads brings years of
                  experience in motorcycle and quad racing, maintenance, design
                  and championship-winning quad builds.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  Racing motorcycles professionally since 1985, multiple-time
                  champion in Superbike and Superport classes. Racing quads
                  professionally since 2006, multiple-time champion in Latvian
                  and Baltic Championships. Represented team Latvia in Quad
                  Motocross of Nations.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  Building, modifying and maintaining quads for over 15 years,
                  with unique and specialized solutions to achieve the best
                  performance and championship victories.
                </p>

                <div className="mt-6 flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Facebook className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <a
                      href="https://www.facebook.com/agris.neija"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 font-semibold"
                    >
                      Agris Neija
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <a
                      href="https://www.instagram.com/agrisneija/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-600 font-semibold"
                    >
                      @agrisneija
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg overflow-hidden">
                <SimpleGallery
                  images={karlisImages}
                  className="h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Kārlis Neija</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Main test rider. In 2025 competing in the European
                  Championship with the NRQ25 quad.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  Racing quads for more than 10 years, starting from the 50cc
                  class and moving through the junior classes to the European
                  Championship, Quad Motocross of Nations and endurance racing.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  Multiple-time Latvian champion in the junior classes. Latvian
                  Q Open class champion in 2023. Represented team Latvia in the
                  Quad Motocross of Nations in 2023 and 2024. Competed in the
                  Pont de Vaux 24-hour endurance race in 2023 and 2024. All this
                  with quads built by Neija Racing Quads.
                </p>

                <div className="mt-6 flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Facebook className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <a
                      href="https://www.facebook.com/profile.php?id=100054321288874"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 font-semibold"
                    >
                      Kārlis Neija #69
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <a
                      href="https://www.instagram.com/karlisneija69/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-600 font-semibold"
                    >
                      @karlisneija69
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg overflow-hidden">
                <SimpleGallery
                  images={rudisImages}
                  className="h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold">Niks Rūdolfs Neija</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Author of this website including design, content and
                  programming. Throughout the years designed the graphics for
                  racing quads, taken professional photos and videos of quad
                  builds and racing events for Neija Racing Quads.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  The website is written in TypeScript using React and Tailwind
                  CSS for the frontend, and Node.js with Express for the
                  backend. It is self-hosted on an Intel NUC server. The
                  majority of the images seen in the website were taken by me,
                  including the Blender 3D renders of the NRQ parts.
                </p>

                <p className="mt-4 text-lg text-gray-600">
                  Founder of SIA "KNN Serviss" specialising in IT solutions,
                  cybersecurity, enterprise Wi-Fi and video surveillance.
                </p>

                <div className="mt-6 flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Link className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <a
                      href="https://www.knn.lv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 font-semibold"
                    >
                      knn.lv
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
