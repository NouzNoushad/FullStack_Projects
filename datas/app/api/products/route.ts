import Product from "@/app/models/Product";
import connectMongodb from "../db"
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongodb();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
}

export async function POST(request: Request) {
    await connectMongodb();
    const { name, brand, price, description } = await request.json();
    const newUser = await new Product({
        name,
        brand,
        price,
        description,
    }).save();
    return NextResponse.json(newUser, { status: 201 });
}