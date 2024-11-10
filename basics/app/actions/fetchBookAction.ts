'use server'

import { Book } from "../interfaces/bookInterface";

export async function fetchBookAction(): Promise<Book[]> {
    try {
        const response = await fetch("http://localhost:3000/api/book");
        if (!response.ok) {
            throw new Error("Failed to fetch books")
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error
    }
}