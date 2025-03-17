import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tyre } from '../../lib/types';
import { tyresApi } from '../../lib/api';

export function TyresList() {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTyres = async () => {
    try {
      setLoading(true);
      const data = await tyresApi.getAll();
      setTyres(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTyres();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tyre? This action cannot be undone.')) {
      return;
    }

    try {
      await tyresApi.delete(id);
      // Refresh the list
      fetchTyres();
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
        <h1 className="text-2xl font-bold text-yellow-400">Manage Tyres</h1>
        <div className="flex gap-4">
          <Link to="/admin" className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors">
            Back to Dashboard
          </Link>
          <Link 
            to="/admin/tyres/new" 
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 transition-colors"
          >
            Add New Tyre
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 mb-4 rounded">
          {error}
        </div>
      )}

      {tyres.length === 0 && !loading && !error ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-400">No tyres found. Add some tyres to get started.</p>
        </div>
      ) : (
        <div className="bg-gray-800 shadow overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Compound</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Terrain</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {tyres.map((tyre) => (
                <tr key={tyre.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tyre.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tyre.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tyre.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tyre.compound || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tyre.terrain || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <Link to={`/admin/tyres/${tyre.id}`} className="text-blue-500 hover:text-blue-400 mr-4">Edit</Link>
                    <button 
                      onClick={() => handleDelete(tyre.id)}
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