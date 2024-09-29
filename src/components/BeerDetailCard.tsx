import React from 'react';
import { TBeer } from '../types/types';

import style from './BeerDetailCard.module.css';

const BeerDetailCard = (singleBeer: TBeer) => {
    return (
        <div className={style.beerDetails}>
            <img src={singleBeer?.image} alt={singleBeer.name} />
            <div className={style.beerDetailsContent}>
                <h3>{singleBeer?.name}</h3>
                <strong>{singleBeer?.price}</strong>
                <p>{`Average Rate: ${Math.ceil(singleBeer?.rating?.average)}`}</p>
                <p>{`Reviews: ${singleBeer?.rating?.reviews}`}</p>
                <button type="button">Buy now</button>
            </div>
        </div>
    );
};

export default BeerDetailCard;
