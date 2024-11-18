import { goto } from "$app/navigation";
import { writable, get } from "svelte/store"
import { env } from "$lib/env";

export const user = writable({
    email: '',
    password: '',
});

export const error = writable('');

// validation
export const validateUser = () => {
    const currentUser = get(user);

    if (!currentUser.email) {
        error.set('Email required');
    } else if (!currentUser.password) {
        error.set('Password required');
    } else {
        loginUser();
    }
}

// login user
export const loginUser = async () => {
    const currentUser = get(user);
    console.log(` user : ${currentUser.email}, pas: ${currentUser.password}`);

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: currentUser.email,
                password: currentUser.password,
            })
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            user.set({
                email: "",
                password: "",
            })
            location.replace("/");
        } else {
            console.log('Failed to login');
        }
    } catch (error) {
        console.error('Failed', error);
    }
}