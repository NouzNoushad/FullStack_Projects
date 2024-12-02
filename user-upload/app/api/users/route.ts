// import cloudinary from "@/lib/config/cloudinaryConfig"
// import prisma from "@/lib/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const formData = await request.formData()

    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const profession = formData.get('profession')
    const image = formData.get('image') as File | null
    const imageString: string | undefined = undefined

    try {
        console.log(`name: ${name}, email: ${email}, phone: ${phone}, profession: ${profession}, image: ${image}, imageStr: ${imageString}`)
        if (image) {
            console.log(`image: ${image}`)

            // const uploadImage = await new Promise<cloudinary.UploadApiResponse | undefined>((resolve, reject) => {
            //     const stream = image.stream()

            //     cloudinary.v2.uploader.upload_stream({
            //         folder: 'user_images'
            //     }, (error, result) => {
            //         if (error) {
            //             reject(error)
            //         } else {
            //             resolve(result)
            //         }
            //     }).end(stream)
            // })

            // imageString = uploadImage?.secure_url;
        }

        // const newUser = await prisma.user.create({
        //     data: {
        //         name,
        //         email,
        //         phone,
        //         profession,
        //         image: imageString
        //     }
        // })

        return NextResponse.json({ message: 'User added' }, { status: 201 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: `Failed to add user` }, { status: 400 })
    }
}