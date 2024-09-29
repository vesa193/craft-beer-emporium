import React, { useEffect } from 'react';
import { LineChart } from '../components/Chart';
import { useBeerStore } from '../stores/beersStore';

const Management = () => {
    const { filterTheMostPopularBeers, popularBeersList } = useBeerStore();
    useEffect(() => {
        filterTheMostPopularBeers();
    }, []);

    console.log(popularBeersList);

    return (
        <>
            <h1>Management page</h1>
            <LineChart />
        </>
    );
};

export default Management;
