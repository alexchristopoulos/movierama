import * as React from "react";
import { render } from "react-dom";
import App from "./containers/App/App";
import { Provider } from "react-redux";
import store from './store';
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const rootEl = document.getElementById("root");

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <App></App>
                </Route>
                <Route exact path="/login">
                    <Login></Login>
                </Route>
                <Route exact path="/register">
                    <Register></Register>
                </Route>
            </Switch>
        </Router>
    </Provider>
    , rootEl);
