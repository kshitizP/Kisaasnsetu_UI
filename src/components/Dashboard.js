import React from 'react';
import { Redirect } from 'react-router-dom';
import { CartContext } from './helpers/Contexts';
import Dictionary from './helpers/dictionary';
import withAuthRedirect from './hoc/WithAuthRedirect';
import { Tabs } from './subcomponents/Tabs';
import './Dashboard.css';
import * as utils from './helpers/utils';
import Cookies from 'js-cookie';
import Constants from './helpers/constants';
import { logoutUser } from '../services/ApiServices';

function Dashboard(props) {
    const { authState, setAuthState } = props;
    const { setCartState } = React.useContext(CartContext);
    const { phone, name, profile, email} = authState;
    const userdata = { phone, name, profile, email};
    const tabsList = [
        {
            label: Dictionary.ORDERS_TAB_LABEL,
            api: Constants.ORDER_LIST_ENDPOINT
        },
        {
            label: Dictionary.ADDRESS_TAB_LABEL,
            api: Constants.ADDRESS_LIST_ENDPOINT
        }
    ];
    const handleLogout = () => {
        Cookies.remove('userinfo')
        if(Cookies.get('access_token')){
            Cookies.remove('access_token')
        }
        logoutUser(Constants.LOGOUT_USER_ENDPOINT);
        setAuthState({
            type: "LOGOUT",
            payload: utils.get_state_from_response(undefined)
        })
        setCartState({
            type: 'RESET'
        })
    }
    if(!authState.isAuthenticated) {
        return (<Redirect to='/login'></Redirect>)
    } else {
        return (
            <div className="dashboard_wrapper">
                <div className="dashboard_content">
                    <div className="dashboard_items dashboard_orderInfo">
                        <Tabs tabsList={tabsList}/>
                    </div>
                    <div className="dashboard_items dashboard_profile">
                        <div className="u-h2 Heading Border__bottom dashboard_profileHeader">
                            {Dictionary.PROFILE_LABEL}
                        </div>
                        <div className="dashboard_profileData">
                            <ul className="list_Nostyle dashboard_profileDataList">
                                { Object.keys(userdata).map((value, index) => {
                                    return (<li key={index} className="dashboard_listItem"><span className="Base-text Heading" style={{padding:"0px 8px"}}>{value}:</span>{userdata[value]}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="dashboard_logout">
                            <button className="Button Logout_Button" onClick={()=>handleLogout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuthRedirect(Dashboard);