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

    setTimeout( () => axios.get(lastFMurl)
      .then( results => {
        let toptags = results.data.toptags;
        console.log(toptags.tag[0].name);
        let tempArr = [toptags.tag[0].name];
        this.setState({toptags: [...this.state.toptags,...tempArr]})
      }).catch( err => {
        console.log(artist + 'caused tag error');
      })
      , 1000)
  }

  findTally = () => {
    let arr = this.state.toptags;
    let tally = {};
    let a = '';

    for (let i = 0; i < arr.length; i++) {
      a = arr[i];
      tally[a] = (tally[a] || 0) + 1;
    }

    var sortable = [];
    for (var tag in tally) {
        sortable.push([tag, tally[tag]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    console.log(sortable);
  }

  getLastFM = (type, entry) => {
    // Set the API root URL
    let lastFMurl = `http://ws.audioscrobbler.com/2.0/`;
    let keyAndFormat = `&api_key=${process.env.REACT_APP_LASTM_KEY}&format=json`;
    let methods = '';

    switch (type){
      case 'user':
        // Get user's library
        methods += `?method=library.getartists&limit=2000&user=${entry}`;
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
          findTally={this.findTally}
          />
        <Results results={this.state.results}/> 
      </div>
    );
  }
}

export default App;
