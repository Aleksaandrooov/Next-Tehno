'use client';

import { useFormContext } from 'react-hook-form';
import { RequiredSymbol } from './required-symbol';
import { Input } from '@/components/ui/input';
import { ClearButton } from './clearButton';
import { ErrorText } from './errorText';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  focus?: boolean;
  defValue?: string | number;
  loading?: boolean;
  holder?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  disabled,
  required,
  loading,
  focus,
  holder,
  defValue,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  useEffect(() => {
    if (name == 'number') {
      setValue(name, defValue);
    }
  }, []);

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-1 ml-1 text-sm">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        {name !== 'number' ? (
          <Input
            className={cn('h-10 border text-md focus:bg-white', focus ? 'pr-10' : '')}
            {...register(name)}
            {...props}
          />
        ) : (
          <PatternFormat
            placeholder={holder}
            format="+7 (###) ### ## ##"
            className="h-10 border text-md shadow-sm focus: rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full px-3 placeholder:text-gray-500"
            defaultValue={defValue}
            {...register(name)}
            onValueChange={(values) => {
              const { value } = values;
              console.log(value);
              setValue(name, value);
            }}
          />
        )}

        {!focus && value && !disabled && name !== 'number' && (
          <ClearButton onClick={onClickClear} />
        )}
        {focus && value !== defValue && (
          <Button
            loading={loading}
            variant="ghost"
            className="px-[10px] z-20 h-10 absolute right-0 top-1/2 -translate-y-1/2">
            <Check size={18} />
          </Button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-1 h-2" />}
    </div>
  );
};
