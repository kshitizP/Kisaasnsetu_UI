import React from 'react';
import { fieldReducer } from '../helpers/Reducers';
import Dictionary from '../helpers/dictionary';
import { submitMessage } from '../../services/ApiServices';
import { notyf } from '../helpers/utils';
function MessageForm(props) {

    let nameRef = React.useRef();
    let phoneRef = React.useRef();
    let emailRef = React.useRef();
    let subRef = React.useRef();
    let msgRef = React.useRef()
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
        phone: {
            valid: false,
            errormsg: "required",
            ref: phoneRef,
            touched: false
        }
    };

    const [fieldsState, setFieldsState] = React.useReducer(fieldReducer, initialFieldsState);

    React.useEffect(() => {
        for(const field in fieldsState){
            if(fieldsState[field].touched)
                fieldsState[field].ref.current.setCustomValidity(fieldsState[field].errormsg);
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
        if (String(msgRef.current.value) === ''){
            msgRef.current.setCustomValidity("Required");
            valid = false;
        }

        if(valid){
            let user = {}
            for(const field in fieldsState){
                user[field] = fieldsState[field].ref.current.value
            }
            user['subject'] = subRef.current.value
            user['msg'] = msgRef.current.value
            submitMessage(user)
            .then( (response)=> {
                if(response.data !== 'ERROR')
                    notyf.success(response.message.msg)
                else
                    notyf.error(response.message.msg)
            })
            e.target.reset();
        }
    };
    return (
        <div className="contactDetails">
                    <section className="contactDetails__section">
                        <div className="contactDetails_item1 ContactUs">
                            <header className="Section_Header">
                                <h1 className="contactHeading Heading u-h1 text-invert">{Dictionary.CONTACT_US_LABEL}</h1>
                            </header>
                            <div className="office">
                                <h2 className="officeHeading Heading u-h2 text-invert">{Dictionary.FIND_US_LABEL}:</h2>
                                <span className="officeHeading__Desc Large_amount_text">
                                KISAANSETU INDIA PVT. LTD.<br/>
                                290/8B, NARPAT NAGAR , JARAULI PHASE-1, BARRA , KANPUR NAGAR , UP - 208027
                                </span>
                                <h2 className="officeHeading Heading u-h2 text-invert">{Dictionary.CALL_US_LABEL}:</h2>
                                <span className="officeHeading__Desc Large_amount_text">
                                +919555131643<br/>
                                +919329301202<br/>
                                +919205499656<br/>
                                </span>
                                <h2 className="officeHeading Heading u-h2 text-invert">{Dictionary.EMAIL_US_LABEL}:</h2>
                                <a href="mailto:customercare@kisaansetu.com" style={{color:"inherit"}}><span className="officeHeading__Desc Large_amount_text">
                                customercare@kisaansetu.com
                                </span></a>
                            </div>
                        </div>
                        <div className="contactDetails_item2 GetInTouch">
                            <form method="POST" className="contactForm" onSubmit={handleSubmit}>
                                <header className="Section_Header">
                                    <h1 className="Base-text Heading u-h1">Get In Touch</h1>
                                    <p className="Section_Desc text-light">Please provide following details</p>
                                </header>
                                <div className="Form_Item">
                                    <input autoComplete="on" type="text" ref={nameRef} onChange={(e)=>handleChange("NAME", e)} className="Form__Input" id="name" name="name" placeholder="Name" aria-label="Name"/>
                                    <label htmlFor="name" className="Floating_FormLabel text-light">Name *</label>
                                </div>
                                <div className="Form_Item">
                                    <input autoComplete="on" type="email" ref={emailRef} onChange={(e)=>handleChange("EMAIL", e)} className="Form__Input" id="email" name="email" placeholder="Email" aria-label="Email"/>
                                    <label htmlFor="email" className="Floating_FormLabel text-light">Email</label>
                                </div>
                                <div className="Form_Item">
                                    <input autoComplete="on" type="tel" ref={phoneRef} onChange={(e)=>handleChange("PHONE", e)} className="Form__Input" id="mobile" name="mobile" placeholder="Contact No." aria-label="Contact number"/>
                                    <label htmlFor="mobile" className="Floating_FormLabel text-light">Contact No. *</label>
                                </div>
                                <div className="Form_Item">
                                    <input autoComplete="on" type="text" className="Form__Input" ref={subRef} id="subject" name="subject" placeholder="Subject" aria-label="Query subject"/>
                                    <label htmlFor="subject" className="Floating_FormLabel text-light">Subject</label>
                                </div>
                                <div className="Form_Item">
                                    <textarea className="Form__Input" rows="5" ref={msgRef} id="message" name="message" placeholder="Message" aria-label="Message"></textarea>
                                    <label htmlFor="message" className="Floating_FormLabel text-light">Message *</label>
                                </div>
                                <button type="submit" className="Button Button_Secondary">Send Message</button>
                            </form>
                        </div>
                        
                    </section>
                </div>
    );
}


export default MessageForm;