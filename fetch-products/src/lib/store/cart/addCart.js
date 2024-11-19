export const addToCart = async (product) => {
    const { title, image, category, price, description, rating } = product;
    // console.log(`client image: ${image}, title: ${title}, cat: ${category}, price: ${price}, des: ${description}, rating: ${rating}`);
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify({
                title,
                image,
                price,
                description,
                category,
                rating
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`data: ${data.message}`);
            location.reload();
        } else {
            console.log('failed to post cart');
        }
    } catch (error) {
        console.error('Error', error);
    }
}