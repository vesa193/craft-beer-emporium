import { create } from 'zustand';
import { TBeer } from '../types/types';
import { filterBeersList, sortBeersList } from '../utils/filterAndSort';

interface TSoldBeer extends TBeer {
    quantity: number;
}

export type TCriteria = 'a-z' | 'z-a' | 'high-low' | 'low-high';

type TBeerState = {
    beersList: TBeer[];
    soldBeersList: TSoldBeer[];
    filteredBeersList: TBeer[];
    isLoading: boolean;
    error: string;
    fetchBeersList: ({
        name,
        criteria,
    }: {
        name: string;
        criteria: TCriteria;
    }) => void;
    updateSoldBeers: (newBeer: TBeer) => void;
    filterBeersListbyQueryKey: (queryKey: string) => void;
    sortBeersListbyQueryKey: (criteria: TCriteria) => void;
};

export const useBeerStore = create<TBeerState>((set, get) => ({
    beersList: [],
    soldBeersList: [],
    filteredBeersList: [],
    isLoading: false,
    error: '',

    fetchBeersList: async ({ name, criteria }) => {
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

            const beersList = await response.json();
            let filteredBeersList = [...beersList];

            if (name) {
                filteredBeersList = filterBeersList(
                    [...filteredBeersList],
                    name
                );
            }

            if (criteria) {
                filteredBeersList = sortBeersList(
                    [...filteredBeersList],
                    criteria
                );
            }

            set(() => ({
                beersList,
                filteredBeersList,
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
        if (queryKey === '' || queryKey === 'keyword') {
            set(() => ({
                filteredBeersList: [],
                beersList: get().beersList,
            }));
        }

        set(() => ({
            isLoading: true,
        }));
        setTimeout(() => {
            set((state) => ({
                filteredBeersList: filterBeersList(
                    [...state.beersList],
                    queryKey
                ),
                isLoading: false,
            }));
        }, 1000);
    },
    sortBeersListbyQueryKey: (criteria: TCriteria) => {
        set(() => ({
            isLoading: true,
        }));
        setTimeout(() => {
            set((state) => ({
                filteredBeersList: sortBeersList(
                    state.filteredBeersList.length > 0
                        ? [...state.filteredBeersList]
                        : [...state.beersList],
                    criteria
                ),
                isLoading: false,
            }));
        }, 1000);
    },
}));
