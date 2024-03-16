import {
    Image,
    Card,
} from '@vkontakte/vkui';
import { Icon16Add, Icon16Delete, Icon16Minus } from '@vkontakte/icons';
import styles from './styles.module.css';
import React from "react";
import { IProductcard } from "./types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import  { incrementCount, decrementCount, removeProduct }  from '../../store/reducers/product';

export const ProductCard = (props: IProductcard) => {
    const product = props.product;

    const dispatch = useDispatch<AppDispatch>();

    const handleIncrement = () => {
        dispatch(incrementCount(product.id));
    };

    const handleDecrement = () => {
        dispatch(decrementCount(product.id));
    };

    const handleRemove = () => {
        dispatch(removeProduct(product.id));
    };


    return (
            <Card className={styles.card}>
                <Image
                    size={150}
                    src={product.image}
                />
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div>{product.title}</div>
                        <div>{product.price} руб.</div>
                        <div>{product.description}</div>
                    </div>
                    <div className={`${styles.bottom} ${styles.noSelect}`}>
                        <div className={styles.groupBtns}>
                            <Icon16Minus onClick={handleDecrement}/>
                            <div>{product.count}</div>
                            <Icon16Add onClick={handleIncrement}/>
                        </div>
                        <Icon16Delete className={styles.delete} onClick={handleRemove}/>
                    </div>
                </div>
            </Card>
    );
}