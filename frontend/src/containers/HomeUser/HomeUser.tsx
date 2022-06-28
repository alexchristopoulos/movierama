import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import './HomeUser.css';
import TopBar from '../../components/TopBar/TopBar';

class HomeUser extends React.Component {

  props: any;
  state: any;

  constructor(props) {

    super(props);

    this.getMovies = this.getMovies.bind(this);
    this.logout = this.logout.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.like = this.like.bind(this);
    this.hate = this.hate.bind(this);
    this.deleteOpinion = this.deleteOpinion.bind(this);
    this.getByAuthor = this.getByAuthor.bind(this);

    this.state = {
      modal: {
        title: '',
        description: ''
      } 
    }
  }

  componentDidMount() {
    this.props.getMovies(this.props.app.user.token);

  }

  getMovies() {
    this.props.getMovies(this.props.app.user.token);
  }

  createMovie() {
    const title = this.state.modal.title;
    const description = this.state.modal.description;
    const token = this.props.app.user.token;

    this.props.createMovie(title, description, token);
  }

  logout() {
    this.props.logout();
  }

  days(now, postedAt) {
    let difference = now.getTime() - postedAt.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays - 1;
  }

  like(event) {
    const removeCurrentOpinion = event.target.getAttribute('clear');
    const movieId = event.target.id;
    const token = this.props.app.user.token;
    removeCurrentOpinion?this.props.createMovieOpinion(true, movieId, token, true):this.props.createMovieOpinion(true, movieId, token);
  }

  hate(event) {
    const removeCurrentOpinion = event.target.getAttribute('clear');
    const movieId = event.target.id;
    const token = this.props.app.user.token;
    removeCurrentOpinion?this.props.createMovieOpinion(false, movieId, token, true):this.props.createMovieOpinion(false, movieId, token);
  }

  deleteOpinion(event) {
    const movieId = event.target.id;
    const token = this.props.app.user.token;
    this.props.deleteMovieOpinion(movieId, token);
  }

  getByAuthor(event){
    const author = event.target.getAttribute('author');
    this.props.getMoviesByAuthor(author, this.props.app.user.token);
  }

  render() {
    return (
      <div>
        <TopBar />
        <div className='maindiv'>
          <div className="modal" tabindex="-1" id="create-movie-modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create new movie</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Movie title</p>
                  <input type="text" onKeyUp={(e) => this.setState({...this.state, modal: { ...this.state.modal, title: e.target.value }})}></input>
                  <p>Movie description</p>
                  <textarea name="" id="" cols="30" rows="10" onKeyUp={(e) => this.setState({...this.state, modal: { ...this.state.modal, description: e.target.value }})}></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.createMovie}>Create movie</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className='col col-sm-10'>
              <div className="row">
                {
                  this.props.app.movies.map((movie, index) => 
                  (
                    <>
                    <div className='col col-sm-4 col-card'>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p>Posted by <span className="movierama-action" aria-current="page" author={movie.ownerEmail} onClick={this.getByAuthor}>{movie.isOwner?<>You</>:movie.owner}</span> </p>
                            <p className="card-text">{movie.description}</p>
                            <p>
                              <span className="small published-span float-right">
                                <i>
                                  {
                                    this.days(new Date(Date.now()), new Date(movie.publishedAt))>0?
                                    (<>Posted {this.days(new Date(Date.now()), new Date(movie.publishedAt))} day(s) ago </>):
                                    (<>Posted today</>)
                                  }
                                </i>
                              </span>
                            </p>
                          </div>
                          
                          <div className="card-footer">
                            {
                              movie.isOwner?//owner of the movie should not like/hate
                                <>
                                      {movie.likes} <i className="bi bi-hand-thumbs-up-fill"></i> |  {movie.hates} <i className="bi bi-hand-thumbs-down-fill"></i> 
                                </>://no owner of the movie
                                movie.userOpinion?
                                  movie.userOpinion == 1? // user likes the movie
                                    <> 
                                      {movie.likes} <i className="bi bi-hand-thumbs-up-fill"></i> | {movie.hates} <i id={movie._id} clear="true" onClick={this.hate} className="bi bi-hand-thumbs-down"></i> <span className="small published-span float-right">You like this movie | <span id={movie._id} onClick={this.deleteOpinion} className="movierama-action"><i id={movie._id}>Unlike</i></span> </span>
                                    </>: //user hates the movie
                                    <>
                                      {movie.likes} <i id={movie._id} clear="true" onClick={this.like} className="bi bi-hand-thumbs-up"></i> | {movie.hates} <i className="bi bi-hand-thumbs-down-fill"></i> <span className="small published-span float-right">You hate this movie | <span id={movie._id} onClick={this.deleteOpinion} className="movierama-action"><i id={movie._id}>Unhate</i></span> </span>
                                    </>
                                  :movie.likes > 0 || movie.hates > 0?//user has no like/hate for this movie
                                    <>
                                      {movie.likes} <i id={movie._id} onClick={this.like} className="bi bi-hand-thumbs-up"></i> |  {movie.hates} <i id={movie._id} onClick={this.hate} className="bi bi-hand-thumbs-down"></i> 
                                    </>://0 likes/hates
                                    <>
                                      Be the first to <i id={movie._id} onClick={this.like} className="bi bi-hand-thumbs-up"></i> or <i id={movie._id} onClick={this.hate} className="bi bi-hand-thumbs-down"></i> this movie!
                                    </>
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  )
                  )
                }
              </div>
            </div>
            <div className='col col-sm-2 float-right'>
              <div className="row">
                <div className="col col-sm-12">
                  <div className="float-right side-menu-action"><button className='btn btn-primary side-btn' data-bs-toggle="modal" data-bs-target="#create-movie-modal">Create Movie</button></div>
                </div>
                <div className="col col-sm-12">
                  <div className="float-right side-menu-action"><button className='btn btn-success side-btn' onClick={this.getMovies}>Refresh list</button></div>
                </div>
                <div className="col col-sm-12">
                  <div className="float-right side-menu-action"><button className='btn btn-danger side-btn' onClick={this.logout}>Logout</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);
