/* eslint-disable react-hooks/rules-of-hooks */
import { FormState, LoginFormSchema, SignupFormSchema } from "../lib/validations";

export const signup = async (state: FormState, formData: FormData) => {
    // validate form field
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
}

export const login = async (state: FormState, formData: FormData) => {
    const validateFields = LoginFormSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }
}