import React from 'react';
import StockHeader from './stock_header';
import Stock from './stock';
import _ from 'lodash';

export default class PortfolioStocks extends React.Component {
	renderStock() {
		return (_.map(this.props.stocks, (stock, index) => <Stock 
																key={index}
																{...stock}
																name={this.props.name}
																saveStock={this.props.saveStock}
																deleteStock={this.props.deleteStock}
																saveStockName={this.props.saveStockName}
																saveUnitValue={this.props.saveUnitValue}
																saveQuantity={this.props.saveQuantity}
																saveTotalValue={this.props.saveTotalValue}
															/>));
	}
	render() {
		return (
			<table className='col-sm-12 table-bordered portfolio_stocks'>
				<StockHeader name={this.props.name} currency={this.props.currency} createStock={this.props.createStock}/>
				<tbody id='stock'>{this.renderStock()}</tbody>
			</table>
		);
	}
}