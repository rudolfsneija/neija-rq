import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Build, BuildImage } from '../lib/types';
import { buildsApi } from '../lib/api';

export function QuadBuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [buildImages, setBuildImages] = useState<Record<number, BuildImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        const data = await buildsApi.getAll();
        setBuilds(data);
        
        // Log the fetched data to console
        // console.log('Fetched builds data:', data);
        
        // Fetch images for each build
        const imagesPromises = data.map(async (build) => {
          try {
            const buildImages = await buildsApi.getImages(build.id.toString());
            return { buildId: build.id, images: buildImages };
          } catch (err) {
            console.error(`Error fetching images for build ${build.id}:`, err);
            return { buildId: build.id, images: [] };
          }
        });
        
        const imagesResults = await Promise.all(imagesPromises);
        
        // Convert array of results to a record object
        const imagesMap: Record<number, BuildImage[]> = {};
        imagesResults.forEach(result => {
          imagesMap[result.buildId] = result.images;
        });
        
        setBuildImages(imagesMap);
        console.log('Fetched build images:', imagesMap);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching builds:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  // Helper function to get primary image for a build
  const getPrimaryImage = (buildId: number): string => {
    const images = buildImages[buildId] || [];
    const primaryImage = images.find(img => img.is_primary);
    
    if (primaryImage) {
      return primaryImage.image_path;
    }
    
    // Return the first image if no primary image is set
    if (images.length > 0) {
      return images[0].image_path;
    }
    
    // Fallback to a default image
    return "https://placehold.co/600x400?text=No+Image";
  };

  // Filter featured builds
  const featuredBuilds = builds.filter(build => build.featured);
  const regularBuilds = builds.filter(build => !build.featured);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Quad Builds</h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse previous hybrid quad builds featuring championship-winning quads, endurance racing builds, and more.
        </p>

        {loading && (
          <div className="my-12 text-center">
            <p className="text-lg">Loading builds...</p>
          </div>
        )}

        {error && (
          <div className="my-12 rounded-md bg-red-50 p-4 text-red-700">
            <p>Error loading builds: {error}</p>
          </div>
        )}

        {/* Featured Builds */}
        {!loading && featuredBuilds.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">Featured Builds</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2">
              {featuredBuilds.map((build) => (
                <Link
                  key={build.id}
                  to={`/quad-builds/${build.id}`}
                  className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={getPrimaryImage(build.id)}
                      alt={build.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{build.name}</h3>
                    <p className="mt-2 text-gray-600">
                      {`${build.frame} / ${build.engine}`}
                    </p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span>{build.build_year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Other Builds */}
        {!loading && regularBuilds.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold">All Builds</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularBuilds.map((build) => (
                <Link 
                  key={build.id}
                  to={`/quad-builds/${build.id}`}
                  className="overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={getPrimaryImage(build.id)}
                      alt={build.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{build.name}</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{build.build_year}</p>
                      <p>{build.frame}</p>
                      <p>{build.engine}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!loading && builds.length === 0 && (
          <div className="my-16 text-center">
            <p className="text-lg text-gray-500">No builds available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}