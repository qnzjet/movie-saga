import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component{
    render(){
        return(
            <section>
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
            </section>
        )
    }
}