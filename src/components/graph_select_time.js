import React from 'react';

export default class GraphSelectTime extends React.Component {
	render() {
		return (
			<div className='select_time'>
				<span id='starting_time_span'>Starting time 
					<input 
						type="date" id="starting_time" defaultValue='2017-06-01' ref='starting_time'
						onChange={this.getStartingTime.bind(this)}/>
				</span>
				<span id='ending_time_span'>Ending time 
					<input 
						type="date" id="ending_time" defaultValue={this.getCurrentTime()} ref='ending_time'
						onChange={this.getEndingTime.bind(this)}/>
				</span>
			</div>
		);
	}
	getCurrentTime() {
		var d = new Date();
		var a = d.getDate();
		if (a < 10) {
			a = '0' + a;
		}
		var b = d.getMonth() + 1;
		if (b < 10) {
			b = '0' + b;
		}
		var c = d.getFullYear();
		var date = c + '-' + b + '-' + a;

		return (date);
	}
	getStartingTime() {
		var starting_time = this.refs.starting_time.value;
		var ending_time = this.props.ending_time;
		this.props.changeStartingTime(starting_time);
		this.props.renderLineChart(starting_time, ending_time);

	}
	getEndingTime() {
		var ending_time = this.refs.ending_time.value;
		var starting_time = this.props.starting_time;
		this.props.changeEndingTime(ending_time);
		this.props.renderLineChart(starting_time, ending_time);
	}
}