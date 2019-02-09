import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';
import Results from './Results';
import Inputs from './Inputs';

class App extends Component {
  state = {
    results: '',
    queryObj: {},
    toptags: []
  }

  getTopTags = (artist) => {
    let lastFMurl = `http://ws.audioscrobbler.com/2.0/`;
    lastFMurl += `?method=artist.gettoptags&artist=${artist}`;
    lastFMurl += `&api_key=${process.env.REACT_APP_LASTM_KEY}&format=json`;

    axios.get(lastFMurl)
      .then( results => {
        let toptags = results.data.toptags;
        console.log(toptags.tag[0].name);
        let tempArr = [toptags.tag[0].name, toptags.tag[1].name];
        this.setState({toptags: [...this.state.toptags,...tempArr]})
      })

  }

  getLastFM = (type, entry) => {
    // Set the API root URL
    let lastFMurl = `http://ws.audioscrobbler.com/2.0/`;
    let keyAndFormat = `&api_key=${process.env.REACT_APP_LASTM_KEY}&format=json`;
    let methods = '';

    switch (type){
      case 'user':
        // Get user's library
        methods += `?method=library.getartists&limit=100&user=${entry}`;
        break;

      case 'user chart list':
        // Get user's charts
        methods += `?method=user.getweeklychartlist&user=${entry}`;
        break;

      case 'artist':
        // Get similar artists
        methods += `?method=artist.getSimilar&&artist=${entry}`;
        break;

      case 'artist top tags':
        // Get top tags
        methods += `?method=artist.gettoptags&artist=${entry}`;
        break;

      case 'user top tags':
        // Get user's top assigned tags
        methods += `?method=user.gettoptags&user=${entry}`;  
        break;

      default:
        console.log('No matching cases');
        break;

    }

    axios.get(lastFMurl + methods + keyAndFormat)
      .then( results => {
        this.setState({queryObj: results.data})
        console.log(results.data);

      })
      .catch( err => {
        console.log(err)
      });

      //   lastFMurl = `http://ws.audioscrobbler.com/2.0/&api_key=${process.env.REACT_APP_LASTM_KEY}&format=json`;

      // this.state.queryObj.artists.forEach(curr => {
      //   console.log(curr.name);

      // });  
  }

  render() {
    return (
      <div>
        <Inputs 
          queryObj={this.state.queryObj}
          getLastFM={this.getLastFM}
          getTopTags={this.getTopTags}
          />
        <Results results={this.state.results}/> 
      </div>
    );
  }
}

export default App;
