type CategoryType = {
    _id: string;
    name: string;
    description: string;
    image: string;
    products: ProductType[];
}

type ProductType = {
    _id: string;
    name: string;
    description: string;
    media: [string];
    category: [CategoryType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    numberInStock: number;
    internalMaterial: [string];
    externalMaterial: [string];
    createdAt: Date;
    updatedAt: Date;
}