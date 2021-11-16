import React from 'react';
import { getCustomerType, setCustomerType } from '../helpers/utils';
import { Notyf } from 'notyf';
const withCustomer = Component => props => {
    const [cust, setCust] = React.useState()
    React.useEffect( ()=> {
        const notyfOpt = new Notyf({
            duration: 0,
            position: {x: 'center', y: 'center'},
            ripple: true,
            className: 'Heading u-h1',
            types: [
                {
                    type: 'warning',
                    background: 'green'
                },
                {
                    type: 'success',
                    background: '#0465b2',
                    position: {x: 'center', y: 'top'},
                }
            ]
        })
        if(getCustomerType()=== undefined){
        const handleNotyfClick = (value) => {
            notyfOpt.dismissAll()
            setCustomerType(value);
            setCust(value)
        }
        notyfOpt.open({type:'success', message: 'Let us know more about yourself'})
        notyfOpt.open({type: 'warning', message:'<div class="Heading u-h1 userTypeNotyf farmerImg"></div>'}).on('click', ( () => handleNotyfClick('F')))
        notyfOpt.open({type: 'warning', message:'<div class="Heading u-h1 userTypeNotyf customerImg"></div>'}).on('click', ( () => handleNotyfClick('C')))
    }
    return ( ()=> notyfOpt.dismissAll())
    },[])

    return (
            <Component {...{...props}}/>
    );
};

export { withCustomer };