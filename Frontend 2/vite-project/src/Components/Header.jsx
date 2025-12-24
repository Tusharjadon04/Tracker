// Header.jsx
import { Leaf } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({
  isLoggedIn = false,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-emerald-900/90 backdrop-blur-md border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-50" />
          </div>
          <span className="font-semibold text-emerald-50 tracking-tight">
            EcoTrack
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-100/80">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>Home</NavLink>
          <NavLink to="/tracker" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>Tracker</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>Services</NavLink>
          <NavLink to="/faq" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>FAQ</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-emerald-50')}>Contact</NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={onLoginClick}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold border border-emerald-300 text-emerald-50 hover:bg-emerald-800 transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-300 text-emerald-950 hover:bg-emerald-200 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onLogoutClick}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
