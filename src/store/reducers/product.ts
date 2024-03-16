import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/product';
import {IProduct, ProductsState} from '../../entyties/product';


const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const productsFetchSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementCount: (state, action: PayloadAction<number>) => {
            const product = state.products.find(p => p.id === action.payload);
            if (product && product.count < 10) {
                product.count += 1;
            }
        },
        decrementCount: (state, action: PayloadAction<number>) => {
            const product = state.products.find(p => p.id === action.payload);
            if (product && product.count > 1) {
                product.count -= 1;
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        deleteAllProducts: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.loading = false;
                // Теперь добавляем count к каждому продукту здесь
                state.products = action.payload.map(product => ({
                    ...product,
                    count: 1
                }));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? 'Unknown error';
            });
    },
});

export const { incrementCount, decrementCount, removeProduct, deleteAllProducts } = productsFetchSlice.actions;

export default productsFetchSlice.reducer;
