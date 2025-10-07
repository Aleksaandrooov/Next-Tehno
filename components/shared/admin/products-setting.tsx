import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { productType } from '../Product/product-type';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  products: productType[];
  settingProduct: (value: string) => void;
  value: string;
}

export const ProductsSetting: React.FC<Props> = ({ products, settingProduct, value }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="overflow-hidden justify-between">
          {value ? products.find((obj) => String(obj.id) === value)?.title : 'Изменить товар'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Поиск товаров..." className="h-9" />
          <CommandList>
            <CommandEmpty>Такого товара нет</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={(currentValue) => {
                  settingProduct(currentValue);
                  setOpen(false);
                }}>
                Сбросить
              </CommandItem>
              {products.map((obj) => (
                <CommandItem
                  key={obj.id}
                  value={obj.title}
                  onSelect={() => {
                    settingProduct(String(obj.id) === value ? 'none' : String(obj.id));
                    setOpen(false);
                  }}>
                  {obj.title}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === String(obj.id) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
