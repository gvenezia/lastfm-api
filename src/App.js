import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {entry: ''}



  getLastFM = (entry) => {

    // Set the API root URL
    let lastFMurl = 'http://ws.audioscrobbler.com/2.0/';

    // Set the requested info
    lastFMurl += `?method=artist.getSimilar&&artist=${entry}`;

    // Set JSON as the format
    lastFMurl += '&format=json';

    // Set the API key
    lastFMurl += `&api_key=${process.env.REACT_APP_LASTM_KEY}`;

    //`http://ws.audioscrobbler.com/2.0/&api_key=${process.env.REACT_APP_LASTM_KEY}`

    axios.get(lastFMurl)
      .then( results => {
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
          <input 
                type="text"
                value={this.state.entry}
                onChange={ event => this.setState({entry: event.target.value}) } />
        </form>
      </div>
    );
  }
}

export default App;
