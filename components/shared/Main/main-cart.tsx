import { NotepadText, PackageOpen, Truck, User } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const MainCart: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex justify-center gap-3 max-sm:gap-1 max-xl:grid grid-cols-2 max-xl:px-4">
        <div className="xl:w-[300px] h-[250px] max-md:h-[180px] max-[500px]:h-[120px] border rounded-xl flex flex-col items-center justify-center max-md:gap-1 gap-5 cursor-pointer transition-all hover:bg-primary/10">
          <Truck className="size-14 max-md:size-10 max-sm:size-8" strokeWidth={1} />
          <div className="text-center h-[60px] max-md:h-auto px-3 max-md:px-1">
            <h1 className="text-xl max-sm:text-sm">Быстрая доставка</h1>
            <small className="text-gray-500 max-md:text-xs max-[500px]:hidden">
              По Москве за 3 часа
            </small>
          </div>
        </div>
        <div className="xl:w-[300px] h-[250px] max-md:h-[180px] border max-[500px]:h-[120px] rounded-xl flex flex-col items-center justify-center max-md:gap-1 gap-5 cursor-pointer transition-all hover:bg-primary/10">
          <PackageOpen className="size-14 max-md:size-10 max-sm:size-8" strokeWidth={1} />
          <div className="text-center h-[60px] max-md:h-auto px-3 max-md:px-1">
            <h1 className="text-xl max-sm:text-sm">Самовывоз в день заказа</h1>
            <small className="text-gray-500 max-md:text-xs max-[500px]:hidden">
              Не надо ждать, приезжайте и забирайте заказ прямо сейчас
            </small>
          </div>
        </div>
        <div className="xl:w-[300px] h-[250px] max-md:h-[180px] border max-[500px]:h-[120px] rounded-xl flex flex-col items-center justify-center max-md:gap-1 gap-5 cursor-pointer transition-all hover:bg-primary/10">
          <NotepadText className="size-14 max-md:size-10 max-sm:size-8" strokeWidth={1} />
          <div className="text-center h-[60px] max-md:h-auto px-3 max-md:px-1">
            <h1 className="text-xl max-sm:text-sm">14 дней на возврат</h1>
            <small className="text-gray-500 max-md:text-xs max-[500px]:hidden">
              Вернем деньги если не устроило качество или не подошел товар
            </small>
          </div>
        </div>
        <div className="xl:w-[300px] h-[250px] max-md:h-[180px] border max-[500px]:h-[120px] rounded-xl flex flex-col items-center justify-center max-md:gap-1 gap-5 cursor-pointer transition-all hover:bg-primary/10">
          <User className="size-14 max-md:size-10 max-sm:size-8" strokeWidth={1} />
          <div className="text-center h-[60px] max-md:h-auto px-3 max-md:px-1">
            <h1 className="text-xl max-sm:text-sm">Для юридических лиц</h1>
            <small className="text-gray-500 max-md:text-xs max-[500px]:hidden">
              Оплата по счету без комиссий и наценок
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
