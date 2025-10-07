import React from 'react';
import { descriptionType } from '../product-type';

export const Description = ({ text, title, variant }: descriptionType) => {
  return (
    <div className="mt-6 shadow-lg p-6 max-lg:mt-0 rounded-xl border">
      <header className="text-2xl mb-6 max-sm:text-lg max-sm:mb-2">{variant}</header>
      <h1 className="text-lg max-sm:hidden font-medium mb-5 text-center pb-5 border-b max-lg:text-base">
        {title}
      </h1>
      <h3 className="leading-8 px-10 indent-12 max-sm:text-sm max-sm:indent-0 max-lg:indent-2 max-lg:px-2">
        {text}
      </h3>
    </div>
  );
};
