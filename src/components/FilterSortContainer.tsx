import React, { ChangeEvent } from 'react';
import { Input, Select } from './Input';

import './FilterSortContainer.css';
import { useSearchParams } from 'react-router-dom';
import { useBeerStore } from '../stores/beersStore';

const FilterSortContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log('searchParams', searchParams.toString());
    const { filterBeersListbyQueryKey, sortBeersListbyQueryKey } = useBeerStore(
        (state) => state
    );

    const onSubmitHander = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const criteria = searchParams.get('criteria');
        const queryKey =
            searchParams.get('keyword') || searchParams.get('style');

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
        if (!queryKey) return;

        if (e.target.value.length === 0) {
            searchParams.delete(queryKey);
            setSearchParams((searchParams) => {
                searchParams.set(queryKey, '');
                return searchParams;
            });
            filterBeersListbyQueryKey(queryKey || '');
            return;
        }

        setSearchParams(() => {
            searchParams.set(queryKey, e.target.value);
            return searchParams;
        });
    };

    const onClearHandler = () => {
        searchParams.delete('keyword');
        searchParams.delete('style');
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
                    value={searchParams.get('keyword') || ''}
                    placeholder="Name, brand, style"
                    label="Filter by keyword"
                    onChange={(e) => onChangeHandler(e, 'keyword')}
                    disabled={!!searchParams.get('style')}
                />
                <Select
                    value={searchParams.get('style') || ''}
                    label="Filter by style"
                    onChange={(e) => onChangeHandler(e, 'style')}
                    disabled={!!searchParams.get('keyword')}
                    options={[
                        { value: '', label: 'Select style' },
                        { value: 'ipa', label: 'IPA' },
                        { value: 'stout', label: 'Stout' },
                        { value: 'pale ale', label: 'Pale Ale' },
                        { value: 'brown ale', label: 'Brown Ale' },
                        { value: 'white ale', label: 'White Ale' },
                        { value: 'brown', label: 'Brown' },
                        { value: 'belgian style', label: 'Belgian Style' },
                        { value: 'fat tire', label: 'Fat Tire' },
                        { value: 'hefe', label: 'Hefe' },
                    ]}
                />
                <Select
                    value={searchParams.get('criteria') || ''}
                    label="Sort by criteria"
                    onChange={(e) => onChangeHandler(e, 'criteria')}
                    options={[
                        { value: '', label: 'Select criteria' },
                        { value: 'a-z', label: 'A-Z' },
                        { value: 'z-a', label: 'Z-A' },
                        { value: 'high-low', label: 'high-low price' },
                        { value: 'low-high', label: 'low-high price' },
                    ]}
                />
                <div className="filter-buttons">
                    <button className="filter-button" type="submit">
                        Submit
                    </button>
                    <button
                        className="filter-button filter-button--clear"
                        type="button"
                        onClick={onClearHandler}
                        disabled={
                            !searchParams.get('keyword') &&
                            !searchParams.get('style') &&
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
