import { create } from 'zustand';
import { TBeer } from '../types/types';
import { formatNumberByPrice } from '../utils/format';

interface TSoldBeer extends TBeer {
    quantity: number;
}

export type TCriteria = 'a-z' | 'z-a' | 'high-low' | 'low-high';

type TBeerState = {
    beersList: TBeer[];
    soldBeersList: TSoldBeer[];
    isLoading: boolean;
    error: string;
    fetchBeersList: () => void;
    updateSoldBeers: (newBeer: TBeer) => void;
    filterBeersListbyQueryKey: (queryKey: string) => void;
    sortBeersListbyQueryKey: (criteria: TCriteria) => void;
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
        // TODO: this is temporary solution
        // should be refactored
        // should have separately array for filtered, that would be modified by copied items from beersList array
        get().fetchBeersList();
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
    sortBeersListbyQueryKey: (criteria: TCriteria) => {
        set(() => ({
            isLoading: true,
        }));
        setTimeout(() => {
            set((state) => ({
                beersList: state.beersList.sort((a, b) => {
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
                }),
                isLoading: false,
            }));
        }, 1000);
    },
}));
