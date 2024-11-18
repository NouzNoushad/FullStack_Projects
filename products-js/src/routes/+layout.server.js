export function load({ cookies }) {
    const auth_token = cookies.get("auth_token");
    return {
        auth_token,
    };
}