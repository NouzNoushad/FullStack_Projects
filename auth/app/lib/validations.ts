import { z } from "zod";

export const SignupFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 charactes long.' }).trim(),
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).trim()
})

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).trim()
})

export type FormError = z.infer<typeof SignupFormSchema>
export type LoginFormError = z.infer<typeof LoginFormSchema>

export type FormState = | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
} | undefined

export type LoginState = | {
    errors?: {
        email?: string[]
        password?: string[]
    },
    message?: string
} | undefined