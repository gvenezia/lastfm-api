import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {entry: ''}



  getLastFM = (entry) => {
    // var lastFMinstance = axios.create({
    //   headers: {'Access-Control-Allow-Origin:': '*'}
    // });

    // let lastFMurl = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_LASTM_KEY}`;

    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&&artist=${entry}&api_key=${process.env.REACT_APP_LASTM_KEY}`)
      .then( results => {
        console.log(results);
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
