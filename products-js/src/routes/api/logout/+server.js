export const POST = ({ cookies }) => {
    try {
        cookies.delete('auth_token', { path: '/' });
        return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to logout" }), { status: 500 });
    }
}