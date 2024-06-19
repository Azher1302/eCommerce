import React from 'react';
import Titles from '../Titles';
import { Link } from 'react-router-dom';
import { CategoriesHome } from '../../Data/CategoriesHome';
import { BsGridFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './categories.css';

function Categories() {
  return (
    <div className="container mx-auto my-8 sm:my-12">
      <Titles title="Categories" Icon={BsGridFill} />
      <div className="mt-5 sm:mt-10">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              autoplay: false,
            },
          }}
          modules={[Autoplay]}
        >
          {CategoriesHome.map((category, i) => (
            <SwiperSlide key={i}>
              <div className="px-4 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="mb-3 text-lg font-semibold text-white">{category.title}</h3>
                <div className="grid grid-cols-4 gap-2 xl:gap-4">
                  {category.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative p-2 overflow-hidden bg-white rounded-lg h-16 xl:h-28 2xl:h-32 transition-transform duration-300 shadow-md image-container"
                    >
                      <img
                        alt={image.name}
                        src={`/images/${image.img}`}
                        className="object-contain w-full h-full transition-transform duration-500 image-content"
                      />
                      <Link
                        to={`/category/${image.name}`}
                        className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-black transition-opacity duration-300 opacity-0 hover:opacity-100"
                      >
                        <h3 className="text-xs font-bold text-white truncate xl:text-sm 2xl:text-base">
                          {image.name}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Categories;
