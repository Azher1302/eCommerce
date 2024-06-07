import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Banners } from '../../Data/BannerData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'swiper/swiper-bundle.min.css';
import './Banner.css';

function Banner() {
  return (
    <div className="bg-deepGray rounded-md overflow-hidden">
      <div className="relative w-full">
        <Swiper
          direction={'vertical'}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay]}
          speed={1000}
          loop={true}
          className="w-full xl:h-96 lg:h-64 h-48"
        >
          {Banners.map((b, i) => (
            <SwiperSlide key={i} className="relative">
              <img
                alt="banner"
                src={b.image}
                className="w-full h-full object-cover rounded-md"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
                className="absolute inset-0 flex flex-col justify-center items-start lg:pl-32 pl-10 py-12 text-black space-y-4"
              >
                <h1 className="xl:text-5xl lg:text-4xl sm:text-3xl text-2xl font-bold font-poppins">
                  {b.text}
                </h1>
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-main to-subMain hover:from-subMain hover:to-main transition duration-300 ease-in-out lg:py-3 py-2 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
                >
                  SHOP NOW
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
