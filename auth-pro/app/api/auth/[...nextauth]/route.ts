import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"

export default NextAuth({
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
        async session({session, token}) {
            if(token) {
                session.user!.email = token.email
            }
            return session
        },
        async jwt({token, user}) {
            if(user){
                token.email = user.email
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})