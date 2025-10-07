import { Button } from '@/components/ui/button'
import { Pencil, Star, StarHalf, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Modal, ModalContent } from '@nextui-org/modal'
import { cn } from '@/lib/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { review, TFormReview } from '../form/shemas'
import { Textarea } from '@/components/ui/text-area'
import { addReview, deleteReview } from '@/app/actions'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  email: string
  productId: number
  reviewBooleon: boolean
  className?: string
  comment?: string | null
  grade?: number
  id?: number
}

export const ReviewModal: React.FC<Props> = ({
  title,
  email,
  productId,
  reviewBooleon,
  className,
  grade,
  comment,
  id,
}) => {
  const [open, isOpen] = useState(false)
  const [reviewNumber, isReviewNumber] = useState(grade || 5)
  const router = useRouter()
  const [loading, isLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(review),
    defaultValues: {
      comment: comment || '',
    },
  })

  const onSubmit = async (data: TFormReview) => {
    isLoading(true)
    await addReview(email, data.comment || '', reviewNumber, productId).then(() => isOpen(false))
    router.refresh()
    isLoading(false)
  }

  const deleteSubmit = async () => {
    isLoading(true)
    await deleteReview(id!).then(() => isOpen(false))
    router.refresh()
    isLoading(false)
  }

  return (
    <>
      {email && reviewBooleon && (
        <div className={!grade ? 'mb-4' : 'mb-0'}>
          <Button
            onClick={() => isOpen((prev) => !prev)}
            className={cn('flex gap-1 ml-auto max-sm:px-2', className)}
            variant="outline"
          >
            <span className={grade ? 'max-sm:hidden' : ''}>
              {!grade ? 'Написать отзыв к товару' : 'Редактировать'}
            </span>{' '}
            {!grade ? <StarHalf size={18} /> : <Pencil size={18} />}
          </Button>
          <Modal placement="center" isOpen={open} size="3xl" backdrop="blur" onOpenChange={isOpen}>
            <ModalContent>
              <div className="m-6">
                <header className="mb-4">
                  <h1 className="text-xl">{!grade ? 'Написать отзыв' : 'Редактировать отзыв'}</h1>
                  <span className="text-sm">К товару: {title}</span>
                </header>
                <div className="">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-1 rounded-lg shadow-md w-max p-2 px-3 border">
                      {[...Array(Math.ceil(5))].map((_, i) => (
                        <Star
                          size={24}
                          onClick={() => isReviewNumber(i + 1)}
                          strokeWidth={1.5}
                          className={cn(
                            'transition-all',
                            reviewNumber > i
                              ? 'fill-orange-400 text-orange-400'
                              : 'text-gray-400 fill-gray-400',
                          )}
                          key={i}
                        />
                      ))}
                    </div>
                    <h1 className="text-lg font-semibold">{reviewNumber}</h1>
                  </div>
                  <FormProvider {...form}>
                    <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}>
                      <h1 className="font-medium mb-1">Комментарий</h1>
                      <Textarea name="comment" className="text-base" />
                      <div className="flex gap-2 items-center mt-3">
                        <Button
                          disabled={loading}
                          className={!grade ? 'flex gap-2 w-[160px]' : 'w-[120px]'}
                        >
                          <Pencil size={18} /> {!grade ? 'Оставить отзыв' : 'Изменить'}
                        </Button>
                        {grade && (
                          <Button
                            disabled={loading}
                            variant="outline"
                            type="button"
                            onClick={() => deleteSubmit()}
                            className="flex gap-2 w-[110px]"
                          >
                            <Trash2 size={18} />
                            Удалить
                          </Button>
                        )}
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  )
}
