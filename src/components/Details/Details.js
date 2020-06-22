import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

    backHome=()=>{
        this.props.history.push('/');
    }

    componentDidMount=()=> {
        //get the movie id from the passed props/params, GET movie data,
        this.getMovie(this.props.details.movieId);
    }

    getMovie = (movieId) => {
        this.props.dispatch({ type: "GET_DETAILS", payload: movieId });
    }

    edit=()=> {
        //go to edit for current movie
        this.props.history.push(`/edit/${this.props.details.movieId}`)

    }

    render() {
        return (
            <div>
                <section>
                        {JSON.stringify(this.props.details)}
                        <h2>{this.props.details.title}</h2>
                        <img src={this.props.details.poster} alt={`movie poster for ${this.props.selectedMovie.title}`}/>
                        {
                            this.props.movieSelected.genres ?
                                <ul>{this.props.details.genres.map((genreString)=>
                                    <li key={genreString}>{genreString} </li>
                                )}</ul>
                                :
                                <p></p>
                        }
                        <p>{this.props.details.description}</p>
                    <button onClick={this.edit}>Edit Movie </button>
                    <button onClick={this.backHome}>Home</button>
                </section>
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    details: reduxState.details
})
export default connect(putReduxStateOnProps)(Details);