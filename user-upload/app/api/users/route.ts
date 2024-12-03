import cloudinary from "@/lib/config/cloudinaryConfig"
import prisma from "@/lib/prismaClient"
import { Prisma } from "@prisma/client"
import DataURIParser from "datauri/parser"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

interface Image {
    publicId: string
    secureUrl: string
}

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
            } as Prisma.UserCreateInput
        })

        return NextResponse.json({ message: 'User added', newUser }, { status: 201 })
    } catch (error) {
        console.log(`Server Error: ${error}`)
        return NextResponse.json({ error: `Failed to add user` }, { status: 400 })
    }
}