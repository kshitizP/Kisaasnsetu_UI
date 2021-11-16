import React from 'react';
import Constants from './helpers/constants';
import { CartContext } from './helpers/Contexts';
import CartItem from './subcomponents/CartItem';
import { post } from '../services/ApiServices';
import { create_notification, getAllSelectedCarts } from './helpers/utils';
import { notyf } from './helpers/utils';
import withAuthRedirect from './hoc/WithAuthRedirect';
import { LoadingSpinner } from './subcomponents/commons';

function CartDisplay(props) {

    const { cartState, setCartState } = React.useContext(CartContext);
    const [ isMobile, setIsMobile ] = React.useState(window.innerWidth<=700)
    const [state, setState] = React.useState({loading:false})
    const { cartitems } = cartState;
    const deselected = (() => {
        for(const k in cartState.cartitems){
            if(!cartState.cartitems[k].selected)
                return true
        }
        return false
    })()
    const cart = ( ()=> {
        let total = 0;
        let count = 0
        for(const k in cartitems){
            if(cartitems[k].selected){
                total += parseInt(cartitems[k].product.price)*parseInt(cartitems[k].quantity)
                count+=1
            }
        }
        return {total, count}
    })()
    const handleWindowSize = () => {
        if(window.innerWidth <=700)
                setIsMobile(true)
        else
            setIsMobile(false)
    }

    const handleSelectAll = () => {
        setCartState({
            type:"TOGGLE",
            selected: deselected
        })
    }
    const handleProceed = () => {
        const cartitems = getAllSelectedCarts(cartState)
        if(cartitems.length === 0 &&cartState.cart === 0){
            notyf.open({type: 'warning', message: 'Order list is Empty. Please Continue shopping', background: 'orange'})
        } else if(cartitems.length === 0 && cartState.cart !==0) {
            notyf.open({type: 'warning', message: 'Please select some items', background: 'orange'})
        } else {
            setState({...state, loading:true})
            let shipping_total = {}
            post({cartitems: cartitems}, Constants.SHIPPING_TOTAL_ENDPOINT)
            .then( (response) => {
                if(response !== 'ERROR'){
                    shipping_total = response.data
                    setState({...state, loading:false})
                    const data = {
                        type: "CART",
                        order: {cartitems: cartitems},
                        shipping_total: shipping_total
                    }
                    props.history.push({
                        pathname: '/place_order/address_select',
                        state: data
                    });
                }
            })
        }
    }

    const handleCartChange = (action,key, newVal) => {
        setState({loading: true})
        const data = {}
        switch(action) {
            case "SELECT":
                data[key] = newVal
                setCartState({
                    type: 'SOLOUPDATE',
                    payload: data
                })
                setState({loading: false})
                break
            case "QUANTITY":
                data["action"]= "UPDATE"
                data["cart_id"]= newVal.cart_id
                data["quantity"]= newVal.quantity
                post(data, Constants.CART_UPDATE_ENDPOINT)
                .then( (response) => {
                    if(response && response.data !== Constants.FIXED_ERROR_MSG){
                        notyf.success("Cart Updated")
                        .on('dismiss',setCartState({
                            type: "UPDATE",
                            payload: response.data
                        }))
                    } else {
                        create_notification("ERROR", "Some Error Occured While Updating cart! Please Try Again!")
                    }
                    setState({loading: false})
                })
                break
            case "DELETE":
                data["action"]= "DELETE"
                data["cart_id"]= newVal.cart_id
                post(data, Constants.CART_UPDATE_ENDPOINT)
                .then( (response) => {
                    if(response && response.data !== Constants.FIXED_ERROR_MSG){
                        notyf.success("Cart Updated")
                        .on('dismiss',setCartState({
                            type: "UPDATE",
                            payload: response.data
                        }))
                    } else {
                        create_notification("ERROR", "Some Error Occured While Updating cart! Please Try Again!")
                    }
                    setState({loading: false})
                })
                break
            default: return {}
        }
    };

    React.useEffect( () => {
        window.addEventListener('resize', handleWindowSize);
        post({}, Constants.CART_UPDATE_ENDPOINT)
        .then( (response) => {
            if(response.data!=='ERROR'){
                setCartState({
                    type: 'UPDATE',
                    payload: response.data
                })
            }
        })
        return () => {
            window.removeEventListener('resize', handleWindowSize)
        }
    }, [setCartState])
        return (
                <section className={`cartDataList ${isMobile ? "cartDataList_Mobile":""} ${state.loading ? "disabled_item": ""}`}>
                    { state.loading &&
                        <div className="loadingOverlay">
                            <LoadingSpinner loading={state.loading}/>
                        </div>
                    }
                    <div className="cart__details">
                        <div className="Border__bottom CartHeader">
                            <header className="Heading u-h1 Base-text">
                                {cartState.cart === 0 ? Constants.SHOPPING_CART_EMPTY_TXT : Constants.SHOPPING_CART_TXT}
                            </header>
                            {!(cartState.cart === 0) &&
                            <div className="cartDataList-options">
                                <button className="link-button" onClick={(e) => {handleSelectAll()}}>
                                    <span className="Heading u-h8">
                                        {deselected ? Constants.SELECT_ITEMS_TXT : Constants.DESELECT_ITEMS_TXT}
                                    </span>
                                </button>
                                {!isMobile ? <span className="Heading u-h6">
                                    Price
                                </span> : ""}
                            </div>}
                        </div>
                        {Object.keys(cartitems).map(value => (
                        <CartItem key={value} keyVal={value} value={cartitems[value]} mobileView={isMobile} handleCartChange={handleCartChange}/>
                        ))}
                        {!(cartState.cart === 0) &&
                        <div className="cartTotal">
                            <div className="cartTotal-text  Heading u-h1">
                                {Constants.TOTAL_CART_TXT}
                            </div>
                            <div className="Heading u-h4">
                                {Constants.RUPEE_SYMBOL} {cart.total}
                            </div>
                        </div>}
                    </div>
                    <div className="cart_proceedSection">
                        <div className="cart__finalPrice Heading">
                            <div>
                                {cart.count === 0 ? Constants.CART_NO_SELECTED_TXT : `${Constants.CART_TOTAL_TXT} (${cart.count} items): ${Constants.RUPEE_SYMBOL} ${cart.total}`}
                            </div>
                            <br/>
                            <div className="cart_proceedBtn">
                                <button className="Button" onClick={handleProceed} disabled={state.loading}>Proceed To Buy</button>
                            </div>
                        </div>
                    </div>
                </section>
        );
    
}

export default withAuthRedirect(CartDisplay);