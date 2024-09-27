import React, { ChangeEvent } from 'react';
import { Input, Select } from './Input';

import './FilterSortContainer.css';

const FilterSortContainer = () => {
    return (
        <div className="filter-sort-container">
            <h3>Filter & Sort</h3>
            <form
                onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    console.log('Submitted');
                }}
                className="filter-sort-container-inputs"
            >
                <Input
                    type="text"
                    value=""
                    placeholder="Name, brand, style"
                    label="Filter by keyword"
                    onChange={() => {}}
                />
                <Select
                    value=""
                    label="Filter by style"
                    onChange={() => {}}
                    options={[
                        { value: 'none', label: 'Select style' },
                        { value: 'ipa', label: 'IPA' },
                        { value: 'stout', label: 'Stout' },
                        { value: 'pale ale', label: 'Pale Ale' },
                        { value: 'brown ale', label: 'Brown Ale' },
                        { value: 'brown', label: 'brown' },
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
                        { value: 'none', label: 'Select criteria' },
                        { value: 'a-z', label: 'A-Z' },
                        { value: 'z-a', label: 'Z-A' },
                        { value: 'highest', label: 'By highest price' },
                        { value: 'lower', label: 'By lower price' },
                    ]}
                />

                <button className="filter-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FilterSortContainer;
