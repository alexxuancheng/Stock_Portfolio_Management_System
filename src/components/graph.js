import React from 'react';
import GraphHead from './graph_head';
import GraphStockList from './graph_stocklist';
import GraphSelectTime from './graph_select_time';
import _ from 'lodash';
import {
	LineChart
} from 'react-easy-chart';

export default class Graph extends React.Component {
	renderLineChart(start_time, end_time) {
		var monthlyTimeSeries = this.props.graph_monthlyTimeSeries;
		var starting_time;
		var ending_time;
		if (!starting_time) {
			starting_time = this.props.starting_time;
		} else {
			starting_time = start_time;
		}

		if (!ending_time) {
			ending_time = this.props.ending_time;
		} else {
			ending_time = end_time;
		}
		var data = [];
		for (var i in monthlyTimeSeries) {
			var s_data = [];
			if (!monthlyTimeSeries[i]) {
				return;
			}
			for (var j in monthlyTimeSeries[i]['monthlyTimeSeries']) {
				var new_j = j.replace(/-/gi, '');

				starting_time = starting_time.replace(/-/gi, '');
				ending_time = ending_time.replace(/-/gi, '');
				if (new_j >= starting_time) {
					s_data.push({
						x: j,
						y: Number.parseFloat(monthlyTimeSeries[i]['monthlyTimeSeries'][j]['4. close'])
					});
				}
			}
			data.push(s_data);
		}

		return (
			<LineChart
				xType={'text'}
				// yType={'text'}
				axes
				axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
				grid
				verticalGrid
				interpolate={'cardinal'}
				width={840}
				height={400}
				data={data}
			/>
		);
	}

	renderStockList() {
		return (_.map(this.props.graph_stockList, (stock, index) => <GraphStockList
																	key={index} 
																	{...stock}
																	getGraph={this.props.getGraph}
																	removeGraph={this.props.removeGraph}
																	graph_pfName={this.props.graph_pfName}
																	/>));
	}

	render() {
		return (
			<div>
				<GraphHead 
					graph_pfName={this.props.graph_pfName}
					closeGraph={this.props.closeGraph}
				/>				
				<div className='stockList'>{this.renderStockList()}</div>
				<div className='line_chart'>{this.renderLineChart()}</div>
				<GraphSelectTime 
					renderLineChart={this.renderLineChart.bind(this)}
					starting_time={this.props.starting_time}
					ending_time={this.props.ending_time}
					changeStartingTime={this.props.changeStartingTime}
					changeEndingTime={this.props.changeEndingTime}
				/>
			</div>
		);
	}
}