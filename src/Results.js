import React, { Component } from 'react';

class Results extends Component {
	state = {};

	renderList() {
		return this.props.resultsList.map( (tag) => {
			return (
				<p key={tag[0]}> {tag[1]} &emsp; {tag[0]}</p>
			)
		})
	}

	render(){
		return (
			<div>
				{this.renderList()}
			</div>	
		);

	}
}

export default Results;