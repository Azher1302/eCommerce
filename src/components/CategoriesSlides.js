import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CategoriesData } from '../Data/CategoriesData';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation]);

function CategoriesSlides() {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const buttonClassNames =
    'hover:bg-subMain transition hover:text-white rounded-full text-xs w-8 h-8 flex items-center justify-center bg-main text-white shadow-xl';

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4">Explore Categories</h2>
      <div className="relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={{ prevEl, nextEl }}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 7,
            },
          }}
        >
          {CategoriesData.map((category) => (
            <SwiperSlide key={category._id} className="hover:scale-90 transition">
              <Link
                to={`/category/${category.title}`}
                className="p-2 bg-deepGray rounded-md flex flex-col items-center font-bold text-m gap-2"
              >
                <div className="p-2 shadow-md w-32 h-32 rounded-full bg-white flex items-center justify-center">
                  <img
                    alt={category.title}
                    src={`/images/${category.icon}`}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <p className="text-center">{category.title}</p>
              </Link>
            </SwiperSlide>
          ))}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button className={buttonClassNames} ref={(node) => setPrevEl(node)}>
              <BsCaretLeftFill />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className={buttonClassNames} ref={(node) => setNextEl(node)}>
              <BsCaretRightFill />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default CategoriesSlides;
