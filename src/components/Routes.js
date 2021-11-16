import React from 'react';
import Header from './Header'
import HomePage from './HomePage';
import ProductsListPage from './ProductsListPage';
import ProductDisplayPage from './ProductDisplayPage';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { cartReducer } from './helpers/Reducers'
import { AuthContext, CartContext } from './helpers/Contexts';
import * as utils from './helpers/utils';
import * as services from '../services/ApiServices';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import CartDisplay from './CartDisplay';
import Dashboard from './Dashboard';
import Search from './SearchPage';
import Constants from './helpers/constants';
import PlaceOrder from './PlaceOrder';
import AddressUpdate from './AddressUpdate';
import Footer from './Footer';
import SellOrder from './SellOrder';

function Routes(props) {
      const [cartState, setCartState] = React.useReducer(cartReducer,{cart:0, cartitems: {}})
      const [ sideNav, setSideNav] = React.useState(false);
      const [ searchOpen, setSearchOpen ] = React.useState(false)
      const { authState, setAuthState } = React.useContext(AuthContext);
      let history = useHistory();
      const handleKeyUp = (e) => {
        if(e.keyCode === 13){
          setSearchOpen(false)
          let search = e.target.value;
          search = search.replace(/ /g,"_");
          history.push("/search?s="+search)
        }
      }
      React.useEffect(() => {
      if(authState.isAuthenticated) {
        services.refreshToken()
        .then( (response) => {
          if(response === undefined) {
            setAuthState({
              type: "LOGOUT",
              payload: utils.get_state_from_response(undefined)
          })
          } else {
            services.post({}, Constants.CART_UPDATE_ENDPOINT)
            .then( (response) => {
              if(response && response.data !== 'ERROR')
              setCartState({
                type: 'UPDATE',
                payload: response.data
              })
            })
          }
        })
      }
    }, [authState, setAuthState]);
      return (
            <CartContext.Provider value={{cartState, setCartState}}>
              <Header sideNavHandle={{sideNav, setSideNav}} searchHandle={{searchOpen, setSearchOpen}}/>
              <div className={searchOpen ? "search showOnTop": "Heading search search_hidden showOnTop"}>
                <input type="text" placeholder="Search..." className="Heading searchInput CustomInput" onKeyUp={handleKeyUp}/>
              </div>
              <div className={sideNav || searchOpen ? "Blur Blur_open" : "Blur"} onClick={(e) => {if(sideNav) setSideNav(false);}}>
              </div>
              <div className={sideNav ? "SideBar SideBar__hidden" : "SideBar"}>
                <ul className="SideMenu">
                  <li className="Base-text Heading SideBar--items Border__bottom" onClick={(e) => setSideNav(!sideNav)}><Link to='/products' className="Non_Link">SHOP</Link></li>
                  <li className="Base-text Heading SideBar--items Border__bottom" onClick={(e) => setSideNav(!sideNav)}><a href="#learn" className="Non_Link">LEARN</a></li>
                  {utils.getCustomerType() !== 'C' && <li className="Base-text Heading SideBar--items Border__bottom" onClick={(e) => setSideNav(!sideNav)}><a href="/place_sell_request" className="Non_Link">SELL TO US</a></li>}
                  <li className="Base-text Heading SideBar--items Border__bottom" onClick={(e) => setSideNav(!sideNav)}>
                    {!authState.isAuthenticated &&
                      <Link to='/login' className="Non_Link">ACCOUNT</Link> }
                      {authState.isAuthenticated &&
                      <Link to='/dashboard' className="Non_Link">ACCOUNT</Link> }
                  </li>
                  <li className="Base-text Heading SideBar--items" onClick={(e) => setSideNav(!sideNav)}><a href="https://forms.gle/NyiMffD9zMeWyuBr6">Careers</a></li>
                </ul>
              </div>
              <Switch>
                <Route exact path='/products/categories/:slug?' component={ProductsListPage}></Route>
                <Route exact path='/products/product_details/:slug?' component={ProductDisplayPage}></Route>
                <Route path='/products'><Redirect to='/products/categories'></Redirect></Route>
                <Route path='/search' component={Search}></Route>
                <Route exact path='/login' component={LoginComponent} ></Route>
                <Route exact path='/register' component={RegisterComponent}></Route>
                <Route exact path='/cart' component={CartDisplay}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
                <Route exact path='/address/edit_address' component={AddressUpdate}></Route>
                <Route exact path='/place_order/:order_step' component={PlaceOrder}/>
                <Route exact path='/place_sell_request' component={SellOrder}/>
                <Route exact path='/' component={HomePage}></Route>
                <Route path='*'><Redirect to='/'></Redirect></Route>
              </Switch>
              <div className="footer">
                <Footer/>
              </div>
            </CartContext.Provider>
        );
}

export default Routes;