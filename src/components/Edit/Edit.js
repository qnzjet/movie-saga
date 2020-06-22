import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {

    state={
        titleInput: '' ,
        descriptionInput: ''
    }
    

    getMovie = (movieId) => {
        this.props.dispatch({ type: "GET_MOVIE", payload: movieId });
    }

    backHome=()=>{
        this.props.history.push('/');
    }

    backToDetails=()=>{
        this.props.history.push(`/details/${this.props.match.params.movieId}`);
    }

    componentDidMount=()=> {
        //get the movie id from the passed props/params, GET movie data
        this.getMovie(this.props.match.params.movieId);
        //set the local state values based on that movie info, for filling inputs
    }

    assignInitialState=()=>{
        //set the values to be what's already stored in db for movie, if user hasn't entered anything
        if (this.state.titleInput==='' && this.state.descriptionInput===''){ 
            this.setState({
                titleInput: this.props.selectedMovie.title,
                descriptionInput: this.props.selectedMovie.description
            })
        }//end if
    }

    storeInput=(event, type)=>{
        //store input data in local state
        this.setState({
            ...this.state,
            [type]: event.target.value
        })
    }

    updateInformation=()=> {
        let updatedMovieInfo = this.props.selectedMovie;
        if(this.state.titleInput!=='' && this.state.descriptionInput!==''){
            updatedMovieInfo.title=this.state.titleInput;
            updatedMovieInfo.description=this.state.descriptionInput;
            //eventually this will dispatch to initiate a put request
            console.log('in updateInformation');
            this.props.dispatch({ type: "UPDATE_MOVIE", payload: updatedMovieInfo });
            //and then go back to details
            this.props.history.push(`/details/${this.props.match.params.movieId}`);
        }
        else {alert('you must change the title or description in order to save changes');}
        //maybe an alert before doing that would be good too, like a snackbar
        // this.props.history.push(`/details/${this.props.match.params.movieId}`);
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Edit Movie Details</h2>
                            <label htmlFor="title-input">Title</label>
                            <input  onClick={this.assignInitialState}
                                    onChange={(event)=>this.storeInput(event,'titleInput')}
                                    id="title-input" 
                                    type="text" 
                                    placeholder={this.props.selectedMovie.title} 
                                    value={this.state.titleInput}/>
                            <label htmlFor="description-input">Description</label>
                            <textarea onClick={this.assignInitialState}
                                    onChange={(event) => this.storeInput(event, 'descriptionInput')}
                                    id="description-input" 
                                    type="text" 
                                    placeholder={this.props.selectedMovie.description} 
                                    value={this.state.descriptionInput} />
                            <button onClick={this.backToDetails}>Cancel Changes</button>
                            <button onClick={this.updateInformation}>Confirm Changes</button>
                            <button onClick={this.backHome}>Home</button>
                </section>
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    selectedMovie: reduxState.movie
})
export default connect(putReduxStateOnProps)(Edit);