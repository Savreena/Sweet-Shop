import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Candy, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
  ];

  if (isAdmin) {
    navLinks.splice(1, 0, { name: 'Admin', path: '/admin' });
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Candy className="h-8 w-8 text-orange-600" />
              <span className="font-bold text-xl text-gray-800 tracking-tight">SweetShop</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="text-gray-600 flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-600">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-2 px-3">
              {user ? (
                <>
                   <div className="px-3 py-2 text-gray-600 font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
