import { NavLink } from 'react-router';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-[#9d00ff]/20 text-[#00f5ff]'
            : 'text-[#b8b8b8] hover:bg-[#9d00ff]/10 hover:text-[#00f5ff]'
        }`
      }
    >
      <span className="mr-3 text-lg">{Icon}</span>
      {label}
    </NavLink>
  );
};

export default MenuItem;