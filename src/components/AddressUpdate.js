import { useState } from "react";
import Dictionary from "./helpers/dictionary"
import withAuthRedirect from "./hoc/WithAuthRedirect"
import { AddressForm } from "./subcomponents/AddressForm"
import { post } from '../services/ApiServices'
import Constants from './helpers/constants';
import { useHistory } from "react-router-dom";
function AddressUpdate(props) {
    const hist = useHistory();
    if(!(props.location && props.location.state)){
        hist.push('/cart')
    }
    const { address, ref } = props.location.state;
    const [state, setState] = useState({loading: false})
    const handleUpdate = (data, prevData) => {
        if(!state.loading){
            let address = {}
            delete data['existing']
            for(const item in data){
                address[item] = data[item].value
            }
            setState({loading:true})
            address['address_id'] = prevData['address_id']
            post({address: address, action: 'UPDATE'}, Constants.ADDRESS_UPDATE_ENDPOINT)
            .then( (response) => {
                if(response && response.data !== 'ERROR') {
                    setState({loading:false})
                    props.history.push(ref)
                }
            })
        }
    }
    return (
        <div>
            <h1 className="Heading u-h1">{Dictionary.EDIT_ADDRESS_LABEL}</h1>
            <AddressForm address={address} handleUpdate={handleUpdate}></AddressForm>
        </div>
    )
}

export default withAuthRedirect(AddressUpdate)