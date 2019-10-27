import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';
import signup from "./signup";
import Home from "./home";
// import Profile from "./profile";

export default() => {
    return(
        <Router>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={signup} />
            <Route path="/home" component={Home} />
            {/* <Route path="/profile" component={Profile} /> */}
        </Router>
    );
}