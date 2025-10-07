'use client';

import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { advertisement } from '@/lib/Arrays/advertisement';
import { Info } from 'lucide-react';

interface Props {
  className?: string;
}

export const PosterAdvertisement: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Swiper
        speed={1000}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper1">
        {advertisement.map((obj, i) => (
          <SwiperSlide key={i} className="overflow-hidden max-md:pt-5 max-sm:pt-10">
            <div className="">
              <Link href={obj.url} className="flex justify-center items-center">
                <div className="max-md:absolute left-2 top-2">
                  <h1 className="text-xl max-md:text-lg max-md:px-2 text-nowrap max-sm:text-base">
                    {obj.title}
                  </h1>
                  <Button
                    variant="outline"
                    className="text-base px-4 mt-2 flex gap-1 max-sm:shadow-md max-sm:bg-white max-md:text-sm max-md:h-8 max-md:px-3 max-md:mt-1">
                    <Info size={18} /> Подробнее
                  </Button>
                </div>
                <img
                  className="h-[500px] max-xl:h-[400px] max-lg:h-[300px] max-[900px]:h-[250px] max-[550px]:h-[200px]"
                  src={obj.img}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
