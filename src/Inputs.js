import React, { Component } from 'react';

class Inputs extends Component {
	state = {
		entry: '',
		artist: '',
		user: ''
	};

	render(){
		return (
			<div>
				<label>
					Search for a User to see their top artists
				</label>
				<form onSubmit={event => {
					    event.preventDefault();

					    if (event.target !== null)
					    	this.props.getLastFM('user', this.state.user);
					  }
					}>
				  <input type="text"
				        value={this.state.user}
				        onChange={ event => this.setState({user: event.target.value}) } />
				</form>	
				<label>
					Search for an Artist to see their similar artists
				</label>
				<form onSubmit={event => {
					    event.preventDefault();

					    if (event.target !== null)
					    	this.props.getLastFM('artist', this.state.artist);
					  }
					}>
				  <input type="text"
				        value={this.state.artist}
				        onChange={ event => this.setState({artist: event.target.value}) } />
				</form>	
				<button onClick={ () => {
							console.log('clicked');
							console.log(this.props);
							this.props.queryObj.artists.artist.forEach( curr => {
								this.props.getTopTags(curr.name)
							})
						}
					}>
					Find top 2 tags for each artist in User's top artists (must provide user above)
				</button>
			</div>
		);

	}
}

export default Inputs;