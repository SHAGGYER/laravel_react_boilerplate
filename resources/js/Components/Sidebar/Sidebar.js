import React, {useContext} from "react";
import "./Sidebar.css";
import AppContext from "../../Contexts/AppContext";
import SidebarSubmenu from "./SidebarSubmenu/SidebarSubmenu";
import SidebarLink from "./SidebarLink/SidebarLink";
import Backdrop from "../Backdrop/Backdrop";
import {Link} from "react-router-dom";

export default function () {
    const {logout, isSidebarOpen, setSidebarOpen, desktopMatches} = useContext(AppContext);

    const handleLogout = () => {
        logout();
        window.location = '/';
    };

    const userItems = [
        {
            to: '/users',
            title: 'Browse'
        },
        {
            to: '/users/create',
            title: 'Create'
        }
    ]

    return (
        <div className={"side-drawer " + (!isSidebarOpen ? 'side-drawer--inactive' : '')}>
            {isSidebarOpen && !desktopMatches && <Backdrop onClick={() => setSidebarOpen(false)}/>}
            <div className="sidebar__top">
                <h2 className="sidebar__top-name">
                    <span>Admin CP</span>
                </h2>
            </div>

            <ul className="sidebar__nav flex--grow mt-2">
                <SidebarLink to="/" title="Dashboard"/>
                <li className="sidebar__nav-item">
                    <Link to={`/`} className="sidebar__nav-link">
                        Visit Site
                    </Link>
                </li>
                <SidebarSubmenu title="Users" items={userItems}/>
                <SidebarLink to="/settings" title="Settings"/>
            </ul>
            <div className="sidebar__bottom" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</div>
        </div>
    )
}
