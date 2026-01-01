import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, User, Home, Info, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/seasons', label: 'Indigenous Seasons', icon: Calendar },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  const protectedLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/logs', label: 'Logs' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-green-700 relative">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1707009538768-2542134437bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFzcyUyMGZsb3dlcnMlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2NTI0OTEyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <img 
                src="https://www.kangan.edu.au/content/experience-fragments/bendigokangan/kangan/en/header/master/_jcr_content/root/header_copy_copy/logo.coreimg.png/1712189728044/ki-tv-logos-colour-370.png"
                alt="Kangan"
                className="h-12 object-contain"
              />
            </Link>
            <div className="hidden lg:block border-l-2 border-gray-300 pl-6">
              <img 
                src="https://melbflowershow.com.au/wp-content/uploads/2024/09/logo-footer.png" 
                alt="Melbourne International Flower And Garden Show"
                className="h-10 object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation - Positioned to the right with Home centered */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end mr-8">
            {publicLinks.map(link => {
              const Icon = link.icon;
              // Add custom spacing for each item
              let customMargin = '';
              if (link.path === '/') customMargin = 'ml-5';
              if (link.path === '/seasons') customMargin = 'ml-4';
              if (link.path === '/about') customMargin = 'ml-3';
              if (link.path === '/contact') customMargin = 'ml-2';
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all ${customMargin} ${
                    isActive(link.path)
                      ? 'bg-green-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user && protectedLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - User section */}
          <div className="hidden md:flex items-center flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-700 hover:bg-green-800 text-white transition-colors shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {publicLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-green-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}

              {user && protectedLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-green-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="pt-3 border-t border-gray-200 mt-2">
                  <div className="px-4 py-2 text-gray-900">{user.name}</div>
                  <div className="px-4 pb-2 text-xs text-gray-500 capitalize">{user.role}</div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}