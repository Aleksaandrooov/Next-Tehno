import { cn } from '@nextui-org/theme';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from '../shared/form/formInpit/errorText';
import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, name, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const errorText = errors[name!]?.message as string;

    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...register(name!)}
          {...props}
          ref={ref}
        />
        <div className="absolute"></div>
        {errorText && <ErrorText text={errorText} className="mt-1 h-4" />}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
