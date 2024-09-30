import React from 'react';
import { NavLink } from 'react-router-dom';
import craftBeerEmporiumLogo from '../assets/craft-beer-emporium.jpg';
import cartIcon from '../assets/icons/cart-icon.png';
import './Navbar.css';
import { useBeerStore } from '../stores/beersStore';
import { useSidebarStore } from '../stores/sidebarStore';
export const Navbar = () => {
    const { soldBeersList } = useBeerStore((state) => state);
    const { onOpen } = useSidebarStore((state) => state);
    return (
        <header className="header">
            <img
                className="header-logo"
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
                    <li>
                        <div className="header-icon-badge">
                            {soldBeersList?.length}
                        </div>
                        <img
                            onClick={onOpen}
                            className="header-icon"
                            src={cartIcon}
                            alt="cart icon"
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
