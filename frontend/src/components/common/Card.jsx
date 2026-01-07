import React from 'react';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  padding = 'default',
  shadow = 'default',
  bordered = false,
  className = '',
  onClick,
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-2xl transition-all duration-300';

  // Variant classes
  const variantClasses = {
    default: 'bg-white',
    primary: 'bg-gradient-to-br from-primary-50 to-white border-l-4 border-primary-600',
    gradient: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20',
    dark: 'bg-gray-900 text-white'
  };

  // Hover classes
  const hoverClasses = hover 
    ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' 
    : '';

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };

  // Border class
  const borderClass = bordered ? 'border-2 border-gray-100' : '';

  // Combined classes
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${hoverClasses}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${borderClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

// Card Header
Card.Header = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title
Card.Title = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Description
Card.Description = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-gray-600 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

// Card Image
Card.Image = ({ src, alt, className = '', objectFit = 'cover', ...props }) => {
  return (
    <div className={`mb-4 overflow-hidden rounded-xl ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-110`}
        {...props}
      />
    </div>
  );
};

// Card Badge
Card.Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const badgeVariants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeVariants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Card Footer
Card.Footer = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Actions
Card.Actions = ({ children, align = 'left', className = '', ...props }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`flex items-center space-x-3 mt-4 ${alignClasses[align]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Icon
Card.Icon = ({ children, variant = 'primary', className = '', ...props }) => {
  const iconVariants = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    info: 'bg-blue-100 text-blue-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${iconVariants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;