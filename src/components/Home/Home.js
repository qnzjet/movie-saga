import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{

    render(){
        return(
           <>
           </>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    stateMovies: reduxState.movies
})
export default connect(putReduxStateOnProps)(Home);