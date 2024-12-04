import { z } from "zod";
import { MAX_UPLOAD_SIZE } from "./constants";

// user validation schema
export const UserFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
    email: z.string().email({ message: 'Please enter valid email' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }).regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    profession: z.string().optional(),
    image: z
        .any()
        .optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB'),
})

// error handling type
export type UserFormError = {
    [Key in keyof z.infer<typeof UserFormSchema>]?: string[]
}

// form state type
export type UserFormState = {
    errors?: UserFormError,
    message?: string
} | undefined

// Signup validation
export const SignupFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be atleast 2 characters long' }).trim(),
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }).trim()
})

export type SignupFormError = {
    [Key in keyof z.infer<typeof SignupFormSchema>]?: string[]
}

export type SignupFormState = {
    errors?: SignupFormError,
    message?: string
} | undefined

// Login validation
export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }).trim()
})

export type LoginFormError = {
    [Key in keyof z.infer<typeof LoginFormSchema>]?: string[]
}

export type LoginFormState = {
    errors?: LoginFormError,
    message?: string
} | undefined