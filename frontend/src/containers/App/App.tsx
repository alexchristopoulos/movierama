import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import HomeGuest from '../HomeGuest/HomeGuest';
import HomeUser from '../HomeUser/HomeUser';
import Loader from '../Loader/Loader';
import api from '../../api';
import './App.css';
import { Redirect } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  props:any;

  constructor(props) {
    super(props);
}

  render() {

    if(this.props.app.redirect.go) {
      let path = this.props.app.redirect.path;
      this.props.redirectFunc();
      return (<Redirect to={path}/>);
  }

    if(this.props.app.status == 1) {
      //this.props.setGuestStatus();//reset auth status to check token again on page reload
      return <HomeUser></HomeUser>;
    }
    let token = localStorage.getItem('token');
    
    if(token) {
      this.props.isAuthenticated(token);

      return (<Loader/>);

    } else {
      return <HomeGuest></HomeGuest>
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);