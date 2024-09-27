import { create } from 'zustand';
import { TBeer } from '../types/types';

interface TSoldBeer extends TBeer {
    quantity: number;
}

type TBeerState = {
    beersList: TBeer[];
    soldBeersList: TSoldBeer[];
    isLoading: boolean;
    error: string;
    fetchBeersList: () => void;
    updateSoldBeers: (newBeer: TBeer) => void;
    filterBeersListbyQueryKey: (keyword: string) => void;
};

export const useBeerStore = create<TBeerState>((set, get) => ({
    beersList: [],
    soldBeersList: [],
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
    updateSoldBeers: (newBeer: TBeer) => {
        set((state) => {
            const findBeerIndex = state.soldBeersList.findIndex(
                (beer: TBeer) => beer.id === newBeer.id
            );
            if (findBeerIndex === -1) {
                return {
                    soldBeersList: [
                        ...state.soldBeersList,
                        {
                            ...newBeer,
                            quantity: 1,
                        },
                    ],
                };
            }
            // Note: if item exist, increase quantity by 1
            state.soldBeersList[findBeerIndex].quantity += 1;
            return {
                soldBeersList: [...state.soldBeersList],
            };
        });
    },
    filterBeersListbyQueryKey: (queryKey: string) => {
        if (!queryKey || queryKey === 'keyword' || queryKey === 'style') {
            get().fetchBeersList();
            return;
        }

        set(() => ({
            isLoading: true,
        }));
        setTimeout(() => {
            set((state) => ({
                beersList: state.beersList.filter(({ name }) =>
                    name.toLowerCase().includes(queryKey.toLowerCase())
                ),
                isLoading: false,
            }));
        }, 1000);
    },
}));
