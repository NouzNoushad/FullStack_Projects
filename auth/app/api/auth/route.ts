import prisma from "@/app/lib/prisma"
import { hash } from "bcrypt"

export const POST = async (request: Request) => {

    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log(`name: ${name}, email: ${email}, password: ${password}`)

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 })
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        return new Response(JSON.stringify({ message: 'User created', newUser }), { status: 201 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return new Response(JSON.stringify({ error: 'Sign up failed' }), { status: 500 })
    }
}