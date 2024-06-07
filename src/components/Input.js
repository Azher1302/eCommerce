import React from 'react';

function Input({ placeHolder, type, label }) {
  return (
    <div className="text-sm">
      <label className="font-semibold text-gray-400">{label}</label>
      <input
        required
        type={type}
        placeholder={placeHolder}
        className="w-full text-sm mt-2 p-4 border border-gray-200 rounded text-gray-500 bg-white"
      />
    </div>
  );
}

export default Input;
