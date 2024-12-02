/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"

export const userFormAction = () => {
    const [file, setFile] = useState<File | null>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    return {
        handleImageUpload,
        file,
    }
}