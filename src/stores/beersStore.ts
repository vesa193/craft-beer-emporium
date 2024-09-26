import { create } from 'zustand';

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

type TBeerState = {
    beersList: TBeer[];
    isLoading: boolean;
    error: string;
    fetchBeersList: () => void;
};

export const useBeerStore = create<TBeerState>((set) => ({
    beersList: [],
    isLoading: false,
    error: '',
    fetchBeersList: async () => {
        const url = import.meta.env.VITE_API_URL;

        set(() => ({
            beersList: [],
            isLoading: true,
            error: '',
        }));

        try {
            const response = await fetch(url);
            if (!response.ok) {
                set(() => ({
                    beersList: [],
                    isLoading: false,
                    error: `Something wrong: status is ${response.status}`,
                }));
            }

            const data = await response.json();
            set(() => ({
                beersList: data,
                isLoading: false,
                error: '',
            }));
        } catch (error: unknown) {
            if (error instanceof Error) {
                set(() => ({
                    beersList: [],
                    isLoading: false,
                    error: error.message,
                }));
            }
        }
    },
}));
