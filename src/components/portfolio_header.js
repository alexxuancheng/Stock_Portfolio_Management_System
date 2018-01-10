import React from 'react';

export default class PortfolioHeader extends React.Component {
	render() {
		return (
			<div className='portfolio_header'>
				<span id='portfolio_name'>{this.props.name}</span>
				<button id='btn-USD' onClick={this.OnDollorClick.bind(this)}>Show in $</button>
				<button id='btn-EUR' onClick={this.onEuroClick.bind(this)}>Show in €</button>
			</div>
		);
	}
	onEuroClick() {
		if (this.props.currency === 'EUR') {
			return;
		}
		const portfolioName = this.props.name;
		const fromCurrency = 'USD';
		const toCurrency = 'EUR';
		this.props.changeCurrency(portfolioName, fromCurrency, toCurrency);
	}
	OnDollorClick() {
		if (this.props.currency === 'USD') {
			return;
		}
		const portfolioName = this.props.name;
		const fromCurrency = 'EUR';
		const toCurrency = 'USD';
		this.props.changeCurrency(portfolioName, fromCurrency, toCurrency);
	}
}