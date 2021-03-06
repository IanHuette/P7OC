// ✅ savoir si l'utilisateur est connecté ou non (userLoggedIn): useContext 
// ✅ si userLoggedIn est false, vérifier si on des infos user dans le local storage
// ✅ récupérer depuis le localStorage le token + le user id
// ✅ envoyer le token + user id auprès du backend 
// ✅ on clear le local storage SI 

import axios from "axios";

const checkAuth = (userLoggedIn) => {

    const storedUserData = localStorage.getItem("userData");
    const userDataParsed = JSON.parse(storedUserData) != null ? JSON.parse(storedUserData): null;
    let userObj = userDataParsed != null && userDataParsed.token && userDataParsed.userId && userDataParsed.username ? {
        userData: userDataParsed,
        userIsLoggedIn: true
    }: {
        userData: null,
        userIsLoggedIn: false
    };

    if(!userLoggedIn && userObj.userData && userObj.userData.userId && userObj.userData.username != null) {
        // TODO react env var for localhost
        try {
            const APIResponse = axios.get("http://localhost:8080/api/auth/check/?userId="+userObj.userData.userId+"&username="+userObj.userData.username, {
                headers: {
                    'Authorization': 'Bearer ' + userObj.userData.token
                }
            }); 
            userObj = {
                userData: APIResponse.data.message,
                userIsLoggedIn: APIResponse.data.success
            };
        } catch (err) {}
    }
    if (!userObj.userIsLoggedIn) {
        userObj = {
            userIsLoggedIn: false,
            userData: null
        };
        localStorage.removeItem("userData");
    }
    return userObj;
};

export default checkAuth;