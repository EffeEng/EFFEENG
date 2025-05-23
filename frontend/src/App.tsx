import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import ProjectsPage from './pages/public/ProjectsPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientOrders from './pages/client/Orders';
import ClientOrderDetail from './pages/client/OrderDetail';
import ClientReports from './pages/client/Reports';
import ClientFiles from './pages/client/Files';
import ClientPayments from './pages/client/Payments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminOrderDetail from './pages/admin/OrderDetail';
import AdminCreateBudget from './pages/admin/CreateBudget';
import AdminCreateReport from './pages/admin/CreateReport';
import AdminUploadFile from './pages/admin/UploadFile';
import AdminUsers from './pages/admin/Users';

// Protected Route Components
const ClientRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'client' && userRole !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/quem-somos" element={<AboutPage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/projetos" element={<ProjectsPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Client Routes */}
              <Route path="/cliente" element={
                <ClientRoute>
                  <ClientDashboard />
                </ClientRoute>
              } />
              <Route path="/cliente/ordens" element={
                <ClientRoute>
                  <ClientOrders />
                </ClientRoute>
              } />
              <Route path="/cliente/ordens/:id" element={
                <ClientRoute>
                  <ClientOrderDetail />
                </ClientRoute>
              } />
              <Route path="/cliente/laudos" element={
                <ClientRoute>
                  <ClientReports />
                </ClientRoute>
              } />
              <Route path="/cliente/arquivos" element={
                <ClientRoute>
                  <ClientFiles />
                </ClientRoute>
              } />
              <Route path="/cliente/pagamentos" element={
                <ClientRoute>
                  <ClientPayments />
                </ClientRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/ordens" element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              } />
              <Route path="/admin/ordens/:id" element={
                <AdminRoute>
                  <AdminOrderDetail />
                </AdminRoute>
              } />
              <Route path="/admin/orcamentos/novo" element={
                <AdminRoute>
                  <AdminCreateBudget />
                </AdminRoute>
              } />
              <Route path="/admin/laudos/novo" element={
                <AdminRoute>
                  <AdminCreateReport />
                </AdminRoute>
              } />
              <Route path="/admin/arquivos/novo" element={
                <AdminRoute>
                  <AdminUploadFile />
                </AdminRoute>
              } />
              <Route path="/admin/usuarios" element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              } />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
