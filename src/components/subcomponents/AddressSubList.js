import Constants from "../helpers/constants";
import '../../styles/Payments.css';
import { useHistory } from "react-router-dom";
function AddressSubList(props) {
    const { data, handleSelect, automode } = props;
    const hist = useHistory()
    const handle = (e,data) => {
        if(automode){
            hist.push({
                pathname: '/address/edit_address',
                state: {address: data, ref: '/dashboard'}
            });
        } else {
            handleSelect(e, data)
        }
    }
    if(data.length === 0){
        return (<div className="u-h1">No Addresses to Show</div>)
    }
    return (
        <div className="Address__main">
                {
                    data.map((value, index) => {
                        return (
                            <div key={index} className="Address__item">
                                <div className="Address__info u-h5">
                                    <span className="Address__name Heading u-h4">{value.contact_name ? value.contact_name : "<br/>"}</span><br/>
                                    <span>{value.address_line1}</span><br/>
                                    <span>{value.address_line2}</span><br/>
                                    <span>{String(value.city) + ', ' + String(value.state) + ', ' + String(value.pincode)}</span><br/>
                                    <span>{value.country}</span><br/>
                                    <span>{value.contact_num}</span><br/>
                                    <br/>
                                    <button className="Button" style={{display: "inline-flex"}} onClick={(e)=>handle(e, value)}>{(handleSelect && handleSelect !== undefined) ? Constants.DELIVER_TO_BTN_TXT : "Edit this address"}</button>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    )
}

export {AddressSubList}