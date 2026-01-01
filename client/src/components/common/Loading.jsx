import React from 'react';

const Loading = ({
  variant = 'spinner',
  size = 'md',
  fullScreen = false,
  text = '',
  color = 'primary',
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary-600 border-primary-600',
    white: 'text-white border-white',
    gray: 'text-gray-600 border-gray-600',
    success: 'text-green-600 border-green-600',
    warning: 'text-yellow-600 border-yellow-600',
    danger: 'text-red-600 border-red-600'
  };

  // Spinner Component
  const Spinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-t-4 border-b-4 border-solid ${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[color].split(' ')[0]}`}>
          {text}
        </p>
      )}
    </div>
  );

  // Dots Component
  const Dots = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-current ${sizeClasses[size]} ${colorClasses[color]} animate-pulse`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[color].split(' ')[0]}`}>
          {text}
        </p>
      )}
    </div>
  );

  // Pulse Component
  const Pulse = () => (
    <div className="flex flex-col items-center justify-center">
      <div className={`rounded-full bg-current ${sizeClasses[size]} ${colorClasses[color]} animate-pulse`} />
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[color].split(' ')[0]}`}>
          {text}
        </p>
      )}
    </div>
  );

  // Bars Component
  const Bars = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end space-x-1 h-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 bg-current ${colorClasses[color]} rounded-t animate-pulse`}
            style={{
              height: '100%',
              animationDelay: `${i * 0.1}s`,
              transform: `scaleY(${0.4 + Math.random() * 0.6})`
            }}
          />
        ))}
      </div>
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[color].split(' ')[0]}`}>
          {text}
        </p>
      )}
    </div>
  );

  // Ring Component
  const Ring = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className={`animate-spin rounded-full border-4 border-solid border-gray-200 ${sizeClasses[size]}`} />
        <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-solid border-transparent border-t-current ${sizeClasses[size]} ${colorClasses[color]}`} />
      </div>
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[color].split(' ')[0]}`}>
          {text}
        </p>
      )}
    </div>
  );

  // Skeleton Component
  const Skeleton = () => (
    <div className="space-y-3 w-full max-w-md">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
      {text && (
        <p className="text-center mt-4 font-medium text-gray-600">
          {text}
        </p>
      )}
    </div>
  );

  // Render variant
  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'bars':
        return <Bars />;
      case 'ring':
        return <Ring />;
      case 'skeleton':
        return <Skeleton />;
      case 'spinner':
      default:
        return <Spinner />;
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50" {...props}>
        {renderLoading()}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8" {...props}>
      {renderLoading()}
    </div>
  );
};

// Inline Loading
Loading.Inline = ({ size = 'sm', color = 'primary', className = '' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-solid border-transparent border-t-current ${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
  );
};

// Button Loading
Loading.Button = ({ text = 'Chargement...', className = '' }) => {
  return (
    <span className={`flex items-center justify-center ${className}`}>
      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text}
    </span>
  );
};

// Page Loading
Loading.Page = ({ text = 'Page Loading ...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-700">{text}</p>
        <div className="mt-4 flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Overlay Loading
Loading.Overlay = ({ text = 'Loading ...', opacity = 'light' }) => {
  const opacityClasses = {
    light: 'bg-white/70',
    medium: 'bg-white/85',
    dark: 'bg-white/95'
  };

  return (
    <div className={`absolute inset-0 ${opacityClasses[opacity]} backdrop-blur-sm flex items-center justify-center z-10`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600 mx-auto mb-3" />
        <p className="text-lg font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Loading;