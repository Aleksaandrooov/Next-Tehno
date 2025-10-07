import { Button } from '@/components/ui/button';
import { Modal, ModalContent } from '@nextui-org/modal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  id: number;
  open: boolean;
  text: string;
  isOpen: () => void;
  settingPromise: (id: number) => Promise<Response | undefined>;
}
export const SettingModal: React.FC<Props> = ({ id, open, isOpen, settingPromise, text }) => {
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  const deleteOrderVoid = () => {
    isLoading(true);
    settingPromise(id).then(() => {
      isLoading(false);
      isOpen();
      router.refresh();
    });
  };

  return (
    <Modal size="xs" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
      <ModalContent className="py-6">
        <div className="text-center text-lg mt-2">{text}</div>
        <div className="flex gap-2 justify-center mt-4">
          <Button loading={loading} onClick={() => deleteOrderVoid()} className="w-24">
            Удалить
          </Button>
          <Button onClick={() => isOpen()} variant="outline">
            Назад
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
