import React from 'react';
import { TBeer } from '../types/types';

import './CardItem.css';

type CardItemProps = TBeer;

export const CardItem = ({
    image,
    name,
    price,
    rating: { average },
}: CardItemProps) => {
    return (
        <div className="card">
            <div className="card-header">
                <img src={image} alt={name} width="100%" height="100%" />
            </div>
            <div className="card-body">
                <span>{price}</span>
                <h3>{name}</h3>
                <span>{`${Math.ceil(average)}`}</span>
            </div>
            <div className="card-footer">
                <button type="button">Buy know</button>
            </div>
        </div>
    );
};

export default CardItem;
