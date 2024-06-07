import React from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';

const CartIcon = ({ itemCount, onClick }) => {
  return (
    <div className="relative" onClick={onClick}>
      <span className="text-xl mr-2 mb-1 cursor-pointer">
        <IoBagCheckOutline />
      </span>
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
