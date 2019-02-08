import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';
import Results from './Results';
import Inputs from './Inputs';

class App extends Component {
  state = {
    entry: '',
    artist: '',
    results: {}
  }

  getLastFM = (entry) => {

    // Set the API root URL
    let lastFMurl = 'http://ws.audioscrobbler.com/2.0/';

    // Set similar artists
    // lastFMurl += `?method=artist.getSimilar&&artist=${entry}`;

    // Get user
    // lastFMurl += `?method=user.gettoptags&user=${entry}`;

    // Get user's charts
    // lastFMurl += `?method=user.getweeklychartlist&user=${entry}`;

    // Get user's library
    lastFMurl += `?method=library.getartists&limit=100&user=${entry}`;

    // Set the API key
    lastFMurl += `&api_key=${process.env.REACT_APP_LASTM_KEY}`;

    // Set JSON as the format
    lastFMurl += '&format=json';

    // Get top tags
    // lastFMurl += `?method=artist.gettoptags&artist=${artist}`

    //`http://ws.audioscrobbler.com/2.0/&api_key=${process.env.REACT_APP_LASTM_KEY}`

    axios.get(lastFMurl)
      .then( results => {
        // this.setState({results: results})
        console.log(results.data);
      })
      .catch( err => {
        console.log(err)
      });  
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={event => {
            event.preventDefault();

            this.getLastFM(this.state.entry);
          }
        }>
          <input type="text"
                value={this.state.entry}
                onChange={ event => this.setState({entry: event.target.value}) } />
        </form>
        <div>
          <Results results={this.state.results}/>
        </div>  
      </div>
    );
  }
}

export default App;
