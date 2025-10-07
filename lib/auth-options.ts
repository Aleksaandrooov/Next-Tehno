import { UserRole } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import yandex from 'next-auth/providers/yandex'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { prisma } from '@/prisma/prisma-client'

export const authOptions: AuthOptions = {
  providers: [
    yandex({
      clientId: process.env.YANDEX_CLIENT_ID || '',
      clientSecret: process.env.YANDEX_CLIENT_SECRET || '',

      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.emails?.[0],
          role: 'USER' as UserRole,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentails',
      credentials: {
        email: { label: 'Email', type: 'text' },
        code: { label: 'Code', type: 'text' },
      },
      async authorize(credentials) {
        const cookie = await cookies()
        const token = cookie.get('cartToken')?.value

        if (!credentials) {
          return null
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        })

        if (!findUser) {
          return null
        }

        const findCode = await prisma.verificationCode.findFirst({
          where: {
            userId: findUser.id,
            code: credentials.code,
          },
        })

        if (!findCode) {
          return null
        }

        if (token) {
          const cart = await prisma.cart.findFirst({
            where: {
              token,
              userId: undefined,
            },
          })

          if (cart?.id) {
            await prisma.cartItem.deleteMany({
              where: {
                cartId: cart.id,
              },
            })

            await prisma.cart.delete({
              where: {
                id: cart.id,
              },
            })
          }
          cookie.delete('cartToken')
        }

        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            verified: new Date(),
          },
        })

        await prisma.verificationCode.delete({
          where: {
            id: findCode.id,
          },
        })

        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.Name,
          role: findUser.role,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const cookie = await cookies()
        const token = cookie.get('cartToken')?.value
        if (account?.provider == 'credentails') {
          return true
        }

        if (!user.email) {
          return false
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        })

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })
          if (token) {
            const cart = await prisma.cart.findFirst({
              where: {
                token,
              },
            })

            await prisma.cartItem.deleteMany({
              where: {
                cartId: cart?.id,
              },
            })

            await prisma.cart
              .delete({
                where: {
                  id: cart?.id,
                },
              })
              .then(() => cookie.delete('cartToken'))
          }
          return true
        } else {
          const tokenNew = crypto.randomUUID()
          const tokenFavorites = crypto.randomUUID()

          await prisma.user.create({
            data: {
              email: user.email,
              verified: new Date(),
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })

          const findNewUser = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          })

          await prisma.favorites.create({
            data: {
              token: tokenFavorites,
              userId: findNewUser!.id,
            },
          })

          if (token) {
            const cart = await prisma.cart.findFirst({
              where: {
                token,
              },
            })

            await prisma.cart
              .update({
                where: {
                  id: cart?.id,
                },
                data: {
                  userId: findNewUser!.id,
                },
              })
              .then(() => cookie.delete('cartToken'))
          } else {
            await prisma.cart.create({
              data: {
                token: tokenNew,
                userId: findNewUser!.id,
              },
            })
          }
          return true
        }
      } catch (error) {
        console.error('error [SIGNIN]', error)
        return false
      }
    },

    async jwt({ token }) {
      if (!token.email) {
        return token
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      })

      const favorites = await prisma.favorites.findFirst({
        where: { userId: findUser!.id },
      })

      const cart = await prisma.cart.findFirst({
        where: { userId: findUser!.id },
      })

      if (findUser) {
        token.email = findUser.email
        token.cartToken = cart?.token
        token.favoritesToken = favorites?.token
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.cartToken = token.cartToken as string
        session.user.favoritesToken = token.favoritesToken as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
}
