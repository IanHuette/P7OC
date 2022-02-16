
// this file is meant to host our global app' state for everything that's related to authentication

import React, {useReducer} from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
    USER_LOGGED_IN
} from "../types";

const AuthState = props => {

    const initialState = {
        userIsLoggedIn: false,
        userData: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // SO actions
    const logUserIn = (userData) => {
        dispatch({type: USER_LOGGED_IN, payload:userData});
    };
    // EO actions

    return <AuthContext.Provider
        value={{
            userIsLoggedIn: state.userIsLoggedIn,
            userData: state.userData,
            // actions
            logUserIn
        }}
    >
        {props.children}
    </AuthContext.Provider>;

};

export default AuthState;