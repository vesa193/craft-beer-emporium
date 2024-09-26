import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
export const Navbar = () => {
    return (
        <header>
            <img src="" alt="Logo" />
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
