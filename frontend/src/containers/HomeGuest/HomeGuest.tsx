import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../models/mapState';
import mapDispatchToProps from '../../models/mapDispatch';
import './HomeGuest.css';
import TopBar from '../../components/TopBar/TopBar';

class HomeGuest extends React.Component {

  props: any;

  constructor(props) {
    super(props);
    this.getMovies = this.getMovies.bind(this);
    this.getByAuthor = this.getByAuthor.bind(this);
  }

  componentDidMount() {
    this.props.getMovies();

  }

  getMovies() {
    this.props.getMovies();
  }

  days(now, postedAt) {
    let difference = now.getTime() - postedAt.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays - 1;
  }

  getByAuthor(event){
    const author = event.target.getAttribute('author');
    this.props.getMoviesByAuthor(author);
  }

  render() {

    return (
      <div>
        <TopBar />
        <div className='maindiv'>
          <div className="row">
            <div className='col col-sm-10'>
              <div className="row">
                {
                  this.props.app.movies.map(movie =>
                  (
                    <>
                      <div className='col col-sm-4 col-card'>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p>Posted by <span className="movierama-action" aria-current="page" author={movie.ownerEmail} onClick={this.getByAuthor}>{movie.owner}</span> </p>
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
                          {
                            movie.likes > 0 || movie.hates > 0?<><div className="card-footer"> {movie.likes} <i className="bi bi-hand-thumbs-up-fill"></i> {movie.hates} <i className="bi bi-hand-thumbs-down-fill"></i></div></>:<></>
                          } 
                        </div>
                      </div>
                    </>
                  )
                  )
                }
              </div>
            </div>
            <div className='col col-sm-2 float-right'>
              <div className="float-right"><button className='btn btn-success side-btn' onClick={this.getMovies}>Refresh list</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeGuest);
