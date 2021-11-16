import React from 'react';
import { AuthContext } from '../helpers/Contexts';
import { useLocation, Redirect } from 'react-router-dom';

const withAuthRedirect = Component => props => {
    const { authState, setAuthState } = React.useContext(AuthContext);
    const loc = useLocation();
    if(!authState.isAuthenticated){
        return <Redirect to={`/login?ref=${loc.pathname}`}/>
    }
    return (
            <Component {...props} authState={authState} setAuthState={setAuthState}/>
    );
};

export default withAuthRedirect;