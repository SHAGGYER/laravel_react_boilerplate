import React, {useRef, useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import AppContext from "../../../Contexts/AppContext";
import {useClickOutside} from "../../../../Hooks/ClickOutside";

export default function () {
    const history = useHistory();
    const closedClass = "navbar__submenu-list";
    const openClass = "navbar__submenu-list navbar__submenu--active";
    const wrapperRef = useRef(null);
    const {user, logout, isAdmin} = useContext(AppContext);
    const [className, setClassName] = useState(closedClass);
    const handleLogout = () => {
        logout();
        close();
        window.location = '/';
    };
    useClickOutside(wrapperRef, () => setClassName(closedClass));

    const close = () => {
        setClassName(closedClass);
    };

    const open = () => {
        setClassName(openClass);
    };

    return (
        <li className="navbar__list-item navbar__submenu" ref={wrapperRef}>
            <button className="navbar__link navbar__submenu-btn"
                    onClick={open}>
                {user ? user.name : "Account"}
            </button>
            {user ? (
                <ul className={className}>
                    {isAdmin && (
                        <li className="navbar__submenu-item">
                            <Link to='/admin' className="navbar__link" onClick={close}>Admin CP</Link>
                        </li>
                    )}
                    <li className="navbar__submenu-item">
                        <Link to={`/profile/`} className="navbar__link" onClick={close}>Profile</Link>
                    </li>
                    <li className="navbar__submenu-item">
                        <Link to={`/orders/`} className="navbar__link" onClick={close}>Orders</Link>
                    </li>
                    <li className="navbar__submenu-item">
                        <a href="#" onClick={handleLogout} className="navbar__link">Log Out</a>
                    </li>
                </ul>
            ) : (
                <ul className={className}>
                    <li className="navbar__submenu-item">
                        <Link to="/auth/login" onClick={close} className="navbar__link">Log In</Link>
                    </li>
                    <li className="navbar__submenu-item">
                        <Link to="/auth/register" onClick={close} className="navbar__link">Register</Link>
                    </li>
                </ul>
            )}

        </li>
    )
};
