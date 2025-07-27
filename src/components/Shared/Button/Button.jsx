import { motion } from 'framer-motion';

const Button = ({ 
  label, 
  onClick, 
  disabled = false, 
  outline = false, 
  small = false, 
  icon: Icon,
  fullWidth = true,
  type = 'button',
  isLoading = false
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        transition-all
        duration-300
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${outline ? 'bg-transparent' : 'bg-gradient-to-r from-[#9d00ff] to-[#00f5ff]'}
        ${outline ? 'border border-[#9d00ff]' : 'border-0'}
        ${outline ? 'text-[#00f5ff] hover:text-white' : 'text-white'}
        ${small ? 'text-sm px-4 py-2' : 'text-md px-6 py-3'}
        ${small ? 'font-medium' : 'font-semibold'}
        ${!outline && 'hover:shadow-lg hover:shadow-[#9d00ff]/30'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        flex items-center justify-center gap-2
      `}
    >
      {isLoading ? (
        <svg 
          className="animate-spin h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {Icon && (
            <Icon
              size={small ? 18 : 20}
              className={`
                ${label ? 'mr-2' : ''}
              `}
            />
          )}
          {label}
        </>
      )}
    </motion.button>
  );
};

export default Button;