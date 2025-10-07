import React, { useState } from 'react';
import { LoginSchema, TFormLoginValues } from '../form/shemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../form/formInpit/formInput';
import { Button } from '@/components/ui/button';
import { verificedPost } from '@/app/actions';
import { Mail } from 'lucide-react';

interface Props {
  isSubmit: (text: string) => void;
}

export const LoginForm: React.FC<Props> = ({ isSubmit }) => {
  const [loading, isLoading] = useState(false);
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      isLoading(true);
      verificedPost(data.email).then(() => {
        isSubmit(data.email);
        isLoading(false);
      });
    } catch {}
  };

  return (
    <div className="py-2">
      <FormProvider {...form}>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Введите почту..."
            className="text-sm touch-none"
            name="email"
            label="Почта"
          />
          <Button
            loading={loading}
            variant="outline"
            className="mt-2 h-9 bg-neutral-100 flex gap-1">
            <Mail size={18} strokeWidth={1.5} /> Получить код
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
