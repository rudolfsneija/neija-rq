import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Builds Management
          </h2>
          <p className="mb-4 text-gray-300">
            Manage quad builds, featured builds, and details.
          </p>
          <Link
            to="/admin/builds"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 inline-block transition-colors"
          >
            Manage Builds
          </Link>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Tyres Management
          </h2>
          <p className="mb-4 text-gray-300">
            Manage tyre inventory, add new tyres, update existing ones.
          </p>
          <Link
            to="/admin/tyres"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 inline-block transition-colors"
          >
            Manage Tyres
          </Link>
        </div>
      </div>
    </div>
  );
}
