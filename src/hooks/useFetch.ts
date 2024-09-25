import { useEffect, useState } from 'react';

type TState<T> = {
    isLoading: boolean;
    fetchedData: T[] | null;
    error: string;
};

export const useFetch = (url: string) => {
    const [data, setData] = useState<TState<unknown>>({
        isLoading: false,
        fetchedData: null,
        error: '',
    });
    const fetchData = async (url: string) => {
        setData({
            isLoading: true,
            fetchedData: null,
            error: '',
        });
        try {
            const result = await fetch(url);
            if (!result.ok) {
                setData({
                    isLoading: false,
                    fetchedData: null,
                    error: 'Something is wrong with fetch.',
                });
                throw Error('Something is wrong with fetch.');
            }

            const fetchedData = await result.json();
            setData({
                isLoading: false,
                fetchedData,
                error: '',
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setData({
                    isLoading: false,
                    fetchedData: null,
                    error: error.message,
                });
                throw Error(error.message);
            }
        }
    };
    useEffect(() => {
        fetchData(url);
    }, []);

    return { data };
};
