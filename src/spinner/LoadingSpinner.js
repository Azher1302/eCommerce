import React from 'react';
import './spinner.css';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-t-blue-500 rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
