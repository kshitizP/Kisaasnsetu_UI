import React from 'react';
import { svgDecrease, svgIncrease } from './commons';
import { create_notification } from '../helpers/utils';
function QuantitySelector(props) {
    const {count, setCount, mobileView} = props
    
    const handleClick = (c) => {
        c = String(c)
        if(c && !isNaN(c))
            c = parseInt(c)
        else
            c = 1
        if((c<1 ||c >999) || c === count){
            create_notification("ERROR", "Invalid Quantity")
        } else if(c>999) {
            setCount(999);
        } else {
            setCount(c);
        }
    };

    return (
        <div className="ProductForm__QuantitySelector">
            <div className="QuantitySelector">
                <span className={`Quantity_change Quantity__decrease ${mobileView ? "Quantity_change-small" : ""}`} onClick={() => handleClick(count-1)}>
                    {svgDecrease()}
                </span>
                <input type="text" className={`QuantitySelector__quantityValue u-h5 ${mobileView ? "QuantitySelector__quantityValue-small" : ""}`} onChange={ (e) => handleClick(e.target.value)} pattern="[0-9]{1,3}" name="quantity" value={count}/>
                <span className={`Quantity_change Quantity__increase ${mobileView ? "Quantity_change-small" : ""}`} onClick={() => handleClick(count+1)}>
                    {svgIncrease()}
                </span>
            </div>
        </div>
    );
}

export default QuantitySelector;