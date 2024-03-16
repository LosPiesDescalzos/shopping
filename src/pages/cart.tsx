import {
    View,
    Panel,
    PanelHeader,
    FixedLayout,
    Separator,
    Search,
    Card, ScreenSpinner,
} from '@vkontakte/vkui';
import styles from './styles.module.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/actions/product";
import { ProductCard } from "../components/productCard";
import { deleteAllProducts }  from '../store/reducers/product';


export const Cart = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);

    const dispatch = useDispatch<AppDispatch>();

    const totalPrice = products.reduce((acc, product) => acc + product.price * product.count, 0).toFixed(2);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteAll = () => {
        dispatch(deleteAllProducts());
    }

    return (
        <View activePanel="fixedLayout" className={styles.view}>
            <Panel id="fixedLayout">
                <PanelHeader fixed>Корзина</PanelHeader>
                <FixedLayout vertical="top" filled>
                    <Search value={searchQuery} onChange={handleSearchChange} />
                    <Separator wide />
                </FixedLayout>
                <div
                    className={styles.layout}
                >
                    {loading ? (
                        <ScreenSpinner />
                    ) : (
                        <>
                            <div className={styles.leftCol}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product}/>
                                ))}
                            </div>
                            <div className={styles.rightCol}>
                                <Card className={styles.total}>
                                    <div>Итого: {totalPrice} руб.</div>
                                    <div className={styles.groupBtns}>Оформить</div>
                                    <div className={styles.groupBtns} onClick={handleDeleteAll}>Удалить все товары</div>
                                </Card>
                            </div>
                        </>
                    )}
                </div>
            </Panel>
        </View>
    );
}
