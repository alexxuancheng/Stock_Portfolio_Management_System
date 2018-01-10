import React from 'react';
import PortfolioFooter from './portfolio_footer';
import PortfolioHeader from './portfolio_header';
import PortfolioTotal from './portfolio_total';
import PortfolioStocks from './portfolio_stocks';

export default class Portfolio extends React.Component {
	renderError() {
		if (this.props.errorUnsaved) {
			return (<p>{this.props.errorUnsaved}</p>)
		}
		if (this.props.errorExtraStock) {
			return (<p>{this.props.errorExtraStock}</p>)
		}
		return null;
	}
	render() {
		return (
			<div className='col-sm-6 portfolio'>
				<PortfolioHeader 
						name={this.props.name} 
						currency={this.props.currency}
						changeCurrency = {this.props.changeCurrency}
				/>
				<PortfolioStocks 
						name={this.props.name} 
						totalValue={this.props.totalValue}
						stocks={this.props.stocks}
						currency={this.props.currency}
						createStock={this.props.createStock}
						saveStock={this.props.saveStock}
						deleteStock={this.props.deleteStock}
						saveStockName={this.props.saveStockName}
						saveUnitValue={this.props.saveUnitValue}
						saveQuantity={this.props.saveQuantity}
						saveTotalValue={this.props.saveTotalValue}
				/>
				<p className='stock_numbers'>You have {this.props.stocks.length} stocks in this portfolio!</p>  
				<p className='stock_numbers'>You can have maximum 50 stocks in one portfolio.</p>
				<PortfolioTotal name={this.props.name} currency={this.props.currency} totalValue={this.props.totalValue}/>
				<PortfolioFooter 
						name={this.props.name} 
						stocks={this.props.stocks}
						monthlyTimeSeries={this.props.monthlyTimeSeries}
						currency={this.props.currency}
						deletePortfolio={this.props.deletePortfolio}
						getStockList={this.props.getStockList}
						getGraph={this.props.getGraph}
				/>
			</div>
		);
	}
}