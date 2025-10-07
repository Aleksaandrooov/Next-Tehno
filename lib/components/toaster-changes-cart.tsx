import { toast } from 'sonner';

interface addCartType {
  id?: number;
  ids?: Set<number>;
  isLoading?: (type: boolean) => void;
  clearCartItem?: () => void;
  settingCart?: (id: number) => Promise<void>;
  removeAllCart?: (id: Set<number>) => Promise<void>;
  successText: string;
  loadingText: string;
}

export const cartSettingChanges = async ({
  id,
  removeAllCart,
  ids,
  isLoading,
  clearCartItem,
  settingCart,
  loadingText,
  successText,
}: addCartType) => {
  isLoading?.(true);
  const promise = !removeAllCart ? settingCart!(id!) : removeAllCart(ids!);

  if (loadingText) {
    toast.promise(promise, {
      loading: `${loadingText}...`,
      success: () => {
        clearCartItem?.();
        isLoading?.(false);
        return successText;
      },
      error: 'Ошибка...',
      duration: 1500,
    });
  } else {
    try {
      promise.then(() => {
        clearCartItem?.();
        isLoading?.(false);
      });
    } catch {
      toast.error('Ошибка...');
    }
  }
};
