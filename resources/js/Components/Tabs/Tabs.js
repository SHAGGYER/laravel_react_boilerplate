import React from "react";
import "./Tabs.css";

export const Tabs = ({children, activeTab, setActiveTab}) => {
    return (
        <div>
            <div className='flex flex--wrap mb-1 tabs__header'>
                {children.map(({props}, index) => (
                    <div className={'tabs__tab ' + (index === activeTab ? 'tabs__tab--active' : '')}
                         key={index}
                         onClick={() => setActiveTab(index)}>
                        {props.title}
                    </div>
                ))}
            </div>
            <div className='pa-1'>
                {children[activeTab]}
            </div>
        </div>
    )
}

export const Tab = ({title, children}) => {
    return (
        <div>
            {children}
        </div>
    )
}