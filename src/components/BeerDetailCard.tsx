import React from 'react';
import { TBeer } from '../types/types';

import style from './BeerDetailCard.module.css';
import Dialog from './Dialog';
import { useBeerStore } from '../stores/beersStore';

type BeerDetailCardProps = {
    singleBeer: TBeer;
    isOpen: boolean;
    onBuyHandler: (beerId: number) => void;
};

const BeerDetailCard = ({
    singleBeer,
    isOpen,
    onBuyHandler,
}: BeerDetailCardProps) => {
    const { soldBeersList } = useBeerStore();
    const lastSoldBeer = soldBeersList[soldBeersList?.length - 1];

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
