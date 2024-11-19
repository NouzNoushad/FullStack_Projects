export const deleteCart = async (cartId) => {
    try {
        const response = await fetch(`/api/cart/${cartId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            location.reload();
        } else {
            console.log('Failed to delete');
        }
    } catch (error) {
        console.error(`Failed to delete cart: ${error}`);
    }
}