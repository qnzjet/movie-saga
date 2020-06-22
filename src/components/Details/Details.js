import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

    backHome=()=>{
        this.props.history.push('/');
    }

    componentDidMount=()=> {
        //get the movie id from the passed props/params, GET movie data,
        this.getMovie(this.props.match.params.movieId);
    }

    getMovie = (movieId) => {
        this.props.dispatch({ type: "GET_DETAILS", payload: movieId });
    }

    goToEdit=()=> {
        //go to edit view for current movie
        this.props.history.push(`/edit/${this.props.match.params.movieId}`)

    }

    render() {
        return (
            <div>
                <section className="details">
                    <article className="details">
                        <h2>{this.props.selectedMovie.title}</h2>
                        <img src={this.props.selectedMovie.poster} alt={`movie poster for ${this.props.selectedMovie.title}`}/>
                        {
                            this.props.selectedMovie.genres ?
                                <ul>{this.props.selectedMovie.genres.map((genreString)=>
                                    <li className="genre" key={genreString}>{genreString} </li>
                                )}</ul>
                                :
                                <p></p>
                        }
                        <p>{this.props.selectedMovie.description}</p>
                    </article>
                    <button onClick={this.goToEdit}>Edit Movie</button>
                    <button onClick={this.backHome}>HOME</button>
                </section>
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    selectedMovie: reduxState.movie
})
export default connect(putReduxStateOnProps)(Details);