
import {
    USER_LOGGED_IN
} from "../types";

const AuthReducer = (state, action) => {

    console.log("FROM REDUCER", state, action);

    switch (action.type) {
        case USER_LOGGED_IN:
            const newState = {
                ...state,
                userData: action.payload,
                userIsLoggedIn: true
            };
            console.log("FROM REDUCER: NEW STATE =>", newState);
            return newState;
        // we return the state as is
        default:
            return state;
    }

}

export default AuthReducer;