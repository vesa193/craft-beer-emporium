import React, { ChangeEvent, useEffect, useState } from 'react';
import { useBeerStore } from '../stores/beersStore';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

import style from './Management.module.css';
import { Input } from '../components/Input';

const Management = () => {
    const {
        filterTheMostPopularBeers,
        popularBeersList,
        beersList,
        addNewBeer,
    } = useBeerStore();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        rate: 0,
        reviews: 0,
        image: '',
    });
    const [isChartView, setChartView] = useState(true);

    useEffect(() => {
        filterTheMostPopularBeers();
    }, [beersList, filterTheMostPopularBeers]);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    const onSubmitHandler = () => {
        const { name, price, rate, reviews, image } = formData;
        if (name && price && rate && reviews && image) {
            const newBeer = {
                id: beersList.length + 1,
                name,
                price: `$${price}`,
                rating: {
                    average: rate,
                    reviews,
                },
                image,
                quantity: 0,
            };
            addNewBeer(newBeer);
            setChartView(true);
        }
    };

    return (
        <div className={style.management}>
            <div className={style.managementHeader}>
                <h2>Management page</h2>
                <button
                    type="button"
                    onClick={() => setChartView(!isChartView)}
                    disabled={!isChartView}
                >
                    Add beer
                </button>
            </div>
            <div className={style.managementContent}>
                {isChartView ? (
                    <>
                        <h4>Most popular Beers</h4>
                        <Chart
                            type="bar"
                            data={{
                                labels: popularBeersList.map(
                                    (beer) => beer.name
                                ),
                                xLabels: popularBeersList.map(
                                    (beer) => beer.name
                                ),
                                datasets: [
                                    {
                                        label: 'Reviews',
                                        data: popularBeersList.map(
                                            (beer) => beer.reviews
                                        ),
                                        backgroundColor:
                                            'rgb(215, 140, 0, 0.5)',
                                        borderColor: 'rgb(215, 140, 0, 1)',
                                    },
                                    {
                                        label: 'Rate',
                                        data: popularBeersList.map(
                                            (beer) => beer.average
                                        ),
                                        backgroundColor:
                                            'rgba(100, 108, 255, 0.5)',
                                        borderColor: 'rgba(100, 108, 255, 1)',
                                    },
                                ],
                            }}
                        />
                    </>
                ) : (
                    <div>
                        <h4>Add beer</h4>
                        <form onSubmit={onSubmitHandler}>
                            <Input
                                invertColor
                                type="text"
                                label="Name*"
                                value={formData.name}
                                placeholder="Paulaner"
                                onChange={(e) => onHandleChange(e, 'name')}
                            />
                            <Input
                                invertColor
                                type="text"
                                label="Price*"
                                value={formData.price}
                                placeholder="19.87"
                                onChange={(e) => onHandleChange(e, 'price')}
                            />
                            <Input
                                invertColor
                                type="text"
                                label="Rate*"
                                value={String(formData.rate)}
                                placeholder="4.75"
                                onChange={(e) => onHandleChange(e, 'rate')}
                            />
                            <Input
                                invertColor
                                type="text"
                                label="Reviews*"
                                value={String(formData.reviews)}
                                onChange={(e) => onHandleChange(e, 'reviews')}
                            />
                            <Input
                                invertColor
                                type="text"
                                label="Image link"
                                value={formData.image}
                                placeholder="https://images.punkapi.com/v2/keg.png"
                                onChange={(e) => onHandleChange(e, 'image')}
                            />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Management;
