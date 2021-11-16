import { useState } from "react";
import Constants from "../helpers/constants";

function AddressForm(props) {
    const {address, handleUpdate} = props;
    const addressTypes = [
        {
            name: "Select and Address Type",
            value: ""
        },
        {
            name: "Home (7am - 9pm delivery)",
            value: "HOME"
        },
        {
            name: "Work (10am - 6pm delivery)",
            value: "WORK"
        }
    ]
    const initialState = (() => {
        let state = {}
        if(address && address !== undefined){
            state['existing'] = true;
            state['country'] = {value:address.country, required: true, }
            state['contact_name'] = {value:address.contact_name, required: true, }
            state['contact_num'] = {value:address.contact_num, required: true, }
            state['pincode'] = {value: address.pincode, required: true, }
            state['address_line1'] = {value: address.address_line1, required: true, }
            state['address_line2'] = {value: address.address_line2, required: true, }
            state['landmark'] = {value: address.landmark, required: false, }
            state['city'] = {value: address.city, required: true, }
            state['state'] = {value: address.state, required: true, }
            state['address_type'] = {value: address.address_type, required: true, }
        } else {
            state['existing'] = false;
            state['country'] = {value:"India", required: true, }
            state['contact_name'] = {value:"", required: true, }
            state['contact_num'] = {value:"", required: true, }
            state['pincode'] = {value:"", required: true, }
            state['address_line1'] = {value:"", required: true, }
            state['address_line2'] = {value:"", required: true, }
            state['landmark'] = {value:"", required: false, }
            state['city'] = {value:"", required: true, }
            state['state'] = {value:"", required: true, }
            state['address_type'] = {value:"", required: true, }
        }
        return state;
    })()
    const [add, setAdd] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault();
        let validity = true;
        Object.keys(add).forEach( (value, index)=> {
            if(!(String(value) === 'existing' || String(value) === 'landmark')){
                if(String(add[value].value) === ""){
                    validity=false;
                    return;
                }
            }
        })
        if(validity){
            handleUpdate(add, address)
        }
    }

    const handleChange = (e) => {
        let currentAdd = {...add}
        currentAdd[e.target.name].value = e.target.value;
        setAdd(currentAdd)
    }

    return (
        <div className="addAddress__page">
            <form onSubmit={handleSubmit}>
                <div className="Form_Item">
                    <select value="India" disabled className="Form__Input" id="country" name="country" placeholder="Country" aria-label="country" required={add['country'].required}>
                        <option value="India">India</option>
                    </select>
                    <label htmlFor="country" className="Floating_FormLabel text-light">Country</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="contact_name" name="contact_name" onChange={handleChange} placeholder="Full Name" value={add['contact_name'].value} aria-label="Full Name" required={add['contact_name'].required}/>
                    <label htmlFor="contact_name" className="Floating_FormLabel text-light">Full Name</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="contact_num" name="contact_num" onChange={handleChange} placeholder="10-digit mobile Number without prefixes" value={add['contact_num'].value} aria-label="10-digit mobile Number without prefixes" required={add['contact_num'].required}/>
                    <label htmlFor="contact_num" className="Floating_FormLabel text-light">Contact Number</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="pincode" name="pincode" onChange={handleChange} placeholder="6 digits PIN Code" value={add['pincode'].value} aria-label="6 digits PIN Code" required={add['pincode'].required}/>
                    <label htmlFor="pincode" className="Floating_FormLabel text-light">PIN Code</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="address_line1" name="address_line1" onChange={handleChange} placeholder="Flat, House no., Building, Company, Apartment" value={add['address_line1'].value} aria-label="Flat, House no., Building, Company, Apartment" required={add['address_line1'].required}/>
                    <label htmlFor="address_line1" className="Floating_FormLabel text-light">Flat, House No.</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="address_line2" name="address_line2" onChange={handleChange} placeholder="Area, Street, Village" value={add['address_line2'].value} aria-label="Area or Village" required={add['address_line2'].required}/>
                    <label htmlFor="address_line2" className="Floating_FormLabel text-light">Area</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="landmark" name="landmark" onChange={handleChange} placeholder="Landmark" aria-label="Landmark" value={String(add['landmark'].value)==="null" || String(add['landmark'].value)==="None"?"":String(add['landmark'].value)} required={add['landmark'].required}/>
                    <label htmlFor="landmark" className="Floating_FormLabel text-light">Landmark (optional)</label>
                </div>
                <div className="Form_Item">
                    <input type="text" className="Form__Input" id="city" name="city" onChange={handleChange} placeholder="City" value={add['city'].value} aria-label="City" required={add['city'].required}/>
                    <label htmlFor="city" className="Floating_FormLabel text-light">City</label>
                </div>
                <div className="Form_Item">
                    <select defaultValue={add['state'].value} className="Form__Input" id="state" name="state" onChange={handleChange} placeholder="State" aria-label="State" required={add['state'].required}>
                        <option value="">Select a State</option>
                        {Constants.LIST_OF_STATES.map((value, index) => {
                            return (
                                <option key={index} value={value.value}>{value.name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="state" className="Floating_FormLabel text-light">State</label>
                </div>
                <br/>
                <div className="Form_Item">
                    <select defaultValue={String(add['address_type'].value).toUpperCase()} className="Form__Input" id="address_type" name="address_type" onChange={handleChange} placeholder="Select an Address Type" aria-label="Select an Address Type" required={add['address_type'].required}>
                        {
                            addressTypes.map( (value, index)=>{
                                return (
                                    <option key={index} value={value.value}>{value.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="address_type" className="Floating_FormLabel text-light">State</label>
                </div>
                <button id="submitBtn" type="submit" className="Button">{add.existing ? "Update Address" : "Add Address"}</button>
            </form>
        </div>
    )

}

export {AddressForm}