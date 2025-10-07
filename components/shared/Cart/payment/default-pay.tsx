import React from 'react';
import { FormInput } from '../../form/formInpit/formInput';

interface Props {
  className?: string;
  number: string;
}

export const DefaultPay: React.FC<Props> = ({ number }) => {
  return (
    <div className="flex mt-8 gap-5 max-md:gap-2 max-md:grid-cols-2 max-md:grid">
      <FormInput
        name="number"
        holder="Телефон"
        className="w-[230px] max-md:w-full h-14 text-base"
        defValue={number}
      />
      <FormInput name="name" className="w-[230px] max-md:w-full h-14 text-base" placeholder="Имя" />
      <FormInput
        name="email"
        className="w-[240px] h-14 text-base max-md:w-full col-span-2"
        placeholder="E-mail"
      />
    </div>
  );
};
