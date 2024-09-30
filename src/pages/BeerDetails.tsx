import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useBeerStore } from '../stores/beersStore';
import BeerDetailCard from '../components/BeerDetailCard';
import spinnerIcon from '../assets/icons/spinner-icon.svg';
import style from '../components/Layout.module.css';

const BeerDetails = () => {
    const { beerId } = useParams();
    const { singleBeer, findSingleBeer, isLoading, error } = useBeerStore();

    useEffect(() => {
        findSingleBeer(Number(beerId));
    }, [beerId]);

    if (isLoading) {
        return (
            <img
                className={style.loading}
                src={spinnerIcon}
                alt="spinner-icon"
            />
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (singleBeer) {
        return <BeerDetailCard singleBeer={singleBeer} />;
    }
};

export default BeerDetails;
