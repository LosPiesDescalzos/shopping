export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    count: number;
}

export interface ProductsState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}

const productsInitialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};