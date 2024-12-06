import NextAuth, { Session, User } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email", type: "email", placeholder: 'email'
                },
                password: {
                    label: "Password", type: "password"
                }
            },
            async authorize(credentials) {
                const { email, password } = credentials!

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user) {
                    throw new Error('No user found')
                }

                const isValidPassword = await compare(password, user.password)

                if (!isValidPassword) {
                    throw new Error('Invalid password')
                }

                return { id: user.id, name: user.name, email: user.email }
            }
        })
    ],
    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                }
            }
            return session
        },
        async jwt({ token, user }: { token: JWT, user: User | AdapterUser }) {
            if (user) {
                token.email = user.email
                token.name = user.name
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        error: '../login'
    }
})

export { handler as GET, handler as POST }