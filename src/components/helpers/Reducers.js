import * as handlers from './handlers';
import * as utils from './utils';

export const loginReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            name: action.payload.name,
            profile: action.payload.profile
            };
  
        case "LOGOUT":
          localStorage.clear();
          return {
            ...state,
            isAuthenticated: false,
            user: null,
            name: null,
            profile: null
          };
        default:
          return state;
    }
  };

export const cartReducer = (state, action) => {
    switch(action.type) {
      case 'UPDATE':
        let formatted_data = utils.format_cart_data(action.payload)
        if(state.cart === 0){
          return {
            cart: Object.keys(formatted_data).length,
            cartitems: formatted_data
          }
        } else {
          for(const item in formatted_data){
            if(state.cartitems[item])
              formatted_data[item].selected = state.cartitems[item].selected
          }
          return {
            cart: Object.keys(formatted_data).length,
            cartitems: formatted_data
          }
        }
      case 'RESET':
        return {
          cart: 0,
          cartitems: {}
        }
      case 'SOLOUPDATE':
        const {payload} = action
        const cartitems = state.cartitems
        return {
          ...state,
          cartitems: {...cartitems, ...payload}
        }
      case 'TOGGLE':
        const value = action.selected
        const newState = {}
        for(const k in state.cartitems){
          newState[k] = state.cartitems[k]
          newState[k].selected = value
        }
        return { ...state,
          cartitems: newState}
      default: return state
    }
};

export const fieldReducer = (state, action) => {
  const status = handlers.handleField(action.type, action.payload, state)
  switch(action.type) {
    case "EMAIL":
    return {
      ...state,
      email: { ...state.email, 
          valid: status.valid,
          errormsg: status.errormsg,
          touched: true
      }
    };
    case "PHONE":
    return {
      ...state,
      phone: { ...state.phone,
        valid: status.valid,
        errormsg: status.errormsg,
        touched: true
      }
    };
    case "PWD":
    return {
      ...state,
      pwd: { ...state.pwd, 
        valid: status.valid,
        errormsg: status.errormsg,
        touched: true
      }
    };
    case "UNIQID":
    return {
      ...state,
      uniqid: { ...state.uniqid, 
        valid: status.valid,
        errormsg: status.errormsg,
        touched: true
      }
    };
    case "NAME":
    return {
      ...state,
      name: { ...state.name, 
        valid: status.valid,
        errormsg: status.errormsg,
        touched: true
      }
    };
    default:
      return {...state};
  }
}