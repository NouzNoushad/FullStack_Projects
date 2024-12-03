import cloudinary from "@/lib/config/cloudinaryConfig"
import prisma from "@/lib/prismaClient"
import { NextRequest, NextResponse } from "next/server"

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