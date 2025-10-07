import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import React, { useEffect, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useTimeout } from '@custom-react-hooks/use-timeout';
import { verificedPost } from '@/app/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
  className?: string;
  mail: string;
  onClose: () => void;
  onClear: () => void;
  url?: string;
  router: AppRouterInstance;
}

export const VerificedForm: React.FC<Props> = ({ mail, onClose, onClear, url, router }) => {
  const [number, isNumber] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const [blocked, isBlocked] = useState(false);
  const { isActive, reset } = useTimeout(() => isActive, 120000);
  const onSubmit = async () => {
    isBlocked(true);
    const data = {
      email: mail,
      code: number,
    };
    const resp = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (!resp?.ok) {
      isBlocked(false);
      toast.error('Неверный код, попробуйте ещё раз');
    } else {
      isBlocked(false);
      onClose();
      onClear();
      toast.success('Вы успешно авторизованы');
      if (url) {
        router.push(url);
      }
    }
  };

  const onBack = () => {
    onClear();
  };

  useEffect(() => {
    reset();
    ref.current?.focus();
  }, []);

  return (
    <div className="mx-6 overflow-hidden my-3">
      <Button onClick={() => onBack()} className="flex items-center px-3 gap-1 cursor-pointer">
        <ChevronLeft size={16} /> Назад
      </Button>
      <div className="mt-4">
        <header className="text-xl mb-2 font-medium">Подтверждение почты</header>
        <span className="text-sm text-gray-500">
          Код был отправлен на: <span className="underline">{mail}</span>
        </span>
      </div>
      <div className="mt-5">
        <div className="flex flex-col gap-3">
          <InputOTP
            ref={ref}
            disabled={blocked}
            onComplete={onSubmit}
            value={number}
            onChange={(e) => isNumber(e)}
            pattern={REGEXP_ONLY_DIGITS}
            maxLength={6}
            className="">
            <InputOTPGroup className="mx-auto">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot className="size-[45px]" key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            disabled={isActive}
            onClick={() => {
              verificedPost(mail);
              reset();
            }}
            variant="ghost"
            className="text-sm cursor-pointer mx-10">
            Отправить код повторно
          </Button>
        </div>
      </div>
    </div>
  );
};
