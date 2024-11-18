import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";

export const logoutUser = async () => {
    try {
        const response = await fetch('/api/logout', {
            method: "POST",
        });
        if (response.ok) {
            console.log('Logout');
            location.replace("/");
        }
    } catch (error) {
        console.error('Failed', error);
    }
}