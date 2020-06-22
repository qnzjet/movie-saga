import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/details/:movieId" component={Details}/>
          <Route path="/edit/:movieId" component={Edit} />
        </Router>
      </div>
    );
  }
}

export default App;
