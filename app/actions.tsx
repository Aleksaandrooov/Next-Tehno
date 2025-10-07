'use server'

import { CreateOrder } from '@/components/shared/email-templates/create-order'
import { OrderForCompany } from '@/components/shared/email-templates/order-for-company'
import { sendEmail } from '@/components/shared/email-templates/sentEmail'
import { Verificed } from '@/components/shared/email-templates/verificed'
import {
  TFormDelivery,
  TFormPaymentMain,
  TFormPaymentMainLegal,
} from '@/components/shared/form/shemas'
import { CartItemType } from '@/components/zustand/dto/getCart'
import { prisma } from '@/prisma/prisma-client'
import { render } from '@react-email/components'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function verificedPost(email: string) {
  const code = Math.random().toString().substring(2, 8)
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (findUser) {
    const fetchCode = await prisma.verificationCode.findFirst({
      where: {
        userId: findUser.id,
      },
    })

    if (fetchCode) {
      await prisma.verificationCode.delete({
        where: {
          userId: findUser.id,
        },
      })
    }

    await prisma.verificationCode.create({
      data: {
        userId: findUser.id,
        code,
      },
    })
  } else {
    try {
      await prisma.user.create({
        data: {
          email,
        },
      })

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      const cookie = await cookies()
      const token = cookie.get('cartToken')?.value
      const tokenFavorites = crypto.randomUUID()

      await prisma.favorites.create({
        data: {
          token: tokenFavorites,
          userId: user!.id,
        },
      })

      if (token) {
        const cart = await prisma.cart.findFirst({
          where: {
            token,
          },
        })

        await prisma.cart.update({
          where: {
            id: cart?.id,
          },
          data: {
            userId: user!.id,
          },
        })

        cookie.delete('cartToken')
      } else {
        const tokenNew = crypto.randomUUID()

        await prisma.cart.create({
          data: {
            token: tokenNew,
            userId: user!.id,
          },
        })
      }

      await prisma.verificationCode.create({
        data: {
          userId: user!.id,
          code,
        },
      })
    } catch (error) {
      console.log('Error [UPDATE_USER', error)
      throw error
    }
  }

  const emailHtml = await render(<Verificed email={email} code={code} />)

  await sendEmail({
    title: 'Код подтверждения | Техно-Рост',
    html: emailHtml,
    sendTo: email,
  })
}

export async function setting({
  name,
  type,
  mail,
}: {
  name: string
  type: 'number' | 'name' | 'surname'
  mail: string
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: mail,
      },
    })

    if (!user) {
      return NextResponse.error()
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        Name: type == 'name' ? name : undefined,
        Surname: type == 'surname' ? name : undefined,
        number: type == 'number' ? name : undefined,
      },
    })
  } catch (error) {
    console.log('Error [SETTING_USER', error)
    throw error
  }
}

export async function deleteProfile(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      NextResponse.error()
      return null
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId: user?.id,
      },
    })
    const favorites = await prisma.favorites.findFirst({
      where: {
        userId: user?.id,
      },
    })

    if (!cart || !favorites) {
      NextResponse.error()
      return null
    }

    await prisma.verificationCode.delete({
      where: {
        userId: user.id,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart?.id,
      },
    })
    await prisma.favoritesItem.deleteMany({
      where: {
        favoritesId: favorites?.id,
      },
    })

    await prisma.order.deleteMany({
      where: {
        userId: user?.id,
      },
    })

    await prisma.reviewsItem.deleteMany({
      where: {
        userId: user.id,
      },
    })

    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    })
    await prisma.favorites.delete({
      where: {
        id: favorites.id,
      },
    })

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    })
  } catch (error) {
    console.log('Error [DELETE_USER', error)
    throw error
  }
}

export async function addDelivery(
  email: string,
  data: {
    address?: string
    entrance?: string
    floor?: string
    flat?: string
  },
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      NextResponse.error()
      return null
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        address: data.address,
        entrance: Number(data.entrance),
        floor: Number(data.floor),
        flat: Number(data.flat),
      },
    })
  } catch (error) {
    console.log('Error [ADD_DELIVERY', error)
    throw error
  }
}

