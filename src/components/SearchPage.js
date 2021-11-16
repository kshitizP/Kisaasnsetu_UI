import React from 'react';
import { parseQuery } from './helpers/utils';
import { get } from '../services/ApiServices';
import Constants from './helpers/constants';
import { LoadingSpinner } from './subcomponents/commons';
import Product from './subcomponents/Product';

function Search(props) {
    const [state, setState] = React.useState({loading: true, products: []})

    React.useEffect( ()=> {
            get({slug:parseQuery(props.location.search)['s']}, Constants.SEARCH_ENDPOINT)
            .then( (response) => {
                if(response.data && response.data !== 'ERROR') {
                    setState({
                        loading: false,
                        products: response.data
                    })
                }
            })
    }, [props.location.search])
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
                        <Product key={index} data={value} component={'product'}/>
                     )
                    })
                 }
             </div>
             </div>
            }
            {state.products.length === 0 && !state.loading &&
                <div className="Heading u-h1">No Results for - {parseQuery(props.location.search)['s']}</div>
            }
        </div>
    );
}

export default Search;