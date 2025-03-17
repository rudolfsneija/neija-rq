import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Build } from '../../lib/types';
import { buildsApi } from '../../lib/api';

export function BuildsList() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuilds = async () => {
    try {
      setLoading(true);
      const data = await buildsApi.getAll();
      setBuilds(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this build? This action cannot be undone.')) {
      return;
    }

    try {
      await buildsApi.delete(id);
      // Refresh the list
      fetchBuilds();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (loading) {
    return <div className="p-4 text-yellow-400">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">Manage Builds</h1>
        <div className="flex gap-4">
          <Link to="/admin" className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors">
            Back to Dashboard
          </Link>
          <Link 
            to="/admin/builds/new" 
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 transition-colors"
          >
            Add New Build
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 mb-4 rounded">
          {error}
        </div>
      )}

      {builds.length === 0 && !loading && !error ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-400">No builds found. Add some builds to get started.</p>
        </div>
      ) : (
        <div className="bg-gray-800 shadow overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Frame</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Engine</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Year</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Featured</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {builds.map((build) => (
                <tr key={build.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{build.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{build.frame}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{build.engine}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{build.build_year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {build.featured ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link to={`/admin/builds/${build.id}`} className="text-blue-500 hover:text-blue-400 mr-4">Edit</Link>
                    <button 
                      onClick={() => handleDelete(build.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}