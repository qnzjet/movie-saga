import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{

    //on load, get movies from db
    componentDidMount=()=>{
        this.props.dispatch({ type: "GET_MOVIES" });
    }
    goToDetails=(id)=>{
        //go to details view for movie clicked
        this.props.history.push(`/details/${id}`);
    }

    render() {
        return (
            <section>
                <p>click on movie to view movie details</p>
                <div>
                    {this.props.stateMovies.map((movie)=>
                        <article key={movie.id}>
                            <h2>{movie.title}</h2>
                            <button 
                                onClick={()=>
                                    this.goToDetails(movie.id)}
                                title={`see details about ${movie.title}`}>
                                <img src={movie.poster} alt={`movie poster for ${movie.title}`}/>
                            </button>
                        </article>
                    )}
                </div>
            </section>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    stateMovies: reduxState.movies
})
export default connect(putReduxStateOnProps)(Home);