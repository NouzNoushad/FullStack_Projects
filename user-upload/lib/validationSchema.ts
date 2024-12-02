import { z } from "zod";

// user validation schema
export const UserFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
    email: z.string().email({ message: 'Please enter valid email' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }).regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    profession: z.string().optional(),
    image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: 'File must be an image'
    }).optional(),
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