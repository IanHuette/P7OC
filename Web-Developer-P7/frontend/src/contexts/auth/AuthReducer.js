
import {
    USER_LOGGED_IN
} from "../types";

const AuthReducer = (state, action) => {

    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                userIsLoggedIn: action.payload
            };
        // we return the state as is
        default:
            return state;
    }

}

export default AuthReducer;