'use client';
import React, { useState } from 'react';
import { useMedia } from 'react-use';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Props {
  image: {
    id: number;
    img: string[];
  };
}

export const ImageProduct: React.FC<Props> = ({ image }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const mediaQuery = useMedia('only screen and (max-width : 1279px)', false);

  return (
    <div className="w-[700px] h-[400px] max-xl:w-[550px] max-lg:p-0 p-5 lg:sticky top-24 max-lg:w-full mt-20 max-lg:mt-0 mb-10 max-lg:mb-0">
      <div className="flex gap-8 max-xl:flex-col-reverse max-xl:gap-4 max-xl:mx-auto">
        <Swiper
          direction={mediaQuery ? 'horizontal' : 'vertical'}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="mySwiper2 max-h-[400px] w-[90px] max-xl:h-16 max-xl:w-[280px] max-sm:w-[240px]">
          {image?.img.map((obj, i) => (
            <SwiperSlide
              key={i}
              className="xl:border-l transition-all max-xl:border-b border-white hover:border-black xl:pl-3 max-xl:pb-3 cursor-pointer">
              <div className="flex items-center h-full justify-center">
                <img src={obj} className="max-h-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="mySwiper3 w-[600px] h-[420px] max-xl:w-full max-xl:h-[320px]">
          {image?.img.map((obj, i) => (
            <SwiperSlide key={i} className="px-8">
              <div className="flex items-center justify-center h-full">
                <img
                  src={obj}
                  className="max-h-full max-w-[350px] max-md:max-h-[180px] max-sm:max-h-[150px] max-[370px]:max-w-[260px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
