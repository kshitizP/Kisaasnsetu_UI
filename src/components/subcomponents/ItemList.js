
import { useEffect, useState } from "react";
import { post } from "../../services/ApiServices";
import Dictionary from "../helpers/dictionary";
import { AddressSubList } from "./AddressSubList";
import { LoadingSpinner } from "./commons";
import OrderSubList from "./OrderSubList";

function ItemList(props) {
    const {tab} = props;
    const [state, setState] = useState({loading: true, data:[]})
    useEffect( ()=> {
        setState({loading:true})
        post({}, tab.api)
        .then( (response)=> {
            if(response.data !== 'ERROR') {
                setState({loading:false, data:response.data})
            }
        })
    }, [tab.api])
    if(state.loading){
        return (
            <div>
                <LoadingSpinner loading={state.loading}/>
            </div>
        )
    }
    return(
        <div className="item_list">
            {tab.label === Dictionary.ADDRESS_TAB_LABEL && <div className="minDataHeight"><AddressSubList data={state.data} automode={true}/></div>}
            {tab.label === Dictionary.ORDERS_TAB_LABEL && <div className="minDataHeight"><OrderSubList values={state.data} displayAdd={true}/></div>}
        </div>
    )
}

export default ItemList;