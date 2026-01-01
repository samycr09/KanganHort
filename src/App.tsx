import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from '././components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlantBioFormPage } from './pages/PlantBioFormPage';
import { PlantBioDisplayPage } from './pages/PlantBioDisplayPage';
import { PlantsGalleryPage } from './pages/PlantsGalleryPage';
import { SeasonPage } from './pages/SeasonPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { LogsPage } from './pages/LogsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/plants" element={<PlantsGalleryPage />} />
            <Route path="/seasons" element={<SeasonPage />} />
            <Route path="/plant/:id" element={<PlantBioDisplayPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin only routes */}
            <Route 
              path="/register" 
              element={
                <AdminRoute>
                  <RegisterPage />
                </AdminRoute>
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/plant-bio/new" 
              element={
                <ProtectedRoute>
                  <PlantBioFormPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/plant-bio/edit/:id" 
              element={
                <ProtectedRoute>
                  <PlantBioFormPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logs" 
              element={
                <ProtectedRoute>
                  <LogsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;