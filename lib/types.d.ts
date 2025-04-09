type CategoryType = {
    _id: string;
    name: string;
    description: string;
    image: string;
    products: ProductType[];
}

type BannerType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    url: string;
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
    discount: number;
    createdAt: Date;
    updatedAt: Date;
}