import React, { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import ProductModal from './Modals/ProductModal';

function Products({ product, bg }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />
      <div
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
        className="cursor-pointer rounded border border-main p-4 bg-white hover:shadow-lg transitions"
      >
        {bg ? (
          <div className="bg-deepGray cursor-pointer rounded w-full h-52 p-10 relative">
            <img
              alt={product?.image}
              src={`/images/${product?.image}`}
              className="w-full hover:scale-105 transitions h-full object-contain"
            />
            {product.flashSale && (
              <div className="absolute z-10 top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded-full text-white">
                {product.discount}% OFF
              </div>
            )}
          </div>
        ) : (
          <img
            alt={product?.title}
            src={`images/${product?.image}`}
            className="w-full h-40 object-contain"
          />
        )}

        <h3 className="font-semibold my-2">{product?.title}</h3>
        <div className="flex justify-between items-center gap-2">
          {product.flashSale ? (
            <h2 className="text-lg font-black">
              ${product.salePrice}{' '}
              <del className="text-text font-medium"> {product.price}</del>
            </h2>
          ) : (
            <h2 className="text-lg font-black">${product?.price}</h2>
          )}
          <button className="w-8 h-8 text-sm flex-colo transitions hover:bg-subMain rounded-md bg-main text-white">
            <FaShoppingBag />
          </button>
        </div>
      </div>
    </>
  );
}

export default Products;
