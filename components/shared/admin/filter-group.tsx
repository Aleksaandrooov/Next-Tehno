import React from 'react';
import { AddFilter } from '../Modal/admin-filter';
import { filterType } from './fetch-filter';

interface Props {
  obj: filterType;
}

export const FilterGroup: React.FC<Props> = ({ obj }) => {
  return (
    <div className="flex gap-5">
      <div className="text-sm text-nowrap">
        <div className="rounded-sm border px-3 mb-2 text-center">
          {obj.name} {obj.filter.length}
        </div>
        <AddFilter name={obj.name} />
      </div>
      <div className="flex flex-wrap">
        {obj.filter.map((obj) => (
          <div className="" key={obj.id}>
            {obj.name},
          </div>
        ))}
      </div>
    </div>
  );
};
