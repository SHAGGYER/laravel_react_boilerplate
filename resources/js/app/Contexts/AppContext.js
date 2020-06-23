import {createContext} from "react";

const AppContext = createContext({
    user: null,
    setUser: () => {
    },
    isAdmin: false,
    logout: () => {
    },
    loading: false,
    setLoading: () => {
    },
    desktopMatches: false,
    setDesktopMatches: () => {
    },
});

export default AppContext;
