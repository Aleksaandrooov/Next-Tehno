import React from 'react';
import { Tailwind } from '@react-email/components';

interface Props {
  className?: string;
  code: string;
  email: string;
}

export function Verificed({ code, email }: Props): React.ReactElement {
  return (
    <Tailwind>
      <div className="mb-2 py-3 bg-gray-200 px-4 text-black rounded-md">
        Ваш код: <span>{code}</span>
      </div>
      <div className="text-center">Введите эти цифры на экране входа или регистрации</div>
      <div className="my-2 pb-2">
        <h2>Важно!</h2>
        <div>
          В целях безопасности никому не пересылайте это письмо и не сообщайте код подтверждения.
        </div>
      </div>
      <p>
        <a
          className="text-center"
          href={`http://localhost:3000?verified&email=${email}&code=${code}`}>
          Подтвердить почту по ссылке
        </a>
      </p>
      <div className="mt-2"></div>
    </Tailwind>
  );
}
