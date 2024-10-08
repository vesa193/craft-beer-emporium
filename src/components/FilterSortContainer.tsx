import React, { ChangeEvent, useState } from 'react';
import { Input, Select } from './Input';
import { useSearchParams } from 'react-router-dom';
import { TCriteria, useBeerStore } from '../stores/beersStore';
import closeIcon from '../assets/icons/close-icon.svg';
import searchIcon from '../assets/icons/search-icon.svg';

import style from './FilterSortContainer.module.css';

const FilterSortContainer = () => {
    const [queries, setQueries] = useState<{
        name: string;
        criteria: TCriteria | '';
    }>({
        name: '',
        criteria: '',
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        filterBeersListbyQueryKey,
        sortBeersListbyQueryKey,
        fetchBeersList,
        isLoading,
    } = useBeerStore((state) => state);

    const onSubmitHander = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = queries.name;
        const criteria = queries.criteria as TCriteria;

        setSearchParams(() => {
            if (queries.name) searchParams.set('name', queries.name);
            if (queries.criteria)
                searchParams.set('criteria', queries.criteria);
            return searchParams;
        });

        if (!criteria && !name) {
            fetchBeersList({ name, criteria });
        }

        if (name) {
            filterBeersListbyQueryKey(name);
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
        setQueries({
            ...queries,
            [queryKey]: e.target.value,
        });

        if (!searchParams.get(queryKey)) {
            searchParams.delete(queryKey);
            setSearchParams(searchParams);
        }

        // Note: handle search input field and clear
        if (e.target.value?.length === 0) {
            searchParams.delete(queryKey);
            setSearchParams(searchParams);
            fetchBeersList({
                name: searchParams.get('name') || '',
                criteria: searchParams.get('criteria') as TCriteria,
            });
            return;
        }
    };

    const onClearHandler = () => {
        setQueries({ name: '', criteria: '' });
        searchParams.delete('name');
        searchParams.delete('criteria');
        setSearchParams(searchParams);
        filterBeersListbyQueryKey('');
    };

    return (
        <div className={style.filterSortContainer}>
            <h3>Filter & Sort</h3>
            <form
                onSubmit={onSubmitHander}
                className={style.filterSortContainerInputs}
            >
                <Input
                    type="text"
                    value={queries.name || searchParams.get('name') || ''}
                    placeholder="Name of beer"
                    label="Filter by name"
                    onChange={(e) => onChangeHandler(e, 'name')}
                />
                <Select
                    value={
                        queries.criteria || searchParams.get('criteria') || ''
                    }
                    label="Sort by criteria"
                    onChange={(e) => onChangeHandler(e, 'criteria')}
                    options={[
                        { value: 'a-z', label: 'A-Z' },
                        { value: 'z-a', label: 'Z-A' },
                        { value: 'high-low', label: 'high-low price' },
                        { value: 'low-high', label: 'low-high price' },
                    ]}
                />
                <div className={style.filterButtons}>
                    <button
                        className={style.filterButton}
                        type="submit"
                        disabled={isLoading}
                    >
                        <img src={searchIcon} alt="search" />
                    </button>
                    <button
                        data-testid="clear-button"
                        className={[
                            style.filterButton,
                            style.filterButtonClear,
                        ].join(' ')}
                        type="button"
                        onClick={onClearHandler}
                        disabled={
                            !searchParams.get('name') &&
                            !searchParams.get('criteria')
                        }
                    >
                        <img src={closeIcon} alt="remove all" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterSortContainer;
