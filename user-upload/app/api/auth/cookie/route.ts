import { COOKIE_CONSTANT } from "@/lib/constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const cookieStore = await cookies()
        const email = cookieStore.get(COOKIE_CONSTANT)?.value || null

        return NextResponse.json({ email }, { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json({ error: 'Failed to fetch cookie' }, { status: 500 })
    }
}