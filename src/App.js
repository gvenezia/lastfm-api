import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';
import Results from './Results';
import Inputs from './Inputs';

class App extends Component {
  state = {
    results: ''
  }

  getLastFM = (type, entry) => {
    // Set the API root URL
    let lastFMurl = 'http://ws.audioscrobbler.com/2.0/';

    switch (type){
      case 'user':
        // Get user's library
        lastFMurl += `?method=library.getartists&limit=100&user=${entry}`;
        break;

      case 'user chart list':
        // Get user's charts
        lastFMurl += `?method=user.getweeklychartlist&user=${entry}`;
        break;

      case 'artist':
        // Get similar artists
        lastFMurl += `?method=artist.getSimilar&&artist=${entry}`;
        break;

      case 'artist top tags':
        // Get top tags
        lastFMurl += `?method=artist.gettoptags&artist=${entry}`;
        break;

      case 'user top tags':
        // Get user's top assigned tags
        lastFMurl += `?method=user.gettoptags&user=${entry}`;  
        break;

      default:
        console.log('No matching cases');
        break;

    }

    // Set the API key
    lastFMurl += `&api_key=${process.env.REACT_APP_LASTM_KEY}`;

    // Set JSON as the format
    lastFMurl += '&format=json';

    axios.get(lastFMurl)
      .then( results => {
        // this.setState({results: results.data.artists['@attr'].total})
        console.log(results.data);
      })
      .catch( err => {
        console.log(err)
      });  
  }

  render() {
    return (
      <div>
        <Inputs getLastFM={this.getLastFM}/>
        <Results results={this.state.results}/> 
      </div>
    );
  }
}

export default App;
