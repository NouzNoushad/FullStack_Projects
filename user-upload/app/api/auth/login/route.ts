import prisma from "@/lib/prismaClient";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_CONSTANT } from "@/lib/constants";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const cookieStore = cookies()

    try {
        const user = await prisma.auth.findUnique({ where: { email: email } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
        }

        const userPassword = await compare(password, user.password)
        if (!userPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
        }

        (await cookieStore).set(COOKIE_CONSTANT, user.email)

        const response = NextResponse.json({ message: 'Login success' }, { status: 200 })

        return response

    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
    }
}