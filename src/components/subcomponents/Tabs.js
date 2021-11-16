import React from 'react';
import ItemList from './ItemList';
export function Tab(props) {
    const {label, activeTab, onClick} = props;
    return (
            <li className={`list_inline Heading u-h2 dashboard_tabItemHeading ${label === activeTab ? "dashboard_activeTab": ""}`}  onClick={() => onClick(label)}>
                {label}
            </li>
    )
}

export function Tabs(props) {
    const {tabsList} = props;
    const [activeTab, setActiveTab] = React.useState(tabsList[0].label)
    return (
        <div className="dashboard_Tabs">
            <ul className="list_Nostyle dashboard_TabsList Border__bottom">
                {tabsList.map((tab, index) => {
                    return <Tab
                            key={index}
                            label={tab.label}
                            activeTab={activeTab}
                            onClick={setActiveTab} />
                })}
            </ul>
            <div className="dashboard_tabContent">
                {
                    tabsList.map((tab, index) => {
                        if(tab.label !== activeTab) return undefined
                        return <ItemList key={index} tab={tab}/>
                    })
                }
            </div>
        </div>
    )
}