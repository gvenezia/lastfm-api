import React, { Component } from 'react';

class Results extends Component {
	state = {};

	render(){
		return (
			<p>
				{this.props.results}
			</p>	
		);

	}
}

export default Results;