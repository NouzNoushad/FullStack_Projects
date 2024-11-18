import { goto } from "$app/navigation";
import { writable, get } from "svelte/store";

export const userData = writable({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
});

export const error = writable('');

export const validateUser = () => {
    const currentUser = get(userData);

    if (!currentUser.name) {
        error.set('Name is required');
    } else if (!currentUser.email) {
        error.set('Email is required');
    } else if (!currentUser.password) {
        error.set('Password is required');
    } else if (!currentUser.confirmPassword) {
        error.set('Confirm password is required');
    }
    else if (currentUser.password !== currentUser.confirmPassword) {
        error.set('Password doesnot match');
    } else {
        signUpUser(currentUser);
    }
}

// create user
export const signUpUser = async (user) => {
    console.log(`user name: ${user.name}, email: ${user.email}, pass: ${user.password}`);
    try {
        const response = await fetch('/api/sign_up', {
            method: 'POST',
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            userData.set({
                name: "",
                email: "",
                password: '',
                confirmPassword: "",
            });
            goto("/login");
        } else {
            console.log(response.error);
            error.set(response.error);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}