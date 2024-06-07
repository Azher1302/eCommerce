
import React from 'react';
import Titles from '../Titles';
import { Link } from 'react-router-dom';
import { CategoriesHome } from '../../Data/CategoriesHome';
import { BsGridFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

function Categories() {
  return (
    <div className="sm:my-12 my-8">
      <Titles title="Categories" Icon={BsGridFill} />
      <div className="sm:mt-10 mt-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={4000}
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
          {CategoriesHome.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="px-4 py-6 rounded border border-text">
                <h3 className="font-semibold mb-3">{s.title}</h3>
                <div className="grid w-full grid-cols-4 gap-2 2xl:gap-4">
                  {s.images.map((e, index) => (
                    <div
                      key={index}
                      className="bg-deepGray cate rounded relative overflow-hidden p-2 h-16 2xl:h-32 xl:h-28"
                    >
                      <img
                        alt={e.name}
                        src={`/images/${e.img}`}
                        className="w-full h-full object-contain"
                      />
                      <Link
                        to={`/category/${e.name}`}
                        className="cateSub 2xl:p-0 p-2 flex-colo absolute left-0 right-0 w-full h-full bg-main"
                      >
                        <h3 className="font-bold truncate 2xl:text-sm text-xs text-white">
                          {e.name}
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
