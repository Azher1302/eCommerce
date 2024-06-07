import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { CategoriesData } from '../Data/CategoriesData';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function CategoriesSlides() {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const classNames =
    'hover:bg-subMain transitions hover:text-white rounded text-xs w-8 h-8 flex-colo bg-main text-white shadow-xl';

  return (
    <div className="sm:mt-10 mt-5">
      <Swiper
        slidesPerView={11}
        spaceBetween={7}
        navigation={{ prevEl, nextEl }}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
          350: {
            slidesPerView: 3,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 6,
          },
          1280: {
            slidesPerView: 11,
            spaceBetween: 7,
          },
        }}
      >
        {CategoriesData.map((f) => (
          <SwiperSlide key={f._id} className="hover:scale-90 transitions">
            <Link
              to={`/category/${f.title}`}
              className="p-2 bg-deepGray rounded-md flex-colo font-bold text-m gap-10"
            >
              <div className="p-2 shadow-md w-50 h-20 rounded-full bg-white">
                <img
                  alt={f.title}
                  src={`/images/${f.icon}`}
                  className="w-100 h-50"
                />
              </div>
              <p>{f.title}</p>
            </Link>
          </SwiperSlide>
        ))}
        <div className="w-full z-50 absolute top-1/4 justify-between flex">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default CategoriesSlides;
