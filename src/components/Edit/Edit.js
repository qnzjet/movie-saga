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
        this.props.history.push(`/details/${this.props.details.movieId}`);
    }

    // componentDidMount=()=> {
    //     //get the movie id from the passed props/params, GET movie data
    //     this.getMovie(this.props.details.movieId);
    //     //set the local state values based on that movie info, for filling inputs
    // }

    assignInitialState=()=>{
        //set the values to be what's already stored in db for movie, if user hasn't entered anything
        if (this.state.titleInput==='' && this.state.descriptionInput===''){ 
            this.setState({
                titleInput: this.props.details.title,
                descriptionInput: this.props.details.description
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
        let updatedMovieInfo = this.props.details;
        if(this.state.titleInput!=='' && this.state.descriptionInput!==''){
            updatedMovieInfo.title=this.state.titleInput;
            updatedMovieInfo.description=this.state.descriptionInput;
            //eventually this will dispatch to initiate a put request
            console.log('in updateInformation');
            this.props.dispatch({ type: "UPDATE_MOVIE", payload: updatedMovieInfo });
            //and then go back to details
            this.props.history.push(`/details/${this.props.details.movieId}`);
        }
        else {alert('you must change the title or description in order to save changes');}
        //maybe an alert before doing that would be good too, like a snackbar
        // this.props.history.push(`/details/${this.props.match.params.movieId}`);
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.reduxState)}
                {/* <h2>Edit Movie Details</h2>
                <div>
                    <label htmlFor="title-input">Title</label>
                    <input  onClick={this.assignInitialState}
                                    onChange={(event)=>this.storeInput(event,'titleInput')}
                                    id="title-input" 
                                    type="text" 
                                    placeholder={this.props.details.title} 
                                    value={this.state.titleInput}/>
                    <label htmlFor="description-input">Description</label>
                    <textarea onClick={this.assignInitialState}
                                    onChange={(event) => this.storeInput(event, 'descriptionInput')}
                                    id="description-input" 
                                    type="text" 
                                    placeholder={this.props.details.description} 
                                    value={this.state.descriptionInput} />
                        <button onClick={this.backToDetails}>Cancel Changes</button>
                    <button onClick={this.updateInformation}>Confirm Changes</button>
                </div>

                    <button onClick={this.backHome}>Home</button> */}
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    
})
export default connect(putReduxStateOnProps)(Edit);