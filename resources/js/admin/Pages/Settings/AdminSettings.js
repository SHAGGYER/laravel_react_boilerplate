import React, {useContext, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import AppContext from "../../Contexts/AppContext";

export default function () {
    const {user} = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {

    }, []);

    return (
        <section className='page-with-sidebar'>
            Settings
        </section>
    )
}