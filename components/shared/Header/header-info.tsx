import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container';

interface Props {
  className?: string;
}

export const HeaderInfo: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('text-white bg-neutral-700 max-lg:hidden', className)}>
      <Container className="flex justify-between items-center">
        <span className="cursor-pointer">Москва и область</span>
        <span className="text-sm cursor-pointer">+7 (916) 283 49-43</span>
      </Container>
    </div>
  );
};
