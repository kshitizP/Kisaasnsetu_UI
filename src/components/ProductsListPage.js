import React from 'react';
import '../styles/Products.css';
import Product from './subcomponents/Product';
import { LoadingSpinner } from './subcomponents/commons';
import Constants from './helpers/constants';
import * as services from '../services/ApiServices';
import { create_notification } from './helpers/utils';
import { withCustomer } from './hoc/WithCustomer';

function ProductsListPage(props) {
    const [ state, setState ] = React.useState({loading: true, products: []})
    const get_component_type = () => {
        return props.match.params.slug !== undefined ? 'product': 'category'
    }
    React.useEffect( () =>{
    if(props.match.params.slug === undefined){
        services.get({},Constants.CATEGORY_LIST_ENDPOINT)
        .then( (response) => {
            if(response.data !== Constants.FIXED_ERROR_MSG){
                setState({loading:false, products:response.data})
            } else {
                create_notification('ERROR', Constants.DEFAULT_ERROR_MSG)
            }
        })
    } else {
        services.get({slug: props.match.params.slug},Constants.PRODUCTS_BY_CATEGORY_ENDPOINT)
        .then( (response) => {
            if(response.data !== Constants.FIXED_ERROR_MSG){
                setState({loading:false, products:response.data})
            } else {
                create_notification('ERROR', Constants.DEFAULT_ERROR_MSG)
            }
        })
    }
},[props.match.params.slug]);
        return (
            <div>
                { state.loading &&
                    <div className="loadingOverlay">
                        <LoadingSpinner loading={state.loading}/>
                    </div>
                }
                {!state.loading &&
                <div className="product__container">
                 <div className="productGrid">
                     { state.products.map((value, index ) => {
                         return(
                            <Product key={index} data={value} component={get_component_type()}/>
                         )
                        })
                     }
                 </div>
                 </div>
                }
            </div>
        );
}

export default withCustomer(ProductsListPage);