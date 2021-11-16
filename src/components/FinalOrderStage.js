import React from 'react';
import { useLocation } from "react-router-dom";
import Constants from "./helpers/constants";
import Dictionary from "./helpers/dictionary";
import { getOneLineAddress } from "./helpers/utils";
import withAuthRedirect from "./hoc/WithAuthRedirect";
import OrderSubList from "./subcomponents/OrderSubList";
import success from '../images/success.gif'
import { useEffect } from "react";
function FinalOrderStage(props) {
    const location = useLocation();
    const { order, address, shipping_total, order_id} = location.state;
    const displayData = getOneLineAddress(address)
    useEffect( ()=> {
        props.setOrderShown(true)
    }, [props])
    return (
        <div className="orderPlaced">
            <div className="orderSummary">
                <div>
                    <img src={success} alt="Order Successfully Placed" style={{width:'100px', height: '100px'}}/>
                </div>
                <div className="orderSummary__header Heading u-h1 Border__bottom">Order Placed Successfully <span className="Base-text u-h4">(Order ID: {order_id})</span></div>
                <div className="orderSummary__desc Border__bottom">
                    <OrderSubList values={order.cartitems}></OrderSubList>
                    <div className="orderSummary__delivery Heading Base-text">{Dictionary.DELIVERING_TO_TXT}</div>
                    <div className="Address__info">
                        <div className="orderSummary__contactName">{displayData[0]}</div>
                        <div className="orderSummary__address">{displayData[1]}</div>
                        <div className="orderSummary__contactNum">{displayData[2]}</div>
                    </div>
                </div>
                <div className="orderSummary__total"><span className="Heading">{Dictionary.TOTAL_AMOUNT_TXT} </span>{Constants.RUPEE_SYMBOL}{parseFloat(shipping_total['total'])} {parseInt(shipping_total['delivery_charge']) === 0? '':"+ " + String(Constants.RUPEE_SYMBOL)+String(shipping_total['delivery_charge']) + "(" + String(Dictionary.DELIVERY_CHARGE_TXT) + ")"}</div>
            </div>
        </div>
    )
}

export default withAuthRedirect(FinalOrderStage);