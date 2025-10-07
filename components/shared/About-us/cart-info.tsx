'use client';

import { aboutUsArray } from '@/lib/Arrays/aboutUsArray';
import { Link } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export const CartInfo = ({ title, mail, svg }: (typeof aboutUsArray)[0]) => {
  const submitCopy = () => {
    navigator.clipboard.writeText(mail);
    toast.info(title + ' добавлен в буфер обмена', {
      position: 'top-center',
      icon: <Link size={18} />,
    });
  };

  return (
    <div
      onClick={() => submitCopy()}
      className="flex justify-around max-md:justify-between max-md:px-6 items-center border py-6 max-md:py-4 rounded-xl cursor-pointer transition-all hover:shadow-lg">
      <div className="">
        <h1 className="mb-2 font-medium">{title}</h1>
        <span className="text-gray-600">{mail}</span>
      </div>
      <div className="[&_svg]:max-md:size-8 [&_svg]:size-10">{svg}</div>
    </div>
  );
};
