import { TBeer } from '../types/types';

export const formatNumberByPrice = (price: string) => {
    return price.split('$')[1];
};

export const countTotal = (soldBeersList: TBeer[]) => {
    let result = 0;
    soldBeersList.forEach((soldBeer: TBeer) => {
        result += parseFloat(formatNumberByPrice(soldBeer.price));
    });

    return result;
};
