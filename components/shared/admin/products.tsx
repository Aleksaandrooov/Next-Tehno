'use client';

import React, { useState } from 'react';
import { filterType } from './fetch-filter';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../form/formInpit/formInput';
import { addProduct, TFormAddProduct } from '../form/shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/text-area';
import { SelectProducts } from '@/lib/select-products';
import { createProduct, deleteProduct } from '@/app/admin';
import { useRouter } from 'next/navigation';
import { productType } from '../Product/product-type';
import { setReset } from '@/lib/setReset';
import { ProductsFormReset } from '@/lib/products-form-reset';
import { ProductsSetting } from './products-setting';

interface Props {
  products: productType[];
  filter: filterType[];
}

export const Products: React.FC<Props> = ({ products, filter }) => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const form = useForm<TFormAddProduct>({
    resolver: zodResolver(addProduct),
    defaultValues: {
      title: '',
      price: '',
      img: '',
      rating: '',
      quantity: '',
      description: '',
      category: String(
        filter.find((obj) => obj.name === 'category')?.filter.find((obj) => obj.name)?.id,
      ),
    },
  });

  const onSubmit = async (data: TFormAddProduct) => {
    setValue('');
    await createProduct(data, value);
    ProductsFormReset(form);
    router.refresh();
  };

  const settingProduct = (e: string) => {
    if (e === 'none') {
      setValue('');
      ProductsFormReset(form);
    } else {
      setValue(e);
      const product = products.find((obj) => obj.id === Number(e));
      form.reset(setReset(product));
    }
    router.refresh();
  };
  const removeProduct = () => {
    deleteProduct(value);
    setValue('');
    ProductsFormReset(form);
    router.refresh();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between max-lg:flex-col max-lg:gap-3">
        <span className="text-gray-500">Всего товаров: {products.length}</span>
        <ProductsSetting
          products={products}
          value={value}
          settingProduct={(value) => settingProduct(value)}
        />
      </div>
      <div className="mt-5">
        <FormProvider {...form}>
          <form className="gap-4 flex flex-col mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="title" label="Название" />
            <FormInput name="price" label="Цена" />
            <FormInput name="img" label="Изображение" />
            <FormInput name="rating" label="Популярность" />
            <FormInput name="quantity" label="Количество" />
            <div className="">
              <h1 className="font-medium mb-1 ml-1">Описание</h1>
              <Textarea name="description" />
            </div>
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
              {filter.map((obj, i) => (
                <SelectProducts form={form} items={obj.filter} name={obj.name} key={i} />
              ))}
            </div>
            <div className="flex gap-2">
              <Button className="w-min">{!value ? 'Добавить товар' : 'Изменить товар'}</Button>
              {value ? (
                <Button type="button" onClick={() => removeProduct()} variant="outline">
                  Удалить товар
                </Button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
