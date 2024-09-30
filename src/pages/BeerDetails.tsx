import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useBeerStore } from '../stores/beersStore';
import BeerDetailCard from '../components/BeerDetailCard';

const BeerDetails = () => {
    const { beerId } = useParams();
    const { singleBeer, findSingleBeer, isLoading, error } = useBeerStore();

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
        return <BeerDetailCard singleBeer={singleBeer} />;
    }
};

export default BeerDetails;
