import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Введите коректную почту' })
    .max(30, { message: 'Не более 30 символов' }),
})

export const SettingName = z.object({
  name: z
    .string()
    .min(2, { message: 'Имя должно содержать больше 2 букв' })
    .max(30, { message: 'Не более 30 символов' }),
})

export const SettingSurname = z.object({
  surname: z
    .string()
    .min(2, { message: 'Фамилия должно содержать больше 2 букв' })
    .max(30, { message: 'Не более 30 символов' }),
})

export const SettingNumber = z.object({
  number: z.string().length(10, { message: 'Введите коректный номер телефона' }),
})

export const delivery = z.object({
  address: z
    .string()
    .min(5, { message: 'Укажите коректный адрес' })
    .max(100, { message: 'Не более 100 символов' }),
  entrance: z.string().min(1, { message: 'Заполните' }).max(5, { message: 'Не более 5 символов' }),
  floor: z.string().min(1, { message: 'Заполните' }).max(5, { message: 'Не более 5 символов' }),
  flat: z.string().min(1, { message: 'Заполните' }).max(5, { message: 'Не более 5 символов' }),
  comment: z.string().max(200, { message: 'Максимально допустимо 200 символов' }).optional(),
})

export const review = z.object({
  comment: z.string().max(200, { message: 'Максимально допустимо 200 символов' }).optional(),
})

export const paymentMain = z.object({
  email: z
    .string()
    .email({ message: 'Введите коректную почту' })
    .max(30, { message: 'Не более 30 символов' }),
  name: z
    .string()
    .min(2, { message: 'Имя должно содержать больше 2 букв' })
    .max(30, { message: 'Не более 30 символов' }),
  number: z.string().length(10, { message: 'Введите коректный номер телефона' }),
})

export const paymentMainLegal = z.object({
  company: z.string().min(2, { message: 'Заполните' }).max(30, { message: 'Не более 50 символов' }),
  inn: z.string().min(2, { message: 'Заполните' }).max(30, { message: 'Не более 10 символов' }),
  cpp: z.string().min(2, { message: 'Заполните' }).max(30, { message: 'Не более 10 символов' }),
  legalAddress: z
    .string()
    .min(2, { message: 'Заполните' })
    .max(30, { message: 'Не более 100 символов' }),
})

export const addProduct = z.object({
  title: z.string().min(1, { message: 'Укажите название' }),
  price: z.string().min(1, { message: 'Укажите цену' }),
  img: z.string().min(1, { message: 'Укажите изображение' }),
  rating: z.string().min(1, { message: 'Укажите рейтинг' }),
  quantity: z.string().min(1, { message: 'Укажите количество' }),
  description: z.string().optional(),
  category: z.string(),
  model: z.string().optional(),
  capacity: z.string().optional(),
  diagonal: z.string().optional(),
  memory: z.string().optional(),
  power: z.string().optional(),
  brand: z.string().optional(),
  voltage: z.string().optional(),
  color: z.string().optional(),
  connector: z.string().optional(),
})

export const addCategory = z.object({
  name: z.string().min(1, { message: 'Укажите название' }),
  price: z.string().min(1, { message: 'Укажите цену' }),
  img: z.string().min(1, { message: 'Укажите картинку' }),
  bgImg: z.string().optional(),
})

export type TFormLoginValues = z.infer<typeof LoginSchema>
export type TFormName = z.infer<typeof SettingName>
export type TFormSurname = z.infer<typeof SettingSurname>
export type TFormNumber = z.infer<typeof SettingNumber>
export type TFormDelivery = z.infer<typeof delivery>
export type TFormReview = z.infer<typeof review>
export type TFormPaymentMain = z.infer<typeof paymentMain>
export type TFormPaymentMainLegal = z.infer<typeof paymentMainLegal>
export type TFormAddProduct = z.infer<typeof addProduct>
export type TFormAddCategory = z.infer<typeof addCategory>
