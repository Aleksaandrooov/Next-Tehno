import React from 'react';
import { FormInput } from '../../form/formInpit/formInput';

export const LegalPay = () => {
  return (
    <div className="mt-8 gap-3 grid grid-cols-3">
      <FormInput name="company" placeholder="Компания" className="max-sm:text-sm" />
      <FormInput name="inn" className="max-sm:text-sm" placeholder="ИНН" />
      <FormInput name="cpp" className="max-sm:text-sm" placeholder="КПП" />
      <FormInput
        name="legalAddress"
        className="col-span-3 max-sm:text-sm"
        placeholder="Юр. Адрес"
      />
    </div>
  );
};
