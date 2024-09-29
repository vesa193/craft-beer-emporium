import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useBeerStore } from '../stores/beersStore';
import { Link } from 'react-router-dom';
import BeerDetailCard from '../components/BeerDetailCard';

const BeerDetails = () => {
    const { beerId } = useParams();
    const { singleBeer, findSingleBeer, isLoading } = useBeerStore();

    useEffect(() => {
        findSingleBeer(Number(beerId));
    }, [beerId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!singleBeer) {
        return (
            <div>
                <p>Beer not found</p>
                <Link to="/">Go back</Link>
            </div>
        );
    }

    if (!isLoading && singleBeer) {
        return <BeerDetailCard {...singleBeer} />;
    }
};

export default BeerDetails;
