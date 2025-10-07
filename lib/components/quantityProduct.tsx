import React from 'react';

interface Props {
  count: number;
}

export const QuantityProduct: React.FC<Props> = ({ count }) => {
  return (
    <>
      {count ? (
        <div className="rounded-md border shadow-sm w-max px-2 py-1 flex gap-1 items-center text-xs font-semibold">
          <span>В наличии</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
