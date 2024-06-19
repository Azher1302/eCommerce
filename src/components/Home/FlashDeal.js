import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdLocalOffer } from 'react-icons/md';
import Rating from '../Stars';
import Titles from '../Titles';
import { FaShoppingBag, FaRupeeSign } from 'react-icons/fa';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ProductModal from '../Modals/ProductModal';
import { NavLink } from 'react-router-dom';

function FlashDeal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [flashProducts, setFlashProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFlashProducts = async () => {
      try {
        const response = await axios.get(
          'https://api.onlineshop.initstore.com/api/Master/Get_All_Items',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlashProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flash products:', error);
        setLoading(false);
      }
    };

    if (token) {
      setTokenAvailable(true);
      fetchFlashProducts();
    } else {
      setLoading(false);
    }
  }, [token]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartflash')) || [];
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem('cartflash', JSON.stringify(cart));
    setProduct(product); // Set the selected product for modal display
    setModalOpen(true); // Open modal after adding to cart
  };

  if (!tokenAvailable) {
    return <p className="text-center text-lg text-gray-500">Please log in to see the flash deals.</p>;
  }

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>;
  }

  if (flashProducts.length === 0) {
    return <p className="text-center text-lg text-gray-500">No flash deals available at the moment.</p>;
  }

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
        addToCart={addToCart}
      />
      <div className="my-12">
        <Titles title="Flash Deals" Icon={MdLocalOffer} />
        <div className="mt-10">
          <Swiper
            slidesPerView={4}
            spaceBetween={40}
            navigation={{ prevEl, nextEl }}
            autoplay={true}
            speed={1000}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
            modules={[Navigation, Autoplay]}
          >
            {flashProducts.map((f) => (
              <SwiperSlide key={f._id}>
                <div className="p-4 border border-main rounded-lg hover:shadow-lg transitions">
                  <NavLink to="/Flashproduct">
                    <div
                      className="bg-deepGray cursor-pointer rounded w-full h-72 p-10 relative"
                    >
                      <img
                        alt={f.title}
                        src={`/images/${f.image}`} // Adjust path to your images
                        className="w-full hover:scale-105 transitions h-full object-contain"
                      />
                      <div className="absolute top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded-full text-white">
                        {/* discound showing */}
                        {/* {f.discount}% OFF */}
                      </div>
                    </div>
                  </NavLink>
                  <div className="flex mt-4 flex-col gap-3">
                    <h3 className="font-semibold">{f.ItemName}</h3>
                    <div className="flex gap-2 text-star">
                      <Rating value={3.5} /> {/* Placeholder for rating component */}
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <h2 className="text-lg font-bold">
                        <FaRupeeSign className="mr-1" />
                        {f.Rate}.00{' '}
                        {/* discound rate showing */}
                        {/* <del className="text-text">
                          <FaRupeeSign className="mr-1" />
                          {f.price}.00
                        </del> */}
                      </h2>
                      <p className="text-sm text-gray-600">{f.ItemDescription}</p>
                      <button
                        className="w-8 h-8 text-sm flex-colo transitions hover:bg-subMain rounded-md bg-main text-white"
                        onClick={() => addToCart(f)} // Call addToCart with the product when clicked
                      >
                        <FaShoppingBag />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="w-full px-1 z-50 absolute top-2/4 justify-between flex">
              <button
                className="hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-colo bg-subMain text-white shadow-xl"
                ref={(node) => setPrevEl(node)}
              >
                <BsCaretLeftFill />
              </button>
              <button
                className="hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-colo bg-subMain text-white shadow-xl"
                ref={(node) => setNextEl(node)}
              >
                <BsCaretRightFill />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default FlashDeal;
