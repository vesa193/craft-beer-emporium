import React, { useEffect, useState } from 'react';
import { TCriteria, useBeerStore } from '../stores/beersStore';
import CardItem from '../components/CardItem';
import Dialog from '../components/Dialog';
import FilterSortContainer from '../components/FilterSortContainer';
import spinnerIcon from '../assets/icons/spinner-icon.svg';

import style from '../components/Layout.module.css';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const {
        beersList,
        filteredBeersList,
        isLoading,
        error,
        updateSoldBeers,
        fetchBeersList,
        soldBeersList,
    } = useBeerStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const lastSoldBeer = soldBeersList[soldBeersList?.length - 1];

    useEffect(() => {
        fetchBeersList({
            name: searchParams.get('name') || '',
            criteria: (searchParams.get('criteria') as TCriteria) || '',
        });
    }, []);

    const onBuyHandler = (beerId: number) => {
        const soldBeer = beersList.find((beer) => beer.id === beerId);

        if (soldBeer) {
            updateSoldBeers(soldBeer);
            setIsOpen(true);
        }
    };

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                header={lastSoldBeer?.name}
                image={
                    <img src={lastSoldBeer?.image} alt={lastSoldBeer?.name} />
                }
                body={
                    <div className="dialog-body">
                        <p>
                            {`${lastSoldBeer?.price} - x${lastSoldBeer?.quantity}`}
                        </p>
                        <p></p>
                    </div>
                }
            />
            <FilterSortContainer />
            <div className={style.layout}>
                {isLoading && !error && (
                    <img
                        className={style.loading}
                        src={spinnerIcon}
                        alt="spinner-icon"
                    />
                )}
                {error && !isLoading && <p className={style.error}>{error}</p>}
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
