import { useState } from 'react';
import { Link } from 'react-router';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo-flat.png';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed w-full bg-[#0a0a12] z-50 border-b border-[#9d00ff]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="CodeCanvas" 
                className="h-14 w-auto hover:opacity-80 transition-opacity"
              />
              <span className="ml-1 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]">
                CodeCanvas
              </span>
            </Link>
          </div>

          {/* Right side - Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link 
                to="/products" 
                className="text-[#b8b8b8] hover:text-[#00f5ff] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/dashboard" 
                className="text-[#b8b8b8] hover:text-[#00f5ff] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              
              {user ? (
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      className="h-8 w-8 rounded-full border-2 border-[#9d00ff]"
                      src={user?.photoURL || avatarImg}
                      alt="Profile"
                    />
                    <span className="text-[#00f5ff] text-sm">{user?.displayName || 'User'}</span>
                  </button>

                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1a1a2e] ring-1 ring-[#9d00ff] focus:outline-none">
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-[#b8b8b8] hover:text-[#00f5ff] hover:bg-[#0a0a12]"
                          onClick={() => setIsOpen(false)}
                        >
                          <RiDashboardLine className="mr-2" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logOut();
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-[#b8b8b8] hover:text-[#ff3864] hover:bg-[#0a0a12]"
                        >
                          <FiLogOut className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] hover:opacity-90 transition-opacity"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium rounded-md text-[#00f5ff] border border-[#00f5ff] hover:bg-[#00f5ff]/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#b8b8b8] hover:text-[#00f5ff] focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-[#9d00ff]/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#b8b8b8] hover:text-[#00f5ff] hover:bg-[#0a0a12]"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#b8b8b8] hover:text-[#00f5ff] hover:bg-[#0a0a12]"
                  onClick={() => setIsOpen(false)}
                >
                  <RiDashboardLine className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-[#b8b8b8] hover:text-[#ff3864] hover:bg-[#0a0a12]"
                >
                  <FiLogOut className="mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-[#9d00ff]/30">
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 text-center rounded-md text-white bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] hover:opacity-90"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full px-4 py-2 text-center rounded-md text-[#00f5ff] border border-[#00f5ff] hover:bg-[#00f5ff]/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;