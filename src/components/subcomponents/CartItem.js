import React from 'react';
import QuantitySelector from "./QuantitySelector";
import { Link } from 'react-router-dom';
import '../../styles/ListPage.css'
import Constants from '../helpers/constants';
function CartItem(props) {
    const { keyVal, value, mobileView, handleCartChange } = props;

    const handleChange = (action) => {
        switch(action) {
            case "TOGGLE":
                handleCartChange("SELECT",keyVal, { ...value, selected: !value.selected})
                break;
            case "DELETE":
                handleCartChange("DELETE", keyVal, value)
                break;
            default:
                handleCartChange("QUANTITY", keyVal, {...value, quantity: action})
        }
    }

    if(!mobileView){
        return (
        <div className="cartItem Border__bottom">
            <div className="cartItem-data">
                <div className="cartItem-selection">
                    <div className="cartItem-checkbox">
                        <label className="container">
                            <input type="checkbox" checked={value.selected} onChange={(e)=> handleChange("TOGGLE")}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="cartItem--imageWrapper">
                            <img src={value.product.image} alt={value.product.name} className="cartItem-Image"/>
                    </div>
                </div>
                <div className="cartItem-details">
                    <div className="cartItem-name Heading Heading__other u-h4">
                        <Link to={`/products/product-details/${value.product.slug}`}>
                            {value.product.name}
                        </Link>
                    </div>
                    <div className="cartItem-manage">
                        <span className="cartItem-manage select">
                            <QuantitySelector count={parseInt(value.quantity)} setCount={handleChange}></QuantitySelector>
                        </span>
                        <button onClick={(e) => handleChange("DELETE")} className="cartItem-manage link-button">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="cartItem-priceDetails">
                <span className="cartItem-price">
                {Constants.RUPEE_SYMBOL} {value.product.price}
                </span>
            </div>
        </div>
        )
    } else {
        return (
            <div className="cartItem_Mobile Border__bottom">
                <div className="cartItem_Mobile-data">
                    <div className="cartItem_Mobile-left">
                        <div className="cartItem_Mobile--imageWrapper">
                            <img src={value.product.image} alt={value.product.name} className="cartItem_Mobile-Image"/>
                        </div>
                        <div className="cartItem_Mobile-manage">
                            <QuantitySelector count={parseInt(value.quantity)} setCount={handleChange} mobileView={mobileView}></QuantitySelector>
                        </div>
                    </div>
                    <div className="catItem_Mobile-right">
                        <div className="cartMobile-text">
                            <Link to={`/products/product-details/${value.product.slug}`}>
                                {value.product.name.length > 60 ? value.product.name.substr(0, 60)+"..." : value.product.name}
                            </Link>
                            <div className="cartItem-price">
                                {Constants.RUPEE_SYMBOL} {value.product.price}
                            </div>
                        </div>
                        <div className="cartMobile-text">
                            <button onClick={(e) => handleChange("DELETE")} className="cartItem_Mobile-manage link-button">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cartItem_Mobile-checkbox">
                    <label className="container">
                        <input type="checkbox" checked={value.selected} onChange={(e)=> handleChange("TOGGLE")}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        );
    }
}

export default CartItem;