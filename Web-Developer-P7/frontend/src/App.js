import React, {useContext, useEffect} from "react";
import Banner from './components/Banner';
import Posts from './views/Posts';
import LoginSignup from './views/LoginSignup';
import AuthState from "./contexts/auth/AuthState";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {

    return <AuthState>
        <Router>
            <Banner />
            <div id="container">
                <Routes>
                    <Route path="/signup" element={<LoginSignup />} />
                    <Route path="/login" element={<LoginSignup/>} />
                    <Route index element={<Posts />} />
                </Routes>
            </div>
        </Router>
    </AuthState>;
};
export default App