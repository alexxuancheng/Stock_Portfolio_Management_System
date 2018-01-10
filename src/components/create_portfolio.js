import React from 'react';

export default class CreatePortfolio extends React.Component {
	renderError() {
		if (this.props.error) {
			return (<span>{this.props.error}</span>);
		}
	}
	render() {
		return (
			<div className='create_portfolio'>
				<form onSubmit={this.onCreatePortfolioClick.bind(this)}>
					<input type="text" placeholder='Enter new name' ref='inputName'/><span>  </span>
					<button onClick={this.onCreatePortfolioClick.bind(this)}>Add new portfolio</button>
					{this.renderError()}

				</form>
				<p id='portfolio_number'>You have {this.props.portfolios.length} portfolios! You can have maximum 10 portfolios.</p>
			</div>
		);
	}
	onCreatePortfolioClick(event) {
		event.preventDefault();
		const portfolioName = this.refs.inputName.value;
		this.props.createPortfolio(portfolioName);
		this.refs.inputName.value = '';
	}
}