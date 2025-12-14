import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
