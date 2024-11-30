/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FormError, FormState, SignupFormSchema } from "../lib/validations";

export const handleSignUpForm = () => {
    const [errors, setErrors] = useState<Partial<Record<keyof FormError, string[]>>>({})

    const signup = async (state: FormState, formData: FormData) => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const response = await signup({}, formData)

        if(response?.errors) {
            setErrors(response.errors)
        }
    }

    return {
        handleSubmit,
        errors,
    }
}