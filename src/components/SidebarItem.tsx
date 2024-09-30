import React from 'react';

import style from './SidebarItem.module.css';
import { useLocation, useNavigate } from 'react-router';

type SidebarItemProps = {
    id: number;
    image: string;
    name: string;
    price: string;
    quantity: number;
};

export const SidebarItem = ({
    id,
    image,
    name,
    price,
    quantity,
}: SidebarItemProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleRedirect = () => {
        if (pathname.includes(`/beers/${id}`)) return;
        navigate(`/beers/${id}`);
    };

    return (
        <li className={style.sidebarItem}>
            <div onClick={handleRedirect}>
                <img width={50} src={image} alt={name} />
                <strong>{name}</strong>
            </div>

            <p>{`${price} - x${quantity}`}</p>
        </li>
    );
};
