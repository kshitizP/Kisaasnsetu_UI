import React from 'react';
import Routes from './components/Routes';
import { AuthContext } from './components/helpers/Contexts';
import { loginReducer } from './components/helpers/Reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as utils from './components/helpers/utils';
import 'notyf/notyf.min.css';
import './App.css';

function App() {

  const userinfo = Cookies.getJSON('userinfo')
  const initialState = utils.get_state_from_response(userinfo)
  const [authState, setAuthState] = React.useReducer(loginReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState
      }}>
        <Router>
          <Routes/>
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
