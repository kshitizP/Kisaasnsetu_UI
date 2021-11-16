import { Redirect, Route, Switch } from 'react-router-dom';
import AddressSelect from './AddressSelect';
import withAuthRedirect from './hoc/WithAuthRedirect';
import PaymentPage from './PaymentPage';
import React from 'react';
import FinalOrderStage from './FinalOrderStage';

function PlaceOrder(props) {
    const [orderShown, setOrderShown] = React.useState(false)
    return (
        <div>
            <Switch>
                <Route exact path='/place_order/address_select'><AddressSelect location={props.location} orderShown={orderShown} setOrderShown={setOrderShown}></AddressSelect></Route>
                <Route exact path='/place_order/payment_page'><PaymentPage location={props.location} orderShown={orderShown} setOrderShown={setOrderShown}/></Route>
                <Route exact path='/place_order/order_completed'><FinalOrderStage location={props.location} orderShown={orderShown} setOrderShown={setOrderShown}/></Route>
                <Route path='/place_order/*'><Redirect to='/cart'/></Route>
            </Switch>
        </div>
    )
}

export default withAuthRedirect(PlaceOrder)