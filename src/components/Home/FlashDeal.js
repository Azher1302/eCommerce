import React, { useState } from 'react';
import { MdLocalOffer } from 'react-icons/md';
import Rating from '../Stars';
import Titles from '../Titles';
import { FaShoppingBag } from 'react-icons/fa';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { ProductsData } from '../../Data/ProductsData';
import './FlashDeal';
import ProductModal from '../Modals/ProductModal';

function FlashDeal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState();
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const Flash = ProductsData.filter((val) => val.flashSale === true);
  const classNames =
    'hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-colo bg-subMain text-white shadow-xl pr-20 ';
  let classNames1='hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-colo bg-subMain text-white shadow-xl pl-22 ';

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartflash')) || [];
    const existingProductIndex = cart.findIndex(item => item._id === product._id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem('cartflash', JSON.stringify(cart));
    setProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />
      <div className="my-12 relative">
        <Titles title="Flash Deals" Icon={MdLocalOffer} />
        <div className="mt-10 relative pl-16 ">
          <Swiper
            slidesPerView={4}
            spaceBetween={40}
            navigation={{ prevEl, nextEl }}
            autoplay={true}
            speed={1000}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Navigation, Autoplay]}
          >
            {Flash.map((f) => (
              <SwiperSlide key={f._id}>
                <div
                  className="p-4 border border-main rounded-lg hover:shadow-lg transitions"
                  onClick={() => {
                    setProduct(f);
                    setModalOpen(true);
                  }}
                >
                  <div className="bg-white cursor-pointer rounded w-full h-72 p-10 relative">
                    <img
                      alt={f.title}
                      src={`/images/${f.image}`}
                      className="w-full hover:scale-105 transitions h-full object-contain"
                    />
                    <div className="absolute top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded-full text-white">
                      {f.discount}% OFF
                    </div>
                  </div>
                  <div className="flex mt-4 flex-col gap-3">
                    <h3 className="font-semibold">{f.title}</h3>
                    <div className="flex gap-2 text-star">
                      <Rating value={3.5} />
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <h2 className="text-lg font-bold">
                        ${f.salePrice}.00{' '}
                        <del className="text-text"> {f.price}.00</del>
                      </h2>
                      <button
                        className="w-8 h-8 text-sm flex-colo transitions hover:bg-subMain rounded-md bg-main text-white"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the modal from opening when the button is clicked
                          addToCart(f);
                        }}
                      >
                        <FaShoppingBag />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full px-1 z-50 absolute top-2/4 justify-between flex">
            <button className={classNames} ref={(node) => setPrevEl(node)}>
              <BsCaretLeftFill />
            </button>
       
          
             <button className={classNames1} ref={(node) => setNextEl(node)}>
              <BsCaretRightFill />
             </button>
           </div>
          
        </div>
      </div>
    </>
  );
}

export default FlashDeal;
