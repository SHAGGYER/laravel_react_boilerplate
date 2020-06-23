import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./Navbar.css";
import AppContext from "../../Contexts/AppContext";
import AccountSubmenu from "./AccountSubmenu/AccountSubmenu";
import Button from "../../../Components/Button/Button";

const Navbar = () => {
    const history = useHistory();
    const {user, isAdmin, setSidebarOpen, pageTitle} = useContext(AppContext);

    return (
        <nav className="navbar">
            {isAdmin ? (
                <div className='flex flex--align-center'>
                    <Button className="mr-1"
                            small
                            primary
                            onClick={() => setSidebarOpen(prevState => !prevState)}>
                        <i className="fas fa-bars"/>
                    </Button>
                    <span className='text--white'>Admin Control Panel</span>
                </div>
            ) : <div/>}
            {isAdmin && (
                <h3 className="text--white">{pageTitle}</h3>
            )}
            <ul className="navbar__list">
                <AccountSubmenu/>
            </ul>
        </nav>
    );
};

export default Navbar;
