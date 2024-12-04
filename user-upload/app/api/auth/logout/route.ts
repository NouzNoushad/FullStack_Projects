import { COOKIE_CONSTANT } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const DELETE = async () => {
    try {
        const cookieStore = await cookies()
        cookieStore.delete(COOKIE_CONSTANT)

        return NextResponse.json({ message: 'Logout success' }, { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
    }
}