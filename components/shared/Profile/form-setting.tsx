import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { FormInput } from '../form/formInpit/formInput';
import { setting } from '@/app/actions';
import { useRouter } from 'next/navigation';

interface Props {
  resolver: ZodType;
  defaultValue: string;
  type: 'number' | 'name' | 'surname';
  name: string;
  mail: string;
}

export const FormSetting: React.FC<Props> = ({ resolver, defaultValue, type, name, mail }) => {
  const form = useForm({
    resolver: zodResolver(resolver),
    defaultValues: {
      name: defaultValue,
      number: defaultValue,
      surname: defaultValue,
    },
  });
  const router = useRouter();
  const [loadingSubmit, isLoadingSubmit] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      isLoadingSubmit(true);
      await setting({ name: data.number || data.name || data.surname, type, mail }).then(() => {
        router.refresh();
        isLoadingSubmit(false);
      });
    } catch {
      isLoadingSubmit(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          loading={loadingSubmit}
          name={type}
          focus={true}
          label={name}
          defValue={defaultValue}
          className="flex-1"
        />
      </form>
    </FormProvider>
  );
};
