import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import { Link } from 'react-router-dom';
import './TopBar.css'
class TopBar extends React.Component {

  props: any;


  constructor(props) {
    super(props);
    this.sortMovies = this.sortMovies.bind(this);
    this.getByAuthor = this.getByAuthor.bind(this);
  }

  sortMovies(event){
    const sortBy = event.target.getAttribute('sort-by');//0 by likes (), 1 by hates (), 2 by date published (publishedAt)
    const token = this.props.app.user.token;
    
    if(token){
      this.props.getMoviesSorted(sortBy, token);
    } else {
      this.props.getMoviesSorted(sortBy);
    }
  }

  getByAuthor(event){
    const author = this.props.app.user.email;
    this.props.getMoviesByAuthor(author, this.props.app.user.token);
  }

  render() {
    return this.props.app.status == 0?(
      /**
       * guest user top bar
       */
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand">MOVIERAMA</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <a className="nav-link active" aria-current="page">Sort movies by</a>
              </li>
              <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="0" onClick={this.sortMovies}>Likes</a>
                  </li>
                <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="1" onClick={this.sortMovies}>Hates</a>
                </li>
                <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="2" onClick={this.sortMovies}>Date published</a>
                </li>
              </ul>
              <ul className="d-flex navbar-nav">
              <Link to="/register">
                  <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page">Register</a>
                  </li>
                </Link>
                <Link to="/login">
                  <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page">Login</a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>):
      /**
       * logged in user topbar
       */
      (<div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand">MOVIERAMA</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <a className="nav-link active" aria-current="page">Sort movies by</a>
              </li>
              <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="0" onClick={this.sortMovies}>Likes</a>
                  </li>
                <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="1" onClick={this.sortMovies}>Hates</a>
                </li>
                <li className="nav-item nav-item-action">
                    <a className="nav-link active" aria-current="page" sort-by="2" onClick={this.sortMovies}>Date published</a>
                </li>
              </ul>
              <ul className="d-flex navbar-nav">
                  <li className="nav-item nav-item-action"> 
                    <a className="nav-link active" aria-current="page" onClick={this.getByAuthor}>{this.props.app.user.firstname} {this.props.app.user.lastname}</a>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
