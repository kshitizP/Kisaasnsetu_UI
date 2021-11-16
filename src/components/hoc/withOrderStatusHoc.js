import { Redirect } from "react-router-dom";

const withOrderStatus = Component => props => {
    if(props.location.state === undefined || props.orderShown){
        return <Redirect to={`/cart`}/>
    }
    return (
            <Component {...props}/>
    );
};

export {withOrderStatus};