export async function removeDelivery(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      NextResponse.error()
      return null
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        address: '',
        entrance: null,
        floor: null,
        flat: null,
      },
    })
  } catch (error) {
    console.log('Error [REMOVE_DELIVERY', error)
    throw error
  }
}

export async function addReview(email: string, comment: string, grade: number, productId: number) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      NextResponse.error()
      return null
    }

    const review = await prisma.reviewsItem.findFirst({
      where: {
        userId: user.id,
        productItemId: productId,
      },
    })

    if (review) {
      await prisma.reviewsItem.update({
        where: {
          id: review.id,
        },
        data: {
          comment,
          grade,
        },
      })
    } else {
      await prisma.reviewsItem.create({
        data: {
          userId: user.id,
          productItemId: productId,
          comment,
          grade,
        },
      })
    }
  } catch (error) {
    console.log('Error [ADD_REVIEW', error)
    throw error
  }
}

export async function deleteReview(id: number) {
  try {
    const review = await prisma.reviewsItem.findFirst({
      where: {
        id: id,
      },
    })

    if (!review) {
      return NextResponse.error()
    }

    await prisma.reviewsItem.delete({
      where: {
        id: review.id,
      },
    })
  } catch (error) {
    console.log('Error [DELETE_REVIEW', error)
    throw error
  }
}

export async function createOrder(
  user: TFormPaymentMain | TFormPaymentMainLegal,
  email: string,
  totalAmount: number,
  items: CartItemType['items'][],
  type: string,
  price?: number,
  delivery?: TFormDelivery,
) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!findUser) {
      return NextResponse.error()
    }

    await Promise.all(
      items.map(async (obj) => {
        const product = await prisma.product.findFirst({
          where: {
            id: obj.productItemId,
          },
        })
        if (product!.quantity! < obj.quantity) {
          throw new Error()
        }
        return obj
      }),
    )

    const token = crypto.randomUUID()

    await prisma.order.create({
      data: {
        userId: findUser.id,
        number: 'number' in user ? user.number : undefined,
        email: 'email' in user ? user.email : undefined,
        fullName: 'name' in user ? user.name : undefined,

        company: 'company' in user ? user.company : undefined,
        inn: 'inn' in user ? user.inn : undefined,
        cpp: 'cpp' in user ? user.cpp : undefined,
        legalAddress: 'legalAddress' in user ? user.legalAddress : undefined,

        type,
        price,

        items,
        token,
        totalAmount,
        status: 'pending',

        address: delivery ? delivery?.address : undefined,
        entrance: delivery ? Number(delivery?.entrance) : undefined,
        floor: delivery ? Number(delivery?.floor) : undefined,
        flat: delivery ? Number(delivery?.flat) : undefined,
        Comment: delivery ? delivery?.comment : undefined,
      },
    })

    const emailHtml = await render(
      <CreateOrder items={items} token={token} totalAmount={totalAmount} />,
    )
    const emailCompany = await render(
      <OrderForCompany
        items={items}
        token={token}
        number={'number' in user ? user.number : ''}
        delivery={delivery}
      />,
    )

    await sendEmail({
      title: 'Заказ | Техно-Рост',
      html: emailHtml,
      sendTo: 'email' in user ? user.email : email,
    })
    await sendEmail({
      title: 'Новый заказ | Техно-Рост',
      html: emailCompany,
      sendTo: 'info@tehno-rost.ru',
    })

    items.map(async (obj) => {
      await prisma.product.update({
        where: {
          id: obj.productItem.id,
        },
        data: {
          quantity: {
            decrement: obj.quantity,
          },
        },
      })
    })
  } catch (error) {
    console.log('Error [CREATE_ORDER', error)
    throw error
  }
}

export async function deleteOrder(id: number) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
    })

    if (!order) {
      return NextResponse.error()
    }

    await prisma.order.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    console.log('Error [DELETE_ORDER', error)
    throw error
  }
}
