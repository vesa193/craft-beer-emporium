import React, { ChangeEvent } from 'react';
import { Input, Select } from './Input';

import './FilterSortContainer.css';
import { useSearchParams } from 'react-router-dom';
import { useBeerStore } from '../stores/beersStore';

const FilterSortContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log('searchParams', searchParams.toString());
    const { filterBeersListbyQueryKey, sortBeersListbyQueryKey, isLoading } =
        useBeerStore((state) => state);

    const onSubmitHander = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const criteria = searchParams.get('criteria');
        const queryKey = searchParams.get('name');

        if (queryKey) {
            filterBeersListbyQueryKey(queryKey);
        }

        if (
            criteria === 'a-z' ||
            criteria === 'z-a' ||
            criteria === 'high-low' ||
            criteria === 'low-high'
        ) {
            sortBeersListbyQueryKey(criteria);
        }
    };

    const onChangeHandler = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
        queryKey: string
    ) => {
        if (!searchParams.get(queryKey) && searchParams.has(queryKey)) {
            searchParams.delete(queryKey);
            setSearchParams(searchParams);
        }

        // Note: handle search input field and clear
        if (e.target.value?.length === 0) {
            searchParams.delete(queryKey);
            setSearchParams(searchParams);
            return;
        }

        setSearchParams(() => {
            searchParams.set(queryKey, e.target.value);
            return searchParams;
        });
    };

    const onClearHandler = () => {
        searchParams.delete('name');
        searchParams.delete('criteria');
        setSearchParams(searchParams);
        filterBeersListbyQueryKey('');
    };

    return (
        <div className="filter-sort-container">
            <h3>Filter & Sort</h3>
            <form
                onSubmit={onSubmitHander}
                className="filter-sort-container-inputs"
            >
                <Input
                    type="text"
                    value={searchParams.get('name') || ''}
                    placeholder="Name of beer"
                    label="Filter by name"
                    onChange={(e) => onChangeHandler(e, 'name')}
                />
                <Select
                    value={searchParams.get('criteria') || ''}
                    label="Sort by criteria"
                    onChange={(e) => onChangeHandler(e, 'criteria')}
                    options={[
                        { value: 'a-z', label: 'A-Z' },
                        { value: 'z-a', label: 'Z-A' },
                        { value: 'high-low', label: 'high-low price' },
                        { value: 'low-high', label: 'low-high price' },
                    ]}
                />
                <div className="filter-buttons">
                    <button
                        className="filter-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                    <button
                        className="filter-button filter-button--clear"
                        type="button"
                        onClick={onClearHandler}
                        disabled={
                            !searchParams.get('name') ||
                            !searchParams.get('criteria')
                        }
                    >
                        Clear all
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterSortContainer;
