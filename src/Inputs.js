import React, { Component } from 'react';

class Inputs extends Component {
	state = {entry: ''};

	render(){
		return (
			<div>
				<label>
					Search for a User to see their top artists
				</label>
				<form onSubmit={event => {
					    event.preventDefault();

					    this.props.getLastFM(this.state.entry);
					  }
					}>
				  <input type="text"
				        value={this.state.entry}
				        onChange={ event => this.setState({entry: event.target.value}) } />
				</form>	
			</div>
		);

	}
}

export default Inputs;