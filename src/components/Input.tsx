import React, { ChangeEvent } from 'react';

import './Input.css';

type TInputType = 'text' | 'select';

type InputProps = {
    type: TInputType;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
};

type TOption = {
    value: string;
    label: string;
};

type SelectProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: TOption[];
    label: string;
    disabled?: boolean;
};

export const Input = ({
    type,
    value,
    placeholder,
    onChange,
    disabled,
}: InputProps) => {
    return (
        <div className="input">
            <label htmlFor="input-field">
                <small>Filter by keyword</small>
            </label>
            <input
                id="input-field"
                className="input-field"
                type={type || 'text'}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                disabled={disabled}
            />
        </div>
    );
};

export const Select = ({
    value,
    onChange,
    options,
    label,
    disabled,
}: SelectProps) => {
    return (
        <div className="select">
            <label htmlFor="select-field">
                <small>{label}</small>
            </label>
            <select
                id="select-field"
                className="select-field"
                value={value}
                onChange={(e) => onChange(e)}
                disabled={disabled}
            >
                {options?.map(({ value, label }) => {
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
