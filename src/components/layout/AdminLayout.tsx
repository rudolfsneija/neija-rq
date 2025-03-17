import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 px-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="text-xl font-bold text-yellow-400">Admin Dashboard</div>
            
            {/* Navigation links in header */}
            <nav className="flex space-x-4">
              <Link to="/admin" className="px-3 py-2 rounded hover:bg-gray-700">
                Dashboard
              </Link>
              <Link to="/admin/builds" className="px-3 py-2 rounded hover:bg-gray-700">
                Builds
              </Link>
              <Link to="/admin/tyres" className="px-3 py-2 rounded hover:bg-gray-700">
                Tyres
              </Link>
            </nav>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}