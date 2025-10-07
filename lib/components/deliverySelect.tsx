import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { arrayDelivery } from '../Arrays/arrayDelivery';
import { cn } from '../utils';

interface Props {
  deliverySelect: { name: string; price?: number };
  isDeliverySelect: (t: string, p?: number) => void;
  className?: string;
}

export const DeliverySelect: React.FC<Props> = ({
  deliverySelect,
  isDeliverySelect,
  className,
}) => {
  const [open, isOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    isOpen(false);
  });

  return (
    <div ref={ref} className={cn('relative text-sm flex justify-center', className)}>
      <Button
        onClick={() => isOpen((prev) => !prev)}
        variant="outline"
        className="gap-1"
        type="button"
        size="sm">
        {deliverySelect.name}
        {deliverySelect.price && <span>({deliverySelect.price}₽)</span>}
      </Button>
      {open && (
        <div className="absolute p-1 text-nowrap top-10 bg-white z-20 border rounded-md">
          {arrayDelivery.map((obj, i) => (
            <div
              onClick={() => {
                isDeliverySelect(obj.name, obj.price);
                isOpen(false);
              }}
              className="py-[2px] px-2 hover:bg-accent rounded-sm cursor-pointer"
              key={i}>
              {obj.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
