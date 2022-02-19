// REDUCER EST LA FONCTION QUI SE CHARGE DE METTRE A JOUR LE STATE EN FONCTION D'UN TYPE D'ACTION
import {
    USER_LOGGED_IN
} from "../types";

const AuthReducer = (state, action) => {

    switch (action.type) {
        case USER_LOGGED_IN:
            const newState = {
                ...state,
                userData: action.payload,
                userIsLoggedIn: true
            };
            return newState;
        // On retourne l'état non modifié si le type d'action n'est pas reconnu
        default:
            return state;
    }

}

export default AuthReducer;