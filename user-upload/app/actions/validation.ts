import { UserFormSchema, UserFormState } from "@/lib/validationSchema";

export const userValidation = async (state: UserFormState, formData: FormData) => {
    const validatedFields = UserFormSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        profession: formData.get('profession') as string,
        image: formData.get('image'),
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
}