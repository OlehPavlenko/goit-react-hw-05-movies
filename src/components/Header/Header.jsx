import React from 'react';
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <ul>
            <li>
                <NavLink exact to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/movies">Movies</NavLink>
            </li>
        </ul>
    );
};