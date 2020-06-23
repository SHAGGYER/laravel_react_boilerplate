import React, {useState, useEffect} from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter
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
import Register from "./Pages/Register/Register";

const App = ({location}) => {
    const [user, setUser] = useState(null);
    const [initiated, setInitiated] = useState(false);
    const [loading, setLoading] = useState(false);
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
        init();
    }, []);

    const init = async () => {
        const {data} = await HttpClient().get("/api/auth/init");
        setLoading(true);
        if (data.user) {
            setUser(data.user);
            setIsAdmin(data.user.role === 'admin');
        }
        setInitiated(true);
        setLoading(false);
    };

    const logout = async () => {
        await HttpClient().post('/api/auth/logout');
        setUser(null);
        setIsAdmin(false);
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
                    isAdmin,
                }}>
                    <section className="flex flex--column h-100 position--relative">
                        <div className='flex flex--column h-100'>
                            <Navbar/>
                            <Switch>
                                <Route path="/auth/login">
                                    {!user ? <Login/> : <Redirect to="/"/>}
                                </Route>
                                <Route path="/auth/login">
                                    {!user ? <Register/> : <Redirect to="/"/>}
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
