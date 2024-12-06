import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { name, email, password } = await request.json()
    console.log(`///////////// name: ${name}, email: ${email}, pass: ${password}`)

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
        }

        const hashPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })

        return NextResponse.json({ message: 'User created', user }, { status: 201 })
    } catch (error) {
        console.log(`error: ${error}`)
        return NextResponse.json({ error: 'Failed to signup' }, { status: 500 })
    }
}