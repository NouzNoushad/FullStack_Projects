export const POST = async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const brand = data.get('brand');
    const price = data.get('price');
    const description = data.get('description');
    const file = data.get('image');

    try {
        console.log(`/////// name: ${name}, brand: ${brand}, price: ${price}, des: ${description}, file: ${file}`);
        return new Response(JSON.stringify('Nothing special'), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to post product' }), { status: 500 });
    }
}