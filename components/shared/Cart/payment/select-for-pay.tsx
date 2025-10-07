import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface Props {
  className?: string;
  value: selectForPayType;
  changeValue: (e: selectForPayType) => void;
}

export type selectForPayType = 'default' | 'legal';

export const selectForPayArray = [
  { name: 'Плачу как частное лицо', value: 'default' },
  { name: 'Плачу как юридическое лицо', value: 'legal' },
];

export const SelectForPay: React.FC<Props> = ({ value, changeValue }) => {
  return (
    <Select onValueChange={changeValue} value={value}>
      <SelectTrigger className="w-min">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {selectForPayArray.map((obj, i) => (
          <SelectItem key={i} value={obj.value}>
            {obj.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
