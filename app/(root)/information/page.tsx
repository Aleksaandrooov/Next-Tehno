'use client';

import { Container } from '@/components/shared/container';
import { Delivery } from '@/components/shared/Information/delivery';
import { Offert } from '@/components/shared/Information/offert';
import { Politicy } from '@/components/shared/Information/politicy';
import { Position } from '@/components/shared/Information/position';
import { Breadcrump } from '@/lib/components/breadcrumb';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Information() {
  const params = useSearchParams();
  const type = params.get('type');
  const offer = useRef<HTMLElement | null>(null);
  const payment = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (offer.current && payment.current)
      window.scrollTo({
        top:
          type === 'offer'
            ? offer.current?.offsetTop - 120
            : type === 'payment'
              ? payment.current?.offsetTop - 120
              : undefined,
        behavior: 'smooth',
      });
  }, [params]);

  return (
    <Container className="my-10 max-sm:px-2 flex flex-col gap-5 [&_li]:mb-2 [&_h3]:mb-2 [&_h3]:text-lg max-sm:[&_h3]:text-base [&_h4]:ml-5 max-sm:[&_h4]:text-sm [&_h4]:mb-2">
      <Breadcrump search="Информация" />
      <section className="[&_ul]:ml-10">
        <h2 className="text-xl text-center mb-2 max-sm:text-lg">
          Политика обработки персональных данных
        </h2>
        <Politicy />
      </section>
      <section ref={offer} className="[&_ul]:ml-10">
        <h2 className="text-xl text-center mb-2 max-sm:text-lg">Договор публичной оферты</h2>
        <Offert />
        <Position />
      </section>
      <section ref={payment} className="[&_ul]:ml-10">
        <h2 className="text-xl text-center mb-2 max-sm:text-lg">Оплата и доставка</h2>
        <Delivery />
      </section>
    </Container>
  );
}
