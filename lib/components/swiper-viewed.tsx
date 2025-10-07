'use client';

import { Api } from '@/app/services/apiClient';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SearchProduct } from '@/components/shared/Search/search-product';
import { ProductType } from '@/app/services/dto/searchItemsType';
import 'swiper/css/navigation';
import 'swiper/css';

export const SwiperViewed = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    try {
      const item = localStorage?.getItem('viewedProducts') || '';
      async function fetchProductsLocal() {
        const data = await Api.viewed.viewedProducts(item);
        setProducts(data);
      }
      fetchProductsLocal();
    } catch {}
  }, []);

  return (
    <>
      {products.length > 0 && (
        <div className="">
          <h1 className="text-2xl font-medium text-start mb-10 max-md:text-lg max-sm:text-base max-md:mb-0">
            Недавно просмотренные
          </h1>
          <Swiper
            navigation={true}
            breakpoints={{
              1000: {
                slidesPerView: 6,
              },
              850: {
                slidesPerView: 5,
              },
              700: {
                slidesPerView: 4,
              },
              450: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 2,
              },
            }}
            modules={[Navigation]}
            className="mySwiper3 mySwiper1 max-md:mt-2">
            {products.map((obj) => (
              <SwiperSlide key={obj.id}>
                <SearchProduct className="w-full" product={obj} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
