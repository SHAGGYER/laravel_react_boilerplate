import React, {useState, useEffect} from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter,
    useHistory
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import AppContext from "./Contexts/AppContext";
import Loading from "../Components/Loading/Loading";
import HttpClient from "../Services/HttpClient";
import Error400 from "../Errors/400/Error400";
import Error404 from "../Errors/404/Error404";
import Error401 from "../Errors/401/Error401";
import Error500 from "../Errors/500/Error500";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import AdminCreateUser from "./Pages/Users/Create/AdminCreateUser";
import AdminBrowseUsers from "./Pages/Users/Browse/AdminBrowseUsers";
import AdminEditUser from "./Pages/Users/Edit/AdminEditUser";
import AdminSettings from "./Pages/Settings/AdminSettings";

const App = ({location}) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [initiated, setInitiated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    let desktopQuery = window.matchMedia("(min-width: 700px)");
    const [desktopMatches, setDesktopMatches] = useState(desktopQuery.matches);
    const watchDesktop = () => {
        if (!desktopQuery.matches) {
            setDesktopMatches(false);
        } else {
            setDesktopMatches(true);
        }
    };
    desktopQuery.addListener(watchDesktop);

    useEffect(() => {
        if (!desktopMatches) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [desktopMatches])

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const {data} = await HttpClient().get("/api/auth/init");
        if (data.user) {
            setUser(data.user);
            if (data.user.role === 'root-admin' || data.user.role === 'admin') {
                setIsAdmin(true);

            } else {
                history.push('/auth/login');
                return;
            }
            if (desktopMatches) {
                setSidebarOpen(true);
            }
        }
        setInitiated(true);
    };

    const logout = async () => {
        await HttpClient().post('/api/admin/auth/logout');
        setUser(null);
    };

    return (
        <div className="h-100">
            {loading && <Loading/>}
            {initiated && (
                <AppContext.Provider value={{
                    user,
                    setUser,
                    logout,
                    loading,
                    setLoading,
                    desktopMatches,
                    setDesktopMatches,
                    isSidebarOpen,
                    setSidebarOpen,
                    isAdmin,
                    setIsAdmin
                }}>
                    <section className="flex flex--column h-100 position--relative">
                        {isAdmin && <Sidebar/>}
                        <div className='transition flex flex--column h-100'
                             style={{marginLeft: (isSidebarOpen && desktopMatches) ? '300px' : '0'}}>
                            {user && <Navbar/>}
                            <Switch>
                                <Route path='/' exact>
                                    {isAdmin ? <AdminDashboard/> : <Redirect to='/auth/login'/>}
                                </Route>
                                <Route path='/users' exact>
                                    {isAdmin ? <AdminBrowseUsers/> : <Redirect to='/auth/login'/>}
                                </Route>
                                <Route path='/users/create'>
                                    {isAdmin ? <AdminCreateUser/> : <Redirect to='/auth/login'/>}
                                </Route>
                                <Route path='/users/:id/edit'>
                                    {isAdmin ? <AdminEditUser/> : <Redirect to='/auth/login'/>}
                                </Route>

                                <Route path='/settings'>
                                    {isAdmin ? <AdminSettings/> : <Redirect to='/auth/login'/>}
                                </Route>

                                <Route path="/auth/login">
                                    {!isAdmin ? <Login/> : <Redirect to="/"/>}
                                </Route>
                                <Route path="/errors/400">
                                    <Error400/>
                                </Route>
                                <Route path="/errors/401">
                                    <Error401/>
                                </Route>
                                <Route path="/errors/404">
                                    <Error404/>
                                </Route>
                                <Route path="/errors/500">
                                    <Error500/>
                                </Route>
                            </Switch>
                        </div>

                    </section>
                </AppContext.Provider>
            )}
        </div>
    );
};

export default withRouter(App);
