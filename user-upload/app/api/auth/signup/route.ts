import prisma from "@/lib/prismaClient";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log(`auth name: ${name}, email: ${email}, password: ${password}`)

    try {
        // check existing user
        const checkEmailExists = await prisma.auth.findUnique(
            {
                where: {
                    email
                }
            }
        )
        if (checkEmailExists) {
            console.log('User exists')
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        // hash password
        const hashedPassword = await hash(password, 10)

        // create user
        const newAuth = await prisma.auth.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        return NextResponse.json({ message: 'User added', user: newAuth }, { status: 201 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to signup' }, { status: 500 })
    }
}