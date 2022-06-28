import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import "./Login.css";

class App extends React.Component {

    props: any;
    state: any;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        this.props.login(this.state.username, this.state.password);
    }

    render() {

        if(this.props.app.redirect.go) {
            let path = this.props.app.redirect.path;
            this.props.redirectFunc();
            return (<Redirect to={path}/>);
        }

        return (
            <div>

                <div className="wrapper fadeInDown">
                    <div className='space'></div>
                    <div id="formContent">
                        <div>
                            <h2>Login</h2>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="email" onKeyUp={ (event) => this.setState({...this.state, username: event.target.value} )}/>
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onKeyUp={ (event) => this.setState({...this.state, password: event.target.value} )}/>
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.loginUser}/>
                        </div>
                        <div id="formFooter">
                            <Link to="/">
                                <a className="underlineHover">Home page</a>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);