import prisma from "@/app/lib/prisma"
import { compare } from "bcrypt"

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 400 })
        }

        const matchPassword = await compare(password, user.password)
        if (!matchPassword) {
            return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 })
        }

        return new Response(JSON.stringify({ message: 'Login success' }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed login: ${error}` }), { status: 500 })
    }
}