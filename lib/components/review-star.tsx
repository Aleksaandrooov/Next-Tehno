import { Star, StarHalf } from 'lucide-react';
import React from 'react';
import { cn } from '../utils';

interface Props {
  grade: number;
  className?: string;
}

export const ReviewStar: React.FC<Props> = ({ grade, className }) => {
  return (
    <div className="flex gap-[2px]">
      {[...Array(Math.ceil(grade!))].map((_, i) => (
        <div
          className={i + 0.9 < grade ? '' : i + 0.4 < grade ? 'w-3 overflow-hidden' : ''}
          key={i}>
          {i + 0.4 < grade ? (
            <Star className={cn('', className)} fill="orange" color="orange" strokeWidth={1.5} />
          ) : (
            <StarHalf className={cn('', className)} color="orange" strokeWidth={1.5} />
          )}
        </div>
      ))}
    </div>
  );
};
