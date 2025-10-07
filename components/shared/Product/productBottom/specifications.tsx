import React from 'react';
import { descriptionType } from '../product-type';

export const Specifications = ({ variant, obj }: descriptionType) => {
  return (
    <div className="mt-6 shadow-lg px-6 py-8 rounded-xl border max-lg:mt-0">
      <header className="text-2xl mb-6 max-sm:text-lg max-sm:mb-4">{variant}</header>
      <div className="flex flex-col gap-4">
        {obj
          ?.filter((obj) => obj.obj)
          .map((obj, i) => (
            <div
              key={i}
              className="flex justify-between mx-12 max-sm:text-sm max-sm:mx-2 border-t pt-4 first:border-t-0">
              <h1>{obj.name}</h1>
              <span>{obj.obj?.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
