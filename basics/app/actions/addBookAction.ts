'use server'

import { Book } from "../interfaces/bookInterface";

export async function addBookAction(book: Book): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/book", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error("Failed to add book")
        }
        await response.json();
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
}