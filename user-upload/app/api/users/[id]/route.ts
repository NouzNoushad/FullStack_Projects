/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "@/lib/config/cloudinaryConfig"
import prisma from "@/lib/prismaClient"
import DataURIParser from "datauri/parser"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

// get user
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params

    try {
        const currentUser = await prisma.user.findUnique({ where: { id: id }, include: { image: true } })
        return currentUser ? NextResponse.json({ user: currentUser }, { status: 200 }) : NextResponse.json({ error: 'User not found' }, { status: 400 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

// update user
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const profession = formData.get('profession') as string
    const image = formData.get('image')
    let uploadImage: any = undefined

    const parser = new DataURIParser()

    try {
        console.log(`name: ${name}, email: ${email}, phone: ${phone}, profession: ${profession}, image: ${image}`)

        const currentUser = await prisma.user.findUnique({
            where: { id },
            include: { image: true }
        })

        if (image && typeof image !== 'string' && image instanceof File) {
            console.log(`image: ${image.name}`)

            const arrayBuffer = await image.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const base64Image = parser.format(path.extname(image.name).toString(), buffer)

            if (!base64Image.content) {
                throw new Error('Failed to generate image content')
            }

            if (currentUser?.image?.publicId) {
                await cloudinary.v2.uploader.destroy(currentUser.image.publicId)
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

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                profession,
                image: uploadImage ? {
                    upsert: {
                        update: uploadImage,
                        create: uploadImage,
                    }
                } : undefined,
            },
            include: {
                image: true
            }
        })

        return NextResponse.json({ message: 'User updated', updatedUser }, { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }
}

// delete user
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    console.log(`/////// id: ${id}`)

    try {
        const user = await prisma.user.findUnique({ where: { id }, include: { image: true } })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const cloudinaryId = user.image?.publicId

        if (cloudinaryId) {
            await cloudinary.v2.uploader.destroy(cloudinaryId)
            console.log(`${cloudinaryId} deleted from cloudinary`)
        }

        if (user.image) {
            await prisma.image.delete({
                where: {
                    id: user.image.id
                }
            })
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: 'User deleted' }, { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}