import { TFormAddProduct } from '@/components/shared/form/shemas';
import { UseFormReturn } from 'react-hook-form';

export const ProductsFormReset = (form: UseFormReturn<TFormAddProduct>) => {
  form.reset({
    title: '',
    price: '',
    img: '',
    rating: '',
    quantity: '',
    description: '',
    model: '',
    memory: '',
    capacity: '',
    diagonal: '',
    power: '',
    brand: '',
    voltage: '',
    color: '',
    connector: '',
  });
};
