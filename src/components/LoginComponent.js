import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { parseQuery } from './helpers/utils';
import { AuthContext } from './helpers/Contexts';
import { fieldReducer } from './helpers/Reducers';
import * as services from '../services/ApiServices'; 
import * as utils from './helpers/utils';
import '../styles/AuthPage.css';
import Constants from './helpers/constants';
import Cookies from 'js-cookie';
function LoginComponent(props) {

    const { authState, setAuthState } = React.useContext(AuthContext);
    const from = React.useRef(String(parseQuery(props.location.search).ref));
    let uniqidRef = React.useRef();
    let pwdRef = React.useRef();

    const initialFieldsState = {
        uniqid: {
            valid: false,
            errormsg: "required",
            ref: uniqidRef,
            touched: false,
        },
        pwd: {
            valid: false,
            errormsg: "required",
            ref: pwdRef,
            touched: false
        }
    };
    const [ fieldsState, setFieldsState ] = React.useReducer(fieldReducer, initialFieldsState);

    React.useEffect(() => {
            if(Cookies.get('userinfo')){
                utils.notyf.error('Session has expired. Please Login Again to continue!')
            }
    }, []);

    const handleChange = (fieldType, e) => {
        // e.target.setCustomValidity(e.target.value)
        setFieldsState({
            type: fieldType,
            payload: e.target.value.trim()
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        for(const field in fieldsState){
            if(fieldsState[field].valid===null || !fieldsState[field].valid){
                valid = false;
            }
        }
        if(valid){
            let user = {}
            for(const field in fieldsState){
                user[field] = fieldsState[field].ref.current.value
            }
            services.loginUser({user: user}, Constants.LOGIN_ENDPOINT)
            .then( (response) => {
                if(response.data !== 'ERROR'){
                    const userdata = response.data.user;
                    if(userdata){
                        setAuthState({
                            type: "LOGIN",
                            payload: utils.get_state_from_response(userdata)
                        })
                    }
                }
            });
        }
    };
    if(authState.isAuthenticated){
        return <Redirect to={from.current.trim()}/>
    }
    else 
        return (
        <div className="Forms">
            <div className="AuthForm Login">
                <form method="POST" className="LoginForm" onSubmit={handleSubmit}>
                    <header className="Section_Header">
                        <h1 className="Login_Heading Heading u-h1">Login</h1>
                        <p className="Section_Desc">Please enter your User ID and password:</p>
                    </header>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={uniqidRef} type="text" id="uniqid" name="uniqid" autoComplete="on" placeholder="Email or Phone" onChange={(e)=>handleChange("UNIQID", e)} aria-label="Email or Phone" autoFocus/>
                        <label htmlFor="uniqid" className="Floating_FormLabel text-light">Email/Phone</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={pwdRef} type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e)=>handleChange("PWD", e)} aria-label="Password" autoComplete="on"/>
                        <label htmlFor="pwd" className="Floating_FormLabel text-light">Password</label>
                    </div>
                    <button type="submit" className="Button Login_Submit">Login</button>
                    <div className="LoginForm_Hint">
                        <span className="text-light">Don't have an account? </span>
                        <Link to={`/register?ref=${from.current}`} className="Base-text Heading em-less">Create one</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;