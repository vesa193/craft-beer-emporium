import React, { ChangeEvent } from 'react';
import { Input, Select } from './Input';

import './FilterSortContainer.css';
import { useSearchParams } from 'react-router-dom';
import { useBeerStore } from '../stores/beersStore';

const FilterSortContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { filterBeersListbyQueryKey } = useBeerStore((state) => state);

    const onSubmitHander = (
        e: ChangeEvent<HTMLFormElement>,
        queryKey: string
    ) => {
        e.preventDefault();
        if (!queryKey) return;
        filterBeersListbyQueryKey(queryKey);
    };

    const onChangeHandler = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
        queryKey: string
    ) => {
        if (!queryKey) return;

        if (e.target.value.length === 0) {
            searchParams.delete(queryKey);
            setSearchParams(searchParams);
            filterBeersListbyQueryKey(queryKey || '');
            return;
        }

        setSearchParams({ [queryKey]: e.target.value });
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
                onSubmit={(e: ChangeEvent<HTMLFormElement>) =>
                    onSubmitHander(
                        e,
                        searchParams.get('keyword')! ||
                            searchParams.get('style')!
                    )
                }
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
                    value=""
                    label="Sort by criteria"
                    onChange={() => {}}
                    options={[
                        { value: '', label: 'Select criteria' },
                        { value: 'a-z', label: 'A-Z' },
                        { value: 'z-a', label: 'Z-A' },
                        { value: 'highest', label: 'By highest price' },
                        { value: 'lower', label: 'By lower price' },
                    ]}
                />
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
                <button
                    className="filter-button"
                    type="submit"
                    // disabled={!searchParams.get('keyword')}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FilterSortContainer;
