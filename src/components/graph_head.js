import React from 'react';

export default class GraphHead extends React.Component {
	render() {
		return (
			<div id='graph_head'>
				<span id='graph_pfName'>{this.props.graph_pfName}</span>
				<button id='btn_close' onClick={this.onCloseGraphClick.bind(this)}>Close</button>
			</div>
		);
	}
	onCloseGraphClick() {
		document.getElementById('pref_graph').style.display = 'none';
		document.getElementById('original_body').style.opacity = 1;
		this.props.closeGraph();
	}
}