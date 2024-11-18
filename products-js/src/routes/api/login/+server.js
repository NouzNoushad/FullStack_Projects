import connectToDatabase from "$lib/db";
import { userModel } from "$lib/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "$lib/env";

// connect to db
connectToDatabase();

// login user
export const POST = async ({ request, cookies }) => {
    const { email, password } = await request.json();
    console.log(`emaii: ${email}, pass; ${password}`);
    try {
        const user = await userModel.findOne({ email: email });
        const hashPassword = await bcrypt.compare(password, user.password);

        if (!user || !hashPassword) {
            return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 400 });
        } else {
            const jwtToken = jwt.sign({ email }, env.SECRET_KEY, { expiresIn: '1hr' });
            cookies.set('auth_token', jwtToken, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/'
            });
            return new Response(JSON.stringify({ message: 'Success', token: jwtToken }), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
    }
}