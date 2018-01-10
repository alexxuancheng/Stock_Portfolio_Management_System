import React from 'react';

export default class GraphStockList extends React.Component {
	render() {
		return (
			<li className='no_dot'><input type="checkbox" id={this.props.name} onClick={this.ifChecked.bind(this)}/> {this.props.name}</li>
		);
	}
	ifChecked() {
		if (!this.props.name) {
			return;
		}
		if (this.props.ifChecked) {
			this.props.removeGraph(this.props.name);
			return;
		}
		this.props.getGraph(this.props.graph_pfName, this.props.name);
	}
}