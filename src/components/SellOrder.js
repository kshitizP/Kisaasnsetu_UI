import withAuthRedirect from "./hoc/WithAuthRedirect"
import React, { useEffect } from 'react'
import { get, post } from "../services/ApiServices"
import Constants from "./helpers/constants"
import { dismissibleNotyf, getCustomerType } from "./helpers/utils"
import { LoadingSpinner } from "./subcomponents/commons"
import { Redirect } from "react-router-dom"
function SellOrder(props) {
    const data = [
        {
            label: "Select a product",
            value: ""
        }
    ]
    const [state, setState] = React.useState({loading: true, products: data})

    useEffect( ()=> {
        get({}, Constants.GET_SELL_PRODUCTS_ENDPOINT)
        .then ((response)=> {
            if(response !== 'ERROR'){
                setState({products:JSON.parse(response.data), loading:false})
            } else {
                setState({products: [], loading:false})
            }
        })
    }, [])

    const handleSellOrder = (e) => {
        e.preventDefault();
        const data = {}
        data['product'] = e.target.elements.product.value;
        data['quantity'] = e.target.elements.quantity.value;
        data['user_price'] = e.target.elements.user_price.value;
        data['user_comments'] = e.target.elements.user_comments.value;
        data['comm_address'] = e.target.elements.comm_address.value;
        setState({...state, loading: true})
        post(data, Constants.PLACE_SELL_ORDER_ENDPOINT)
        .then( (response) => {
            if(response !== 'ERROR'){
                setState({...state, loading: false})
                dismissibleNotyf.success(`          Sell Request Placed: Request ID: ${response.data.order_id}          `)
            }
        })
    }

    if(getCustomerType() === 'C'){
        return <Redirect to='/cart'/>
    }

    return (
        <div className="sellPage">
            { state.loading &&
            <div className="loadingOverlay">
                <LoadingSpinner loading={state.loading}/>
            </div>
            }
            <div className="sellPage__Header">
                <h1>Provide Product Information to Sell</h1>
            </div>
            <div>
                <form onSubmit={handleSellOrder}>
                    <div className="Form_Item">
                        <select defaultValue="" className="Form__Input"  id="product" name="product" placeholder="Product Name" aria-label="Product Name" required>
                        <option value="">Select a Product...</option>
                            {
                                state.products.map((value, index)=>{
                                    return <option key={index} value={value.value}>{value.label}</option>
                                })
                            }
                        </select>
                        <label htmlFor="product" className="Floating_FormLabel text-light">Product</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" type="number" id="quantity" autoComplete="on" name="quantity" placeholder="Estimated Quantity (per Kg or per Unit)" aria-label="Quantity available" required/>
                        <label htmlFor="quantity" className="Floating_FormLabel text-light">Quantity</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" type="number" id="user_price" autoComplete="on" name="user_price" placeholder="Expected Price for produce (per unit)" aria-label="Quantity available" required/>
                        <label htmlFor="user_price" className="Floating_FormLabel text-light">Expected Price</label>
                    </div>
                    <div className="Form_Item">
                        <textarea className="Form__Input" id="user_comments" name="user_comments" required placeholder="Please provide Product information like(Quality or any related information to describe state of goods)" rows="10"/>
                        <label htmlFor="user_comments" className="Floating_FormLabel text-light">Product Details</label>
                    </div>
                    <div className="Form_Item">
                        <textarea className="Form__Input" id="comm_address" name="comm_address" required placeholder="Please provide communication details" rows="5"/>
                        <label htmlFor="comm_address" className="Floating_FormLabel text-light">Contact Info.</label>
                    </div>
                    <button id="submitBtn" type="submit" className="Button">Submit Sell Request</button>
                </form>
            </div>
        </div>
    )
}

export default withAuthRedirect(SellOrder)