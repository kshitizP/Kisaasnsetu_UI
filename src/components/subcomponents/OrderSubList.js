import { Link } from "react-router-dom"
import Constants from "../helpers/constants"
import Dictionary from "../helpers/dictionary"
import { getOneLineAddress } from "../helpers/utils"

function OrderSubList(props) {
    let values = []
    let displayAdd = false;
    let address = []
    if(props.values)
        values = props.values
    if(props.displayAdd){
        displayAdd = true
    }
    if(values.length === 0){
        return (<div className="u-h1">No Orders to Show</div>)
    }
    return (
        <div>
            {values.map((value, index) => {
                if(displayAdd)
                    address = getOneLineAddress(value.order.address)
                return(            
                    <div className="orderItem Border__bottom" key={index}>
                        {displayAdd && <span>Order ID: {value.order.order_id}</span>}
                        <div className="orderItem__data">
                            <div className="orderItem__imageWrapper">
                                <img src={value.product.image} alt={value.product.name} className="orderItem__Image"/>
                            </div>
                            <div className="orderItem__details">
                                <div className="orderItem-text">
                                    <Link to={`/products/product-details/${value.product.slug}`} className="u-h4">
                                        {value.product.name}
                                    </Link>
                                    <div className="orderItem-price">
                                        {Constants.RUPEE_SYMBOL} {parseFloat(value.product.price) * parseInt(value.quantity)}
                                    </div>
                                    <div className="orderItem-Quantity">
                                        {Dictionary.ORDER_QUANTITY_LABEL}: {value.quantity}
                                    </div>
                                </div>
                                {displayAdd && <div>
                                    <div className="Heading u-h6">{Dictionary.DELIVERING_TO_TXT}</div>
                                    <div>{String(address[0]) + ", " + String(address[1])}</div>
                                </div>}
                            </div>
                        </div>
                    </div>
            )})}
        </div>
    )
}

export default OrderSubList