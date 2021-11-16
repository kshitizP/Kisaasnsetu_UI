import React, { useEffect, useState } from 'react';
import { post } from '../services/ApiServices'
import Constants from './helpers/constants';
import { AddressSubList } from './subcomponents/AddressSubList';
import withAuthRedirect from './hoc/WithAuthRedirect';
import { LoadingSpinner } from './subcomponents/commons';
import '../styles/Payments.css';
import { AddressForm } from './subcomponents/AddressForm';
import Dictionary from './helpers/dictionary';
import { useHistory, useLocation } from 'react-router-dom';
function AddressSelect(props) {
    let history = useHistory();
    const location = useLocation();
    const [state, setState] = useState({loading: true, addresses: []})
    useEffect( ()=> {
        loadData();
    }, [])

    const loadData= () => {
        setState({loading:true})
        post({},Constants.ADDRESS_UPDATE_ENDPOINT)
        .then((response) => {
            if(response.data !== 'ERROR') {
                setState({loading:false, addresses:response.data})
            }
        })
    }

    const handleSelect= (e, selectAddress) => {
        let data = location.state
        history.push({
            pathname: '/place_order/payment_page',
            state: {...data, address: selectAddress}
        })
    }
    const handleUpdate = (data, prevData) => {
        if(!state.loading){
            let address = {}
            delete data['existing']
            for(const item in data){
                address[item] = data[item].value
            }
            setState({loading:true})
            post({address: address, action: 'CREATE'}, Constants.ADDRESS_UPDATE_ENDPOINT)
            .then( (response) => {
                if(response && response.data !== 'ERROR') {
                    setState({loading:false, addresses: response.data})
                }
            })
        }
    }
    if(state.loading){
        return (
                <div className="loadingOverlay">
                    <LoadingSpinner loading={state.loading}/>
                </div>
        )
    }
    return (
        <div className="AddressSelect__divMain">
            { state.loading &&
            <div className="loadingOverlay">
                <LoadingSpinner loading={state.loading}/>
            </div>
            }
            <div className="Heading u-h1">
                {state.addresses.length === 0 ? Constants.NO_EXISTING_ADDRESS_TXT : Constants.SELECT_ADDRESS_TXT}
            </div>
            <div className="AddressSelect_hint u-h6">{Dictionary.SELECT_ADDRESS_HINT}</div>
            <div className="address__grid">
                <AddressSubList data={state.addresses} handleSelect={handleSelect}/>
            </div>
            <div>
                <h1 className="addAddress__heading Heading u-h2">{Dictionary.ADD_ADDRESS_LABEL}</h1>
                <AddressForm handleUpdate={handleUpdate}></AddressForm>
            </div>
        </div>
    )
}

export default withAuthRedirect(AddressSelect)