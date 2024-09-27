import React from 'react';

import './SidebarItem.css';

type SidebarItemProps = {
    id: number;
    image: string;
    name: string;
    price: string;
    quantity: number;
};

export const SidebarItem = ({
    image,
    name,
    price,
    quantity,
}: SidebarItemProps) => {
    return (
        <li className="sidebar-item">
            <div>
                <img width={50} src={image} alt={name} />
                <strong>{name}</strong>
            </div>

            <p>{`${price} - x${quantity}`}</p>
        </li>
    );
};
