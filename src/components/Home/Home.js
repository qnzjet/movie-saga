import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{

    //on load, get movies from db
    componentDidMount=()=>{
        this.props.dispatch({ type: "GET_MOVIES" });
    }

    render(){
        return(
           <>
           {JSON.stringify(this.props.stateMovies)}
           </>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    stateMovies: reduxState.movies
})
export default connect(putReduxStateOnProps)(Home);