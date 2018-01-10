import React from 'react';

export default class PortfolioFooter extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.onGetGraphClick.bind(this)} id='graph_click'>Pref Graph</button>
				<button onClick={this.onDeletePortfolioClick.bind(this)} id='delete_protfolio'>Delete Portfolio</button>
			</div>
		);
	}
	onDeletePortfolioClick() {
		const portfolioName = this.props.name;
		this.props.deletePortfolio(portfolioName)
	}
	onGetGraphClick() {
		const portfolioName = this.props.name;
		document.getElementById('pref_graph').style.display = 'block';
		document.getElementById('original_body').style.opacity = 0.4;
		this.props.getStockList(portfolioName);
	}
}