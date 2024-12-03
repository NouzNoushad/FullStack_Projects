import cloudinary from "@/lib/config/cloudinaryConfig"
import prisma from "@/lib/prismaClient"
import { Prisma } from "@prisma/client"
import DataURIParser from "datauri/parser"
import { NextRequest, NextResponse } from "next/server"
import { Image } from "@/app/interface/userInterface"
import path from "path"

// post user
export const POST = async (request: NextRequest) => {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const profession = formData.get('profession') as string
    const image = formData.get('image')
    let uploadImage: Image | string = ""

    const parser = new DataURIParser()

    try {
        console.log(`name: ${name}, email: ${email}, phone: ${phone}, profession: ${profession}, image: ${image}, imageStr: ${uploadImage}`)

        if (image && typeof image !== 'string' && image instanceof File) {
            console.log(`image: ${image.name}`)

            const arrayBuffer = await image.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const base64Image = parser.format(path.extname(image.name).toString(), buffer)

            if (!base64Image.content) {
                throw new Error('Failed to generate image content')
            }

            const createImage = async (imgContent: string) => {
                const uploadedImageResponse = await cloudinary.v2.uploader.upload(imgContent, {
                    folder: 'user',
                    resource_type: 'image',
                    type: 'authenticated'
                });
                return uploadedImageResponse;
            };
            const uploadResponse = await createImage(base64Image.content)

            uploadImage = {
                publicId: uploadResponse.public_id,
                secureUrl: uploadResponse.secure_url,
            }
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                profession,
                image: image === "" ? undefined : { create: uploadImage }
            } as Prisma.UserCreateInput,
            include: {
                image: true,
            }
        })

        return NextResponse.json({ message: 'User added', newUser }, { status: 201 })
    } catch (error) {
        console.log(`Server Error: ${error}`)
        return NextResponse.json({ error: `Failed to add user` }, { status: 500 })
    }
}

// get all users
export const GET = async () => {
    try {
        const users = await prisma.user.findMany({ include: { image: true } })

        const usersImage = await Promise.all(users.map(async (user) => {
            if (user.image) {
                const url = cloudinary.v2.url(user.image.publicId, {
                    secure: true,
                    type: "authenticated",
                })

                return {
                    ...user,
                    url,
                }
            }
            return user
        }))

        usersImage.map((user) => {
            console.log(`name: ${user.name}, email: ${user.email}, phone: ${user.phone}, profession: ${user.profession}, image: ${user.image}`)
        })
        return NextResponse.json({ users: usersImage }, { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}