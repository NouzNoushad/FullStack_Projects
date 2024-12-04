import prisma from "@/lib/prismaClient";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
        const user = await prisma.auth.findUnique({ where: { email: email } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
        }

        const userPassword = await compare(password, user.password)
        if (!userPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
        }

        // cookie
        const cookie = serialize('session', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24,
        })

        const response = NextResponse.json({ message: 'Login success' }, { status: 200 })
        response.headers.append('Set-Cookie', cookie)

        return response
        
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
    }
}