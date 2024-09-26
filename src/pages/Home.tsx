import React, { useEffect } from 'react';
import { useBeerStore } from '../stores/beersStore';

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
        <>
            <h1>Home page</h1>
            <br />
            <br />
            <ul>
                {beersList?.map(({ id, name, image }) => {
                    return (
                        <li key={id}>
                            {name}
                            {image && <img src={image} alt={name} />}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Home;
