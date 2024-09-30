import React, { useState } from 'react';
import { useBeerStore } from '../stores/beersStore';
import CardItem from '../components/CardItem';
import Dialog from '../components/Dialog';
import FilterSortContainer from '../components/FilterSortContainer';

import style from '../components/Layout.module.css';

const Home = () => {
    const {
        beersList,
        filteredBeersList,
        isLoading,
        error,
        updateSoldBeers,
        soldBeersList,
    } = useBeerStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    const lastSoldBeer = soldBeersList[soldBeersList?.length - 1];

    const onBuyHandler = (beerId: number) => {
        const soldBeer = beersList.find((beer) => beer.id === beerId);

        if (soldBeer) {
            updateSoldBeers(soldBeer);
            setIsOpen(true);
        }
    };

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                header={lastSoldBeer?.name}
                image={
                    <img src={lastSoldBeer?.image} alt={lastSoldBeer?.name} />
                }
                body={
                    <div className="dialog-body">
                        <p>
                            {`${lastSoldBeer?.price} - x${lastSoldBeer?.quantity}`}
                        </p>
                        <p></p>
                    </div>
                }
            />
            <FilterSortContainer />
            <div className={style.layout}>
                {isLoading && !error && (
                    <p className={style.loading}>Loading...</p>
                )}
                {error && !isLoading && <p className={style.error}>{error}</p>}
                {!isLoading &&
                    !error &&
                    (filteredBeersList.length > 0
                        ? filteredBeersList
                        : beersList
                    )?.map((beer) => {
                        return (
                            <CardItem
                                key={beer.id}
                                {...beer}
                                onBuyHandler={onBuyHandler}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default Home;
