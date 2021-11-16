import React from 'react';
import logo from '../images/logo.png';
import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from './helpers/Contexts';
import { withAuth } from './hoc/WithAuth';
import { svgHamburger, svgSearch, svgJhola } from './subcomponents/commons';
import { getCustomerType } from './helpers/utils';

function Header(props)  {

    const { authState, sideNavHandle,searchHandle } = props;
    const { cartState } = React.useContext(CartContext);
    let currentLocation = useLocation();
        return (
            <div className="Main_Nav">
                <div className={`Main_Nav--listItems sideNav__hamburger ${sideNavHandle.sideNav ? "opened" : ""}`} onClick={(e)=> {sideNavHandle.setSideNav(!sideNavHandle.sideNav);}}>
                    {svgHamburger()}
                </div>
                <ul className="Main_Nav--listItems Main_Nav--listItemsLeft">
                    <li className="Main_Nav--item"><Link to='/products' className="Base-text Heading u-h4">SHOP</Link></li>
                    <li className="Main_Nav--item"><a href="#learn" className="Base-text Heading u-h4">LEARN</a></li>
                    {getCustomerType() !== 'C' &&<li className="Main_Nav--item"><Link to='/place_sell_request' className="Base-text Heading u-h4">Sell to Us</Link></li>}
                </ul>
                <div className="Main_Nav--logo">
                    <Link to='/'><img src={logo} alt="Kisaan Setu" className="main-logo"/></Link>
                </div>
                <ul className="Main_Nav--listItems Main_Nav--listItemsRight">
                    <li className="Main_Nav--item">
                        <Link to='/cart' className="Base-text Heading u-h8 Icon_mobile">{svgJhola()}<span className="floatingCount u-h6">{cartState.cart > 9 ? "9+" : cartState.cart }</span></Link>
                        <Link to='/cart' className="Base-text Heading u-h5 Icon_desktop">CART ({cartState.cart})</Link>
                    </li>
                    <li className="Main_Nav--item Icon_desktop">
                        {!authState.isAuthenticated &&
                        <Link to={`/login?ref=${currentLocation.pathname}`} className="Base-text Heading u-h5">ACCOUNT</Link> }
                        {authState.isAuthenticated &&
                        <Link to='/dashboard' className="Base-text Heading u-h5">ACCOUNT</Link> }
                    </li>
                    <li className="Main_Nav--item open_search">
                        <span className="Base-text Heading u-h8 Icon_mobile" onClick={() => searchHandle.setSearchOpen(!searchHandle.searchOpen)}>{svgSearch()}</span>
                        <span className="Base-text Heading u-h5 Icon_desktop"  onClick={() => searchHandle.setSearchOpen(!searchHandle.searchOpen)}>SEARCH</span>
                    </li>
                </ul>
            </div>
        );
}

export default withAuth(Header);