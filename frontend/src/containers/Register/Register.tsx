import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import {
    Link
  } from "react-router-dom";

import "./Register.css";

import { Redirect } from 'react-router-dom';

class Register extends React.Component {

    props: any;
    state: any;

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            retype: ''
        };

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {

        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const password = this.state.password;
        const retype = this.state.retype;

        if(password != retype){
            alert('Passwords do not match');
            return;
        }

        this.props.register(firstname, lastname, email, password);
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
                    <div id="formContentRegister">
                        <div>
                            <h2>Register</h2>
                            <input type="text" id="firstname" className="fadeIn second" name="firstname" placeholder="firstname" onKeyUp={(e) => {this.setState({...this.state, firstname: e.target.value }) }}/>
                            <input type="text" id="lastname" className="fadeIn second" name="lastname" placeholder="lastname" onKeyUp={(e) => {this.setState({...this.state, lastname: e.target.value }) }}/>
                            <input type="text" id="email" className="fadeIn second" name="email" placeholder="email" onKeyUp={(e) => {this.setState({...this.state, email: e.target.value }) }}/>
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onKeyUp={(e) => {this.setState({...this.state, password: e.target.value }) }}/>
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="Retype password" onKeyUp={(e) => {this.setState({...this.state, retype: e.target.value }) }}/>
                            <input type="submit" className="fadeIn fourth" value="Register" onClick={this.registerUser}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);