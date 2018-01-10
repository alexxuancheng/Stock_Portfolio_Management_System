import React from 'react';

export default class PortfolioTotal extends React.Component {
	renderPortfolioName() {
		return (<span>{this.props.name}</span>);
	}
	renderTotal() {
		return (<span>{this.props.totalValue}</span>);
	}
	renderCurrency() {
		if (this.props.currency === 'USD') {
			return (<span>$</span>)
		}
		return (<span>€</span>)
	}
	render() {
		return (
			<div className='portfolio_total'>			
				<p>Total value of {this.renderPortfolioName()} : {this.renderTotal()} {this.renderCurrency()}</p>
			</div>
		);
	}
}
// <p>Total value of {this.renderPortfolioName()}: {this.renderTotal()}{this.renderCurrency()}</p>