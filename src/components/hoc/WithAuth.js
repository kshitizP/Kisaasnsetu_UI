import React from 'react';
import { AuthContext } from '../helpers/Contexts';

const withAuth = Component => props => {
    const { authState, setAuthState } = React.useContext(AuthContext);
    return (
            <Component {...{...props, authState, setAuthState}}/>
    );
};

export { withAuth };