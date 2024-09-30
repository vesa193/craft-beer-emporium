import { create } from 'zustand';
import { TBeer } from '../types/types';
import {
    filterBeersList,
    findSingleBeerFromList,
    sortBeersList,
} from '../utils/filterAndSort';

interface TSoldBeer extends TBeer {
    quantity: number;
}

export type TChartData = {
    id: number;
    name: string;
    average: number;
    reviews: number;
};

export type TCriteria = 'a-z' | 'z-a' | 'high-low' | 'low-high';

type TBeerState = {
    singleBeer: TBeer | null;
    beersList: TBeer[];
    soldBeersList: TSoldBeer[];
    filteredBeersList: TBeer[];
    popularBeersList: TChartData[];
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
    findSingleBeer: (id: number) => void;
    filterTheMostPopularBeers: () => void;
    addNewBeer: (newBeer: TBeer) => void;
};

export const useBeerStore = create<TBeerState>((set, get) => ({
    beersList: [],
    soldBeersList: [],
    filteredBeersList: [],
    popularBeersList: [],
    singleBeer: null,
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
            console.log('filteredBeersList', filteredBeersList);

            if (filteredBeersList.length === 0) {
                set(() => ({
                    filteredBeersList: [],
                    error: 'No results found',
                    isLoading: false,
                }));
                return;
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
        const filteredBeers = filterBeersList([...get().beersList], queryKey);

        if (filteredBeers.length === 0) {
            set(() => ({
                filteredBeersList: [],
                error: 'No results found',
                isLoading: false,
            }));
            return;
        }

        set((state) => ({
            filteredBeersList: filterBeersList([...state.beersList], queryKey),
            isLoading: false,
        }));
    },
    sortBeersListbyQueryKey: (criteria: TCriteria) => {
        set(() => ({
            isLoading: true,
        }));
        set((state) => ({
            filteredBeersList: sortBeersList(
                state.filteredBeersList.length > 0
                    ? [...state.filteredBeersList]
                    : [...state.beersList],
                criteria
            ),
            isLoading: false,
        }));
    },
    findSingleBeer: (id: number) => {
        set(() => ({
            isLoading: true,
        }));
        set((state) => ({
            singleBeer: findSingleBeerFromList([...state.beersList], id),
            isLoading: false,
            error: !state.singleBeer ? 'Beer not found' : '',
        }));
    },
    filterTheMostPopularBeers: () => {
        set((state) => ({
            popularBeersList: [...state.beersList]
                .sort((a, b) => b.rating.reviews - a.rating.reviews)
                .splice(0, 10)
                .map((beer) => ({
                    id: beer.id,
                    name: beer.name,
                    average: beer.rating.average,
                    reviews: beer.rating.reviews,
                })),
        }));
    },
    addNewBeer: (newBeer: TBeer) => {
        set((state) => ({
            beersList: [...state.beersList, newBeer],
        }));
    },
}));
