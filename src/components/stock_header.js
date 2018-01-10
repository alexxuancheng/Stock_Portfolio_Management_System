import React from 'react';

export default class StockHeader extends React.Component {
	renderCurrency() {
		if (this.props.currency === 'USD') {
			return (<span>$</span>);
		}
		return (<span>€</span>)
	}
	render() {
		return (
			<thead id='stock_header'>
				<tr>
					<th className='col-sm'>Name</th>
					<th className='col-sm'>UnitValue ({this.renderCurrency()})</th>
					<th className='col-sm'>Quantity</th>
					<th className='col-sm'>TotalValue ({this.renderCurrency()})</th>
					<th className='col-sm'>
						<button onClick={this.onCreateStockClick.bind(this)}>Add Stock</button>
					</th>
				</tr>
			</thead>
		);
	}
	onCreateStockClick() {
		this.props.createStock(this.props.name);
	}
}