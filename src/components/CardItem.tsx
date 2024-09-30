import React from 'react';
import { type TBeer } from '../types/types';
import { useLocation, useNavigate } from 'react-router';

import style from './CardItem.module.css';

type CardItemProps = TBeer;

type CardItemsHandlerProps = {
    onBuyHandler: (id: number) => void;
};

export const CardItem = ({
    id,
    image,
    name,
    price,
    rating: { average, reviews },
    onBuyHandler,
}: CardItemProps & CardItemsHandlerProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className={style.card}>
            <div className={style.cardHeader}>
                <img
                    src={image}
                    alt={name}
                    width="100%"
                    height="100%"
                    onClick={() => navigate(`${pathname}/${id}`)}
                />
            </div>
            <div className={style.cardBody}>
                <span>{price}</span>
                <h3 onClick={() => navigate(`${pathname}/${id}`)}>{name}</h3>
                <span>{`Average Rate: ${Math.ceil(average)}`}</span>
                <p>
                    <span>{`Reviews: ${reviews}`}</span>
                </p>
            </div>
            <div className={style.cardFooter}>
                <button type="button" onClick={() => onBuyHandler(id)}>
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default CardItem;
