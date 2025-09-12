import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gauge, Hammer } from 'lucide-react';
import { Build, BuildImage } from '../lib/types';
import { buildsApi } from '../lib/api';
import { SimpleGallery } from '../components/SimpleGallery';
import { FormattedText } from '../components/FormattedText';

export function BuildDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [build, setBuild] = useState<Build | null>(null);
  const [images, setImages] = useState<BuildImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Build ID is missing');
      setLoading(false);
      return;
    }

    const fetchBuildDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch build details
        const buildData = await buildsApi.getById(id);
        setBuild(buildData);
        
        // Fetch build images
        const imagesData = await buildsApi.getImages(id);
        setImages(imagesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error(`Error fetching build ${id}:`, errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildDetails();
  }, [id]);

  // Convert images to format expected by SimpleGallery
  // Sort images to ensure primary image appears first
  const galleryImages = images
    .sort((a, b) => {
      // If a is primary, it comes first
      if (a.is_primary && !b.is_primary) return -1;
      // If b is primary, it comes first
      if (!a.is_primary && b.is_primary) return 1;
      // Otherwise maintain original order
      return 0;
    })
    .map(img => ({
      src: img.image_path,
      alt: build?.name || 'Build image'
    }));

  if (loading) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="my-12 text-center">
            <p className="text-lg">Loading build details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !build) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="my-12 rounded-md bg-red-50 p-4 text-red-700">
            <p>{error || 'Build not found'}</p>
            <Link to="/quad-builds" className="mt-4 inline-block text-red-700 underline">
              All builds
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/quad-builds" 
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all builds</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left column: Images */}
          <div>
            {galleryImages.length > 0 ? (
              <div className="overflow-hidden rounded-lg">
                <SimpleGallery 
                  images={galleryImages} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
          
          {/* Right column: Details */}
          <div>
            <h1 className="text-4xl font-bold">{build.name}</h1>
            
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-m font-medium text-gray-800">
                {build.build_year}
              </span>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <div className="rounded-md bg-black p-2">
                    <Hammer className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Frame</p>
                    <p className="text-lg font-semibold">{build.frame}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <div className="rounded-md bg-black p-2 ">
                    <Gauge className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Engine</p>
                    <p className="text-lg font-semibold">{build.engine}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold">Description</h2>
              <div className="mt-2 text-gray-600">
                {build.description ? (
                  <FormattedText text={build.description} />
                ) : (
                  <p>Custom {build.frame} build with {build.engine} engine.</p>
                )}
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-l font-bold">Interested in a similar build?</h2>
              <p className="mt-2 text-gray-600">
                Contact us to discuss how we can create a custom racing quad build tailored to your needs.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-block rounded-lg bg-gray-500 px-6 py-3 text-white hover:bg-gray-600 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}