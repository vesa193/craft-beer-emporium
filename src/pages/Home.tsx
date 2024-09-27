import React, { useEffect } from 'react';
import { useBeerStore } from '../stores/beersStore';
import CardItem from '../components/CardItem';

import '../components/Layout.css';
import { useDialogStore } from '../stores/dialogStore';
import Dialog from '../components/Dialog';
import FilterSortContainer from '../components/FilterSortContainer';

const Home = () => {
    const {
        fetchBeersList,
        beersList,
        isLoading,
        error,
        updateSoldBeers,
        soldBeersList,
    } = useBeerStore((state) => state);
    const { isOpen, onOpen } = useDialogStore((state) => state);

    const lastSoldBeer = soldBeersList[soldBeersList?.length - 1];
    const onBuyHandler = (beerId: number) => {
        const soldBeer = beersList.find((beer) => beer.id === beerId);

        if (soldBeer) {
            updateSoldBeers(soldBeer);
            onOpen();
        }
    };

    console.log('beersList', beersList);

    useEffect(() => {
        fetchBeersList();
    }, []);

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            {isOpen && (
                <Dialog
                    header={lastSoldBeer.name}
                    image={
                        <img src={lastSoldBeer.image} alt={lastSoldBeer.name} />
                    }
                    body={
                        <div className="dialog-body">
                            <p>
                                {`${lastSoldBeer.price} - x${lastSoldBeer.quantity}`}
                            </p>
                            <p></p>
                        </div>
                    }
                />
            )}
            <FilterSortContainer />
            <div className="layout">
                {beersList?.map((beerProps) => {
                    return (
                        <CardItem
                            key={beerProps.id}
                            {...beerProps}
                            onBuyHandler={onBuyHandler}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;
