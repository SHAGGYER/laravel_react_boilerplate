import {createContext} from "react";

const AppContext = createContext({
    user: null,
    setUser: () => {
    },
    logout: () => {
    },
    loading: false,
    setLoading: () => {
    },

    isSidebarOpen: false,
    setSidebarOpen: () => {
    },
    desktopMatches: false,
    setDesktopMatches: () => {
    },
    isAdmin: false,
    setIsAdmin: () => {}
});

export default AppContext;
