interface File {
    _id?: string;
    filename: string;
    path: string;
    size: number;
}

interface Product {
    _id?: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    image: File | null;
}

