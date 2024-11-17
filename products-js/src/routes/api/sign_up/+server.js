import connectToDatabase from "$lib/db"
import { userModel } from "$lib/models/User.js";
import bcrypt from "bcrypt";

// connect to db
connectToDatabase()

// sign up user
export const POST = async ({ request }) => {
    const { name, email, password } = await request.json();

    try {
        const user = await userModel.findOne({ name: name });
        if (user) {
            return new Response(JSON.stringify({ error: 'User exists' }), { status: 400 });
        }

        const newPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: newPassword,
        });
        await newUser.save();

        return new Response(JSON.stringify({ message: 'User created' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Sign up failed' }), { status: 500 });
    }
}