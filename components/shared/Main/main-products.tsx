'use client';

import React from 'react';
import { Container } from '../container';
import { cn } from '@/lib/utils';
import { SwiperViewed } from '@/lib/components/swiper-viewed';

interface Props {
  className?: string;
}

export const MainProducts: React.FC<Props> = ({ className }) => {
  return (
    <Container className={cn('mt-10 max-sm:px-2', className)}>
      <SwiperViewed />
    </Container>
  );
};
