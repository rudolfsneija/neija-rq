import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { HomePage } from './pages/HomePage';
import { RacingPartsPage } from './pages/RacingPartsPage';
import { TyresPage } from './pages/TyresPage';
import { CustomPartsPage } from './pages/CustomPartsPage';
import { QuadBuildsPage } from './pages/QuadBuildsPage';
import { BuildDetailsPage } from './pages/BuildDetailsPage';
import { ServicePage } from './pages/ServicePage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/admin/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import CookieConsent from './components/CookieConsent';
import CookiePolicy from './pages/CookiePolicy';


// Import Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { BuildsList } from './pages/admin/BuildsList';
import { BuildForm } from './pages/admin/BuildForm';
import { TyresList } from './pages/admin/TyresList';
import { TyreForm } from './pages/admin/TyreForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Authentication Route */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="builds" element={<BuildsList />} />
              <Route path="builds/new" element={<BuildForm />} />
              <Route path="builds/:id" element={<BuildForm />} />
              <Route path="tyres" element={<TyresList />} />
              <Route path="tyres/new" element={<TyreForm />} />
              <Route path="tyres/:id" element={<TyreForm />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/racing-parts" element={<RacingPartsPage />} />
                  <Route path="/racing-parts/tyres" element={<TyresPage />} />
                  <Route path="/custom-parts" element={<CustomPartsPage />} />
                  <Route path="/quad-builds" element={<QuadBuildsPage />} />
                  <Route path="/quad-builds/:id" element={<BuildDetailsPage />} />
                  <Route path="/service" element={<ServicePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;