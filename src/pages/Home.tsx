import React, { useEffect } from 'react';
import { useBeerStore } from '../stores/beersStore';
import CardItem from '../components/CardItem';

import '../components/Layout.css';

const Home = () => {
    const { fetchBeersList, beersList, isLoading, error } = useBeerStore(
        (state) => state
    );

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
        <div className="layout">
            {beersList?.map((beerProps) => {
                return <CardItem key={beerProps.id} {...beerProps} />;
            })}
        </div>
    );
};

export default Home;
