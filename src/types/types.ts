export type TBeer = {
    id: number;
    price: string;
    name: string;
    rating: {
        average: number;
        reviews: number;
    };
    image: string;
    quantity?: number;
};
