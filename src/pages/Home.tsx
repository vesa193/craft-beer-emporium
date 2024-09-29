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
        filteredBeersList,
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

    useEffect(() => {
        fetchBeersList();
    }, []);

    console.log('filteredBeersList', filteredBeersList);

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
                {isLoading && !error && <p>Loading...</p>}
                {error && !isLoading && <p>{error}</p>}
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
