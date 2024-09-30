import React, { ChangeEvent } from 'react';

import './Input.css';

type TInputType = 'text' | 'select' | 'number';

type InputProps = {
    type: TInputType;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
    invertColor?: boolean;
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
    invertColor?: boolean;
};

export const Input = ({
    type,
    value,
    placeholder,
    onChange,
    disabled,
    label,
    invertColor = false,
}: InputProps) => {
    return (
        <div className="input">
            <label
                htmlFor="input-field"
                className={`input-label ${invertColor ? 'invert-color' : ''}`.trim()}
            >
                <small>{label}</small>
            </label>
            <input
                id="input-field"
                className={`input-field ${invertColor ? 'invert-color' : ''}`.trim()}
                type={type || 'text'}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                disabled={disabled}
                {...(type === 'number' && { min: 0 })}
                {...(type === 'number' && { max: 5 })}
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
    invertColor = false,
}: SelectProps) => {
    return (
        <div className="select">
            <label htmlFor="select-field">
                <small>{label}</small>
            </label>
            <select
                id="select-field"
                className={`select-field ${invertColor ? 'invert-color' : ''}`.trim()}
                value={value}
                onChange={(e) => onChange(e)}
                disabled={disabled}
            >
                <option value=""></option>
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
