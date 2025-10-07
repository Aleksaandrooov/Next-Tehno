import { filterType, nameType } from '@/components/shared/admin/fetch-filter';
import { TFormAddProduct } from '@/components/shared/form/shemas';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  name: nameType;
  items: filterType['filter'];
  form: UseFormReturn<TFormAddProduct>;
}

export const SelectProducts: React.FC<Props> = ({ name, form, items }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={name} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {name !== 'category' && <SelectItem value="none">Пусто</SelectItem>}
              {items.map((obj) => (
                <SelectItem key={obj.id} value={String(obj.id)}>
                  {obj.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
