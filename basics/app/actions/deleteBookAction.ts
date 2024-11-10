'use server'

import { Book } from "../interfaces/bookInterface";

export async function deleteBookAction(id: string): Promise<Book[]> {
    try {
        const response = await fetch(`http://localhost:3000/api/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error("Failed to delete book:")
        }
        const books = await response.json()
        return books
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}