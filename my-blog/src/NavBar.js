import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.svg';
const NavBar = () => (
    <nav>
        <ul>
           
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/art">Articles</Link>
            </li>

        </ul>
    </nav>
)
export default NavBar