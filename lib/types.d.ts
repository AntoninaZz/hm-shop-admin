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
    variants: {
        color?: string;
        size?: string;
        numberInStock: number;
    }[];
    // numberInStock: number;
    internalMaterial: [string];
    externalMaterial: [string];
    discount: number;
    createdAt: Date;
    updatedAt: Date;
}

type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    paymentStatus: string;
    isSent: boolean;
    createdAt: string;
}

type OrderType = {
    _id: string;
    customerClerkId: string;
    products: OrderItemType[];
    totalAmount: number;
    shippingAddress: string;
    comment: string;
    paymentStatus: string;
    isSent: boolean;
    createdAt: Date;
};

type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
}

type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
    phone: string;
}