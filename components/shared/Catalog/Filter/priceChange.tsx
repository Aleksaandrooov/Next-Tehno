import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/ui/slider';
import { Minus } from 'lucide-react';
import React from 'react';
import { priceProps } from './filterChange/type-filter';

interface Props {
  className?: string;
  changePrice: ({}: priceProps) => void;
  price: priceProps;
}

enum priceLimitation {
  min = 90,
  max = 429990,
}

export const PriceChange: React.FC<Props> = ({ changePrice, price }) => {
  const updatePrice = (name: keyof priceProps, value: number) => {
    changePrice({
      ...price,
      [name]: value,
    });
  };

  return (
    <div className="m-1">
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder="90"
          className="text-sm"
          min={priceLimitation.min}
          max={priceLimitation.max}
          onChange={(event) => updatePrice('priceForm', Number(event.target.value))}
          value={price.priceForm || 90}
        />
        <Minus />
        <Input
          type="number"
          placeholder="429990"
          className="text-sm"
          min={priceLimitation.min}
          max={priceLimitation.max}
          onChange={(event) => updatePrice('priceTo', Number(event.target.value))}
          value={price.priceTo || 429990}
        />
      </div>
      <div className="mx-2 mt-6">
        <RangeSlider
          step={10}
          min={priceLimitation.min}
          max={priceLimitation.max}
          value={[price.priceForm || priceLimitation.min, price.priceTo || priceLimitation.max]}
          onValueChange={([priceForm, priceTo]) => changePrice({ priceForm, priceTo })}
        />
      </div>
    </div>
  );
};
