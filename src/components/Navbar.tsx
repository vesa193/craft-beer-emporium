import React from 'react';
import { NavLink } from 'react-router-dom';
import craftBeerEmporiumLogo from '../assets/craft-beer-emporium.jpg';
import cartIcon from '../assets/icons/cart-icon.png';
import { useBeerStore } from '../stores/beersStore';
import { useSidebarStore } from '../stores/sidebarStore';

import style from './Navbar.module.css';

export const Navbar = () => {
    const { soldBeersList } = useBeerStore((state) => state);
    const { onOpen } = useSidebarStore((state) => state);
    return (
        <header className={style.header}>
            <img
                className={style.headerLogo}
                src={craftBeerEmporiumLogo}
                alt="Craft Beer Emp Logo"
            />
            <nav>
                <ul>
                    <li>
                        <NavLink to="/beers">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/management">Management</NavLink>
                    </li>
                    <li onClick={onOpen}>
                        <div className={style.headerIconBadge}>
                            {soldBeersList?.length}
                        </div>
                        <img
                            className={style.headerIcon}
                            src={cartIcon}
                            alt="cart icon"
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
