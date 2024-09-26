import React from 'react';
import { NavLink } from 'react-router-dom';
import craftBeerEmporiumLogo from '../../public/craft-beer-emporium.jpg';
import './Navbar.css';
export const Navbar = () => {
    return (
        <header>
            <img src={craftBeerEmporiumLogo} alt="Craft Beer Emp Logo" />
            <nav>
                <ul>
                    <li>
                        <NavLink to="/beers">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/management">Management</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
