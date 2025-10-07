'use client';

import React from 'react';
import { descriptionType } from '../product-type';
import { Progress } from '@nextui-org/progress';
import { BadgeCheck, StarOff } from 'lucide-react';
import { words } from '@/lib/word-cals';
import { Container } from '../../container';
import { reviewGrade } from '@/lib/reviewGrade';
import { ReviewModal } from '../../Modal/review-modal';
import { ReviewStar } from '@/lib/components/review-star';

export const Reviews = ({ variant, title, item, email, id }: descriptionType) => {
  const { countReviews, reviewsGrade, itemsReviews } = reviewGrade(item);

  const emailForReviews = item && item.filter((obj) => obj.user.email == email).length;

  return (
    <div className="mt-6 shadow-lg p-6 max-lg:mt-2 rounded-xl border max-sm:p-4">
      <header className="mb-6 text-2xl max-sm:text-lg max-sm:mb-4">{variant}</header>
      <Container className="flex gap-10 max-lg:flex-col max-lg:gap-2 max-lg:px-2 max-sm:px-0">
        <div className="w-[320px] lg:sticky h-full top-32 gap-10 max-lg:w-[500px] max-sm:gap-3 max-lg:flex max-sm:w-full">
          <header className="flex mb-4 gap-3">
            <h1
              className={
                item?.length
                  ? 'text-5xl max-lg:text-3xl'
                  : 'text-2xl flex gap-3 items-center text-gray-500'
              }>
              {item?.length ? reviewsGrade : 'Нету отзывов'}
              {!item?.length && <StarOff />}
            </h1>
            {item?.length ? (
              <div className="">
                <ReviewStar grade={reviewsGrade!} className="max-lg:size-5" />
                <span>
                  {countReviews} {words(countReviews!, ['отзыв', 'отзыва', 'отзывов'])}
                </span>
              </div>
            ) : (
              <></>
            )}
          </header>
          {item?.length ? (
            <div className="flex flex-col gap-1 max-lg:w-full">
              {itemsReviews
                ?.sort((a, b) => b.grade - a.grade)
                .map((obj, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <h1>{obj.grade}</h1>
                    <Progress
                      key={i}
                      aria-label="Loading..."
                      size="sm"
                      value={(obj.count / countReviews!) * 100}
                      color="warning"
                    />
                  </div>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-1">
          <ReviewModal
            title={title!}
            email={email!}
            productId={id!}
            reviewBooleon={emailForReviews ? false : true}
          />
          <div className="flex flex-col gap-3">
            {item?.map((obj) => (
              <div className="border rounded-md p-3 shadow-md" key={obj.id}>
                <div className="flex justify-between">
                  <div className="">
                    <div className="flex gap-2 items-start">
                      <h1 className="text-lg max-w-[150px] text-ellipsis overflow-hidden">
                        {obj.user.Name || 'Аноним'}
                      </h1>
                      <div className="px-2 max-sm:hidden shadow-md rounded-lg border text-sm text-green-600 font-semibold flex gap-1 items-center py-[2px]">
                        <BadgeCheck className="fill-green-600 text-white" />
                        Реальный покупатель
                      </div>
                    </div>
                    <div className="flex gap-2 items-center mt-3">
                      <span className="text-gray-500">Оценка:</span>
                      <ReviewStar grade={obj.grade} className="size-4" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-end">
                    <span className="">
                      {obj.createdAt.getDate() < 10 ? 0 : ''}
                      {obj.createdAt.getDate()}.{obj.createdAt.getMonth() + 1 < 10 ? 0 : ''}
                      {obj.createdAt.getMonth() + 1}.{obj.createdAt.getFullYear()}
                    </span>
                    {obj.user.email == email ? (
                      <ReviewModal
                        title={title!}
                        email={email!}
                        id={obj.id}
                        productId={id!}
                        grade={obj.grade}
                        comment={obj.comment}
                        reviewBooleon={true}
                        className="h-8 text-sm mt-3"
                      />
                    ) : (
                      <h1>tehno-rost.ru</h1>
                    )}
                  </div>
                </div>
                {obj.comment && (
                  <div className="mt-2 pt-2 border-t">
                    <h1 className="font-bold mb-2">Комментарий</h1>
                    <span className="comment">{obj.comment}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
