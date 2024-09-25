import React from 'react';
import { useFetch } from '../hooks/useFetch';

type TBeer = {
    id: number;
    price: string;
    name: string;
    rating: {
        average: number;
        reviews: number;
    };
    image: string;
};

const Home = () => {
    const { data } = useFetch(import.meta.env.VITE_API_URL);
    const { fetchedData, isLoading, error } = data;
    console.log(data);

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
                {(fetchedData as TBeer[])?.map(({ id, name, image }) => {
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
