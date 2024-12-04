import { SignupFormSchema, SignupFormState, UserFormSchema, UserFormState } from "@/lib/validationSchema";

// user validation
export const userValidation = async (state: UserFormState, formData: FormData) => {
    const validatedFields = UserFormSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        profession: formData.get('profession') as string,
        image: formData.get('image'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
}

// signup validation
export const signupValidation = async (state: SignupFormState, formData: FormData) => {
    const validatiedFeilds = SignupFormSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string
    })

    if (!validatiedFeilds.success) {
        return {
            errors: validatiedFeilds.error.flatten().fieldErrors,
        }
    }
}