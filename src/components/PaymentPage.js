import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { post } from "../services/ApiServices";
import Constants from "./helpers/constants";
import Dictionary from "./helpers/dictionary";
import { getOneLineAddress, notyf } from "./helpers/utils";
import withAuthRedirect from "./hoc/WithAuthRedirect"
import { withOrderStatus } from "./hoc/withOrderStatusHoc";
import { LoadingSpinner } from "./subcomponents/commons";
import OrderSubList from "./subcomponents/OrderSubList";

function PaymentPage(props) {
    let hist = useHistory()
    let paymentMode = "COD"
    const location = useLocation()
    const [state, setState] = useState({loading: false, paymentStatus:'PENDING'})
    if(! location.state)
        hist.push('/cart')
    if(props.orderShown){
        hist.push('/cart')
    }
    const { order, address, shipping_total} = location.state
    const displayData = getOneLineAddress(address)
    
    const handleFinalSubmit = (e) => {
        const finalData = {}
        finalData['type'] = location.state.type
        finalData['order'] = order
        finalData['address'] = address
        finalData['shipping_total'] = shipping_total
        finalData['payment'] = {payment_mode: paymentMode, payment_status: 'SUCCESS'}
        setState({loading:true})
        post(finalData, Constants.PLACE_ORDER_ENDPOINT)
        .then((response)=> {
            if(response.data !== 'ERROR'){
                notyf.success(response.data.msg)
                hist.push({
                    pathname: '/place_order/order_completed',
                    state: {...finalData, paymentStatus: String(response.data.order_status).toUpperCase(), order_id: response.data.order_id}
                })
            }
        })
    }
    return (
        <div className="orderPaymentPage">
            { state.loading &&
            <div className="loadingOverlay">
                <LoadingSpinner loading={state.loading}/>
            </div>
            }
            <div className="orderSummary">
                <div className="orderSummary__header Heading u-h1 Border__bottom">{Dictionary.ORDER_SUMMARY_HEADER_TXT}</div>
                <div className="orderSummary__desc Border__bottom">
                    <OrderSubList values={order.cartitems}></OrderSubList>
                    <div className="orderSummary__delivery Heading u-h2 Base-text">{Dictionary.DELIVERING_TO_TXT}</div>
                    <div className="Address__info">
                        <div className="orderSummary__contactName">{displayData[0]}</div>
                        <div className="orderSummary__address">{displayData[1]}</div>
                        <div className="orderSummary__contactNum">{displayData[2]}</div>
                    </div>
                </div>
                <div className="orderSummary__total" style={{float: 'right'}}><span className="Heading">{Dictionary.TOTAL_AMOUNT_TXT} </span>{Constants.RUPEE_SYMBOL}{parseFloat(shipping_total['total'])} {parseInt(shipping_total['delivery_charge']) === 0? '':"+ " + String(Constants.RUPEE_SYMBOL)+String(shipping_total['delivery_charge']) + "(" + String(Dictionary.DELIVERY_CHARGE_TXT) + ")"}</div>
            </div>
            <div className="paymentDiv">
                <div className="payment__options">
                    <div className="Form_Item">
                        <input type="radio" id="payment_mode_cod" onChange={(e)=>paymentMode="COD"} name="payment_mode" value="COD" required checked/>
                        <label htmlFor="payment_mode_cod" className="text-light">{Dictionary.COD_PAYMENT_TXT}</label>
                        <div className="u-h6">(We will be adding more payment options soon)</div>
                    </div>
                    <div className="Form_Item">
                        <button className="Button" onClick={handleFinalSubmit} disabled={state.loading}>Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuthRedirect(withOrderStatus(PaymentPage));