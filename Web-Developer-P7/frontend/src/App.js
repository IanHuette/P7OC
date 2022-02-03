import React from "react";
import Banner from './components/Banner'
import Posts from './views/Posts';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

const App = () => (
    <Router>
        <Banner />
        <div id="container">
            <Posts />
        </div>
    </Router>
);

export default App