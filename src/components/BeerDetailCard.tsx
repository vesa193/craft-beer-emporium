import React, { useState } from 'react';
import { TBeer } from '../types/types';

import style from './BeerDetailCard.module.css';
import Dialog from './Dialog';
import { useBeerStore } from '../stores/beersStore';

type BeerDetailCardProps = {
    singleBeer: TBeer;
};

const BeerDetailCard = ({ singleBeer }: BeerDetailCardProps) => {
    const { soldBeersList, beersList, updateSoldBeers } = useBeerStore();
    const [isOpen, setIsOpen] = useState(false);
    const lastSoldBeer = soldBeersList[soldBeersList?.length - 1];

    const onBuyHandler = (beerId: number) => {
        const soldBeer = beersList.find((beer) => beer.id === beerId);
        if (soldBeer) {
            setIsOpen(true);
            updateSoldBeers(soldBeer);
        }
    };

    return (
        <>
            <div className={style.beerDetails}>
                <img src={singleBeer?.image} alt={singleBeer.name} />
                <div className={style.beerDetailsContent}>
                    <h3>{singleBeer?.name}</h3>
                    <strong>{singleBeer?.price}</strong>
                    <p>{`Average Rate: ${Math.ceil(singleBeer?.rating?.average)}`}</p>
                    <p>{`Reviews: ${singleBeer?.rating?.reviews}`}</p>
                    <button
                        type="button"
                        onClick={() => onBuyHandler(singleBeer.id)}
                    >
                        Buy now
                    </button>
                </div>
            </div>
            {isOpen && (
                <Dialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    header={lastSoldBeer.name}
                    image={
                        <img src={lastSoldBeer.image} alt={lastSoldBeer.name} />
                    }
                    body={
                        <div className="dialog-body">
                            <p>
                                {lastSoldBeer.price}{' '}
                                {`x${lastSoldBeer.quantity}`}
                            </p>
                        </div>
                    }
                />
            )}
        </>
    );
};

export default BeerDetailCard;
