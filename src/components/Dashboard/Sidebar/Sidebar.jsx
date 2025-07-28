import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { 
  FiLogOut, 
  FiUser, 
  FiHome, 
  FiPlusSquare, 
  FiShoppingBag, 
  FiCheckSquare, 
  FiFlag, 
  FiBarChart2, 
  FiUsers, 
  FiTag 
} from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo-flat1.png';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logOut } = useAuth();

  const customerMenu = [
    { name: 'My Profile', icon: <FiUser />, path: '/dashboard/profile' },
    { name: 'Add Product', icon: <FiPlusSquare />, path: '/dashboard/add-product' },
    { name: 'My Products', icon: <FiShoppingBag />, path: '/dashboard/my-products' },
  ];

  const moderatorMenu = [
    { name: 'Product Review Queue', icon: <FiCheckSquare />, path: '/dashboard/review-queue' },
    { name: 'Reported Contents', icon: <FiFlag />, path: '/dashboard/reported-contents' },
  ];

  const adminMenu = [
    { name: 'Statistics', icon: <FiBarChart2 />, path: '/dashboard/statistics' },
    { name: 'Manage Users', icon: <FiUsers />, path: '/dashboard/manage-users' },
    { name: 'Manage Coupons', icon: <FiTag />, path: '/dashboard/coupons' },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-[#1a1a2e] border-r border-[#9d00ff]/30 z-30 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center py-6 px-4 border-b border-[#9d00ff]/30">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src={logo} alt="CodeCanvas" className="h-25" />
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center px-4 py-4 border-b border-[#9d00ff]/30">
          <img
            className="h-10 w-10 rounded-full border-2 border-[#00f5ff]"
            src={user?.photoURL || avatarImg}
            alt="Profile"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-[#00f5ff]">{user?.displayName || 'User'}</p>
            <p className="text-xs text-[#b8b8b8]">{user?.email || ''}</p>
          </div>
        </div>
        
          <div className="px-2">
          <NavLink
                    to='/'
                    className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#9d00ff]/20 text-[#00f5ff]'
                        : 'text-[#b8b8b8] hover:bg-[#9d00ff]/10 hover:text-[#00f5ff]'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3 text-lg"><FiHome /></span>
                    Home
        </NavLink>
          </div>
        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2">
            <h3 className="px-4 text-xs font-semibold text-[#00f5ff] uppercase tracking-wider mb-2">
              User Menu
            </h3>
            <ul className="space-y-1 mb-6">
              {customerMenu.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#9d00ff]/20 text-[#00f5ff]'
                        : 'text-[#b8b8b8] hover:bg-[#9d00ff]/10 hover:text-[#00f5ff]'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <h3 className="px-4 text-xs font-semibold text-[#00f5ff] uppercase tracking-wider mb-2">
              Moderator Menu
            </h3>
            <ul className="space-y-1 mb-6">
              {moderatorMenu.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#9d00ff]/20 text-[#00f5ff]'
                        : 'text-[#b8b8b8] hover:bg-[#9d00ff]/10 hover:text-[#00f5ff]'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <h3 className="px-4 text-xs font-semibold text-[#00f5ff] uppercase tracking-wider mb-2">
              Admin Menu
            </h3>
            <ul className="space-y-1">
              {adminMenu.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#9d00ff]/20 text-[#00f5ff]'
                        : 'text-[#b8b8b8] hover:bg-[#9d00ff]/10 hover:text-[#00f5ff]'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-[#9d00ff]/30">
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-[#b8b8b8] hover:text-[#ff3864] hover:bg-[#9d00ff]/10 rounded-md transition-colors"
          >
            <FiLogOut className="mr-3 text-lg" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;