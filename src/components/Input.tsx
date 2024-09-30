import React, { ChangeEvent } from 'react';

import style from './Input.module.css';

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

export type SelectProps = {
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
        <div className={style.input}>
            <label
                htmlFor="inputField"
                className={`${style.inputLabel} ${invertColor ? style.invertColor : ''}`.trim()}
            >
                <small>{label}</small>
            </label>
            <input
                id="inputField"
                className={`${style.inputField} ${invertColor ? style.invertColor : ''}`.trim()}
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
        <div className={style.select}>
            <label htmlFor={style.selectField}>
                <small>{label}</small>
            </label>
            <select
                id={style.selectField}
                className={`${style.selectField} ${invertColor ? style.invertColor : ''}`.trim()}
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
