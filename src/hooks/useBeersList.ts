import { useEffect } from 'react';
import { TCriteria, useBeerStore } from '../stores/beersStore';
import { useSearchParams } from 'react-router-dom';

export const useBeersList = () => {
    const { fetchBeersList, beersList } = useBeerStore();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (beersList.length === 0) {
            fetchBeersList({
                name: searchParams.get('name') || '',
                criteria: (searchParams.get('criteria') as TCriteria) || '',
            });
        }
    }, []);
};
