import { useForm } from 'react-hook-form';
import {
  delivery,
  paymentMain,
  paymentMainLegal,
  TFormDelivery,
  TFormPaymentMain,
  TFormPaymentMainLegal,
} from '../../form/shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { User } from '@prisma/client';
import { selectForPayType } from './select-for-pay';

export const PaymentState = ({ email, Name, address, entrance, floor, flat }: User) => {
  const [value, isValue] = useState<selectForPayType>('default');
  const [deliverySelect, isDeliverySelect] = useState<{ name: string; price?: number }>({
    name: 'Доставка в пределах МКАД',
    price: 390,
  });
  const [inChange, setInChange] = useState<'delivery' | 'shop'>('shop');
  const [open, isOpen] = useState(false);
  const [loading, isLoading] = useState(false);

  const [deliveryState, setDeliveryState] = useState<TFormDelivery>({
    address: '',
    entrance: '',
    floor: '',
    flat: '',
    comment: '',
  });

  const form = useForm<TFormPaymentMain | TFormPaymentMainLegal>({
    resolver: zodResolver(value === 'default' ? paymentMain : paymentMainLegal),
    defaultValues: {
      email: email,
      name: Name || '',
    },
  });

  const formDelivery = useForm<TFormDelivery>({
    resolver: zodResolver(delivery),
    defaultValues: {
      address: address || '',
      entrance: entrance ? String(entrance) : '',
      floor: floor ? String(floor) : '',
      flat: flat ? String(flat) : '',
      comment: '',
    },
  });

  return {
    form,
    formDelivery,
    isLoading,
    loading,
    open,
    isOpen,
    inChange,
    setInChange,
    deliveryState,
    setDeliveryState,
    value,
    isValue,
    isDeliverySelect,
    deliverySelect,
  };
};
