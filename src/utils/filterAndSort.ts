import { TCriteria } from '../stores/beersStore';
import { TBeer } from '../types/types';
import { formatNumberByPrice } from './format';

export const filterBeersList = (beersList: TBeer[], name: string) =>
    beersList.filter(({ name: beerName }) => {
        return beerName.toLowerCase().includes(name.toLowerCase());
    });

export const sortBeersList = (beersList: TBeer[], criteria: TCriteria) =>
    beersList.sort((a, b) => {
        const critariaType = {
            'a-z': () => a.name.localeCompare(b.name),
            'z-a': () => b.name.localeCompare(a.name),
            'high-low': () =>
                parseFloat(formatNumberByPrice(b.price)) -
                parseFloat(formatNumberByPrice(a.price)),
            'low-high': () =>
                parseFloat(formatNumberByPrice(a.price)) -
                parseFloat(formatNumberByPrice(b.price)),
        };
        return critariaType[criteria]();
    });

export const findSingleBeerFromList = (
    beersList: TBeer[],
    id: number
): TBeer | undefined => {
    return beersList.find((beer) => beer.id === id);
};
