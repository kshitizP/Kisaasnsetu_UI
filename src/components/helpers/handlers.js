import Constants from './constants';
export function handleField(fieldType, value, data) {
    let re;
    switch (fieldType) {
        case "EMAIL":
            re = new RegExp(Constants.emailRegex);
            if (re.test(value) || (value.length === 0 && data.email && data.email.optional !== undefined))
                return { valid: true, errormsg: "" };
            return { valid: false, errormsg: "Email is not valid" };

        case "NAME":
            re = new RegExp(Constants.nameRegex);
            if (re.test(value) || (value.length === 0 && data.name && data.name.optional !== undefined))
                return { valid: true, errormsg: "" };
            return { valid: false, errormsg: "Name should have only alphabets and should be of more than 3 characters" };

        case "PHONE":
            re = new RegExp(Constants.mobileRegex);
            if (re.test(value) || (value.length === 0 && data.phone && data.phone.optional !== undefined))
                return { valid: true, errormsg: "" };
            return { valid: false, errormsg: "Please enter Contact Number without 0 or +91" };

        case "PWD":
            if (value.length >= 8 || (value.length === 0 && data.pwd && data.pwd.optional !== undefined))
                return { valid: true, errormsg: "" };
            return { valid: false, errormsg: "Password should contain atleast 8 characters" };

        case "UNIQID":
            let email = handleField("EMAIL", value, data);
            let phone = handleField("PHONE", value, data);
            if (email.valid || phone.valid)
                return { valid: true, errormsg: "" };
            return { valid: false, errormsg: "Enter correct Email ID or Phone number" };
        default: return { valid: false, errormsg: "Invalid" }
    }

}