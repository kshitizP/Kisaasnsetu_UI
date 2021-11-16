import React from 'react';
import { parseQuery } from './helpers/utils';
import { AuthContext } from './helpers/Contexts';
import { useHistory } from 'react-router-dom';
import { fieldReducer } from './helpers/Reducers';
import * as services from '../services/ApiServices';
import * as utils from './helpers/utils';
import '../styles/AuthPage.css';
import Constants from './helpers/constants';
import {notyf} from './helpers/utils';

function RegisterComponent(props) {
    // Will need to refactor the code to remove redundancy
    const { authState, setAuthState } = React.useContext(AuthContext);
    let history = useHistory();
    const from = parseQuery(props.location.search).ref;
    let nameRef = React.useRef();
    let phoneRef = React.useRef();
    let emailRef = React.useRef();
    let pwdRef = React.useRef();
    let user_type="C"

    const initialFieldsState = {
        name: {
            valid: false,
            errormsg: "required",
            ref: nameRef,
            touched: false
        },
        email: {
            valid: true,
            errormsg: "",
            ref: emailRef,
            optional: true,
            touched: false
        },
        pwd: {
            valid: false,
            errormsg: "required",
            ref: pwdRef,
            touched: false
        },
        phone: {
            valid: false,
            errormsg: "required",
            ref: phoneRef,
            touched: false
        }
    };
    const [ fieldsState, setFieldsState ] = React.useReducer(fieldReducer, initialFieldsState);

    React.useEffect(() => {
        if(authState.isAuthenticated){
            if(from.trim()==="" || from.search("login")===-1)
                history.push("/");
            else
                history.push(from.trim());
        }
        else {
            for(const field in fieldsState){
                if(fieldsState[field].touched)
                    fieldsState[field].ref.current.setCustomValidity(fieldsState[field].errormsg);
            }
        }
    });

    const handleChange = (fieldType, e) => {
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
            user['user_type'] = user_type
            services.loginUser({user: user}, Constants.REGISTER_ENDPOINT)
            .then( (response) => {
                if(response.data!=='ERROR'){
                    const userdata = response.data.user;
                    if(userdata){
                        notyf.success("Registration Success")
                        setAuthState({
                            type: "LOGIN",
                            payload: utils.get_state_from_response(userdata)
                        })
                    }
                }
            });
        }
    };
    
    return (
        <div>
            <div className="AuthForm Register">
                <form method="POST" className="RegisterForm" onSubmit={handleSubmit}>
                    <header className="Section_Header">
                        <h1 className="Register_Heading Heading u-h1">Register</h1>
                        <p className="Section_Desc">Please provide following details</p>
                    </header>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={nameRef} type="text" id="name" name="name" placeholder="Name" onChange={(e)=>handleChange("NAME", e)} autoComplete="on"/>
                        <label htmlFor="name" className="Floating_FormLabel text-light">Name</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={phoneRef} type="tel" id="mobile" name="mobile" placeholder="Mobile" onChange={(e)=>handleChange("PHONE", e)} autoComplete="on"/>
                        <label htmlFor="mobile" className="Floating_FormLabel text-light">Mobile</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={emailRef} type="text" id="email" name="email" onChange={(e)=>handleChange("EMAIL", e)} placeholder="Email (optional)" autoComplete="on"/>
                        <label htmlFor="email" className="Floating_FormLabel text-light">Email</label>
                    </div>
                    <div className="Form_Item">
                        <input className="Form__Input" ref={pwdRef} type="password" id="pwd" name="pwd" onChange={(e)=>handleChange("PWD", e)} placeholder="Password" autoComplete="on"/>
                        <label htmlFor="pwd" className="Floating_FormLabel text-light">Password</label>
                    </div>
                    <div className="Form_Item">
                        <div style={{float: 'left', display: 'inline'}}>
                            <input type="radio" onChange={(e) => user_type="F"} id="user_farmer" name="user_type" value="F" required/>
                            <label htmlFor="user_farmer" className="text-light">Farmer</label>
                        </div>
                        <div style={{float: 'right', display: 'inline'}}>
                            <input type="radio" onChange={(e) => user_type="C"} id="user_customer" name="user_type" value="C" required checked/>
                            <label htmlFor="user_customer" className="text-light">Customer</label>
                        </div>
                        <br/>
                    </div>
                    <button type="submit" className="Button Register_Submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterComponent;