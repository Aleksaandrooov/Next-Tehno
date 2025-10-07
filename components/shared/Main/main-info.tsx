import React from 'react';
import { Container } from '../container';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const MainInfo: React.FC<Props> = ({ className }) => {
  return (
    <Container className={cn('max-sm:px-2', className)}>
      <h1 className="text-2xl ml-24 max-md:text-xl max-lg:ml-0">Почему выбирают именно нас?</h1>
      <div className="grid grid-cols-4 grid-rows-3 max-xl:grid-rows-2 max-md:grid-rows-3 gap-5 max-sm:gap-2 mt-8 max-md:mt-6">
        <div className="bg-yellow-300 max-xl:col-span-1 gap-5 max-xl:row-span-2 max-md:row-span-1 max-md:col-span-2 justify-center rounded-xl col-span-2 flex flex-col items-center text-white py-7 shadow-lg">
          <img
            className="max-w-[130px] max-xl:max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/7340/7340754.png"
          />
          <h1 className="text-lg text-primary max-md:text-sm max-sm:text-xs text-center">
            Высокий стандарт качества
          </h1>
        </div>
        <div className="bg-gray-200 rounded-xl max-xl:row-span-1 max-md:col-span-2 row-span-2 flex flex-col items-center text-white py-7 shadow-lg justify-center gap-5">
          <img
            className="max-w-[180px] max-xl:max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/5013/5013548.png"
          />
          <h1 className="text-lg text-center max-md:text-sm max-sm:text-xs text-primary">
            Выполняем всё в срок
          </h1>
        </div>
        <div className=" bg-blue-800 rounded-xl flex flex-col max-md:col-span-2 items-center text-white py-7 justify-center gap-2 shadow-lg">
          <img
            className="max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/2649/2649223.png"
          />
          <h1 className="text-lg text-center max-md:text-sm max-sm:text-xs">
            Можно заказть прямо на сайте
          </h1>
        </div>
        <div className=" bg-green-600 rounded-xl flex flex-col max-md:col-span-2 items-center text-white py-7 justify-center gap-2 shadow-lg">
          <img
            className="max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/8163/8163551.png"
          />
          <h1 className="text-lg text-center max-md:text-sm max-sm:text-xs">10 лет опыта</h1>
        </div>
        <div className="max-xl:hidden"></div>
        <div className="bg-yellow-700 rounded-xl flex flex-col max-md:col-span-2 max-xl:row-span-1 row-span-2 items-center text-white py-7 justify-center gap-2 shadow-lg">
          <img
            className="max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/3757/3757891.png"
          />
          <h1 className="text-lg text-center max-md:text-sm max-sm:text-xs">Доставка по России</h1>
        </div>
        <div className="max-xl:hidden"></div>
        <div className="bg-red-700 rounded-xl flex flex-col col-span-2 items-center text-white py-7 justify-center gap-2 shadow-lg">
          <img
            className="max-h-[100px] max-md:max-h-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/16894/16894352.png"
          />
          <h1 className="text-lg text-center max-md:text-sm max-sm:text-xs">Профессионализм</h1>
        </div>
      </div>
    </Container>
  );
};
