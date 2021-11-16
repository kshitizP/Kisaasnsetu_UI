import React from 'react';
import { LoadingSpinner } from './subcomponents/commons';
import { CartContext} from './helpers/Contexts';
import QuantitySelector from './subcomponents/QuantitySelector';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/Products.css';
import * as services from '../services/ApiServices';
import { create_notification } from './helpers/utils';
import Constants from './helpers/constants';
import { withAuth } from './hoc/WithAuth'
import { notyf } from './helpers/utils';
import { withCustomer } from './hoc/WithCustomer';

function ProductDisplayPage(props) {
    const { authState } = props;
    const [state, setState] = React.useState({loading: true, product: {}})
    let history = useHistory();
    if(props.match.params.slug === undefined){
        history.push('/products/categories/')
    }
    let currentLocation = useLocation();
    const { setCartState } = React.useContext(CartContext);
    const [count, setCount] = React.useState(1);
    React.useEffect( ()=> {
        if(props.match.params.slug) {
            services.get({slug: props.match.params.slug}, Constants.PRODUCT_ENDPOINT)
            .then( (response) => {
                if(response.data !== Constants.FIXED_ERROR_MSG){
                    setState({loading: false, product: response.data})
                } else {
                    create_notification('ERROR',Constants.DEFAULT_ERROR_MSG)
                }
            })
        }
    },[props.match.params.slug, ])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(authState.isAuthenticated) {
            setState({...state, loading:true})
            const count = e.target.elements.quantity.value;
            const data = {
                action: "CREATE",
                product_id: state.product.product_id,
                quantity: count
            }
            services.post(data, Constants.CART_UPDATE_ENDPOINT)
            .then( (response) => {
                if(response && response.data !== 'ERROR'){
                    notyf.success(Constants.ADDED_TO_CART_MSG)
                    .on('dismiss',
                    setCartState({
                        type: 'UPDATE',
                        payload: response.data
                    }))
                    setState({...state, loading:false})
                }
            })
            setCount(1);
        } else {
            history.push(`/login?ref=${currentLocation.pathname}`);
        }
    };

    const handleBuyNow = (e) => {
        const cartitems = [{quantity: count, product: state.product}]
        setState({...state, loading:true})
        let shipping_total = {}
        
        services.post({cartitems: cartitems}, Constants.SHIPPING_TOTAL_ENDPOINT)
        .then( (response) => {
            if(response !== 'ERROR'){
                shipping_total = response.data
                setState({...state, loading:false})
                const data = {
                    type: "DIRECT",
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
    return (
        <div>
        { state.loading &&
            <div className="loadingOverlay">
                <LoadingSpinner loading={state.loading}/>
            </div>
        }
        <div className="ProductData">
            <section className="ProductData--main">
                <div className="ProductData--sections">
                    <div className="ProductData--section leftSection">
                        <img src={state.product.image} className="ProductData--image" alt={`${state.product.name}`}/>
                    </div>
                    <div className="ProductData--section rightSection">
                        <div className="ProductData--productMetaData">
                            <h1 className="ProductData--title Heading u-h1">{state.product.name}</h1>
                            <div className="ProductData--priceTag">
                                <span className="Base-text Heading u-h4">₹ {state.product.price}</span>
                            </div>
                        </div>
                        <form method="POST" acceptCharset="UTF-8" encType="multipart/form-data"  onSubmit={handleSubmit}>
                            <input type="hidden" value={state.product.product_id} name="product_id"/>
                            <span className="Quantity__Label">Quantity:</span>
                            <QuantitySelector {...{count: count, setCount: setCount}}></QuantitySelector>
                            <div>
                                <button id="addCartBtn" type="submit" className="Button ProductForm__AddToCart" disabled={state.loading}>Add to Cart</button>
                            </div>
                            <br/>
                            <div>
                                <input id="buyBtn" type="button" onClick={handleBuyNow} className="Button ProductForm__AddToCart" value="Buy Now" disabled={state.loading}/>
                            </div>
                        </form>
                        <div className="ProductDetail">
                            <div className="ProductDetail__Description Large_amount_text u-h4">
                                {state.product.description}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
}

export default withCustomer(withAuth(ProductDisplayPage));