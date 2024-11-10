import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const product = await Product.findById(id);
    return NextResponse.json(product, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await request.json();
    const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updateProduct, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
}