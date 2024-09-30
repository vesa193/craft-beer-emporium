import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useBeerStore } from '../stores/beersStore';
import BeerDetailCard from '../components/BeerDetailCard';
import { useDialogStore } from '../stores/dialogStore';

const BeerDetails = () => {
    const { beerId } = useParams();
    const {
        singleBeer,
        findSingleBeer,
        isLoading,
        updateSoldBeers,
        beersList,
        error,
    } = useBeerStore();
    const { isOpen, onOpen } = useDialogStore();
    const onBuyHandler = (beerId: number) => {
        const soldBeer = beersList.find((beer) => beer.id === beerId);
        if (soldBeer) {
            updateSoldBeers(soldBeer);
            onOpen();
        }
    };

    useEffect(() => {
        findSingleBeer(Number(beerId));
    }, [beerId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (singleBeer) {
        return (
            <BeerDetailCard
                singleBeer={singleBeer}
                isOpen={isOpen}
                onBuyHandler={onBuyHandler}
            />
        );
    }
};

export default BeerDetails;
