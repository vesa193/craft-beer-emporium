import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import craftBeerEmporiumLogo from '../assets/craft-beer-emporium.jpg';
import cartIcon from '../assets/icons/cart-icon.png';
import { useBeerStore } from '../stores/beersStore';
import { useSidebarStore } from '../stores/sidebarStore';

import style from './Navbar.module.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const { soldBeersList } = useBeerStore((state) => state);
    const { onOpen } = useSidebarStore((state) => state);
    const { pathname } = useLocation();

    return (
        <header className={style.header}>
            <Link to={pathname !== '/beers' ? '/beers' : pathname}>
                <img
                    className={style.headerLogo}
                    src={craftBeerEmporiumLogo}
                    alt="Craft Beer Emp Logo"
                />
            </Link>
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
