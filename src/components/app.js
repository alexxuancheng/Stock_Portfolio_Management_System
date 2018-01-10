import React from 'react';
import _ from 'lodash';
// import symbols from './symbols';
import CreatePortfolio from './create_portfolio';
import Portfolio from './portfolio';
import Graph from './graph';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			portfolios: JSON.parse(localStorage.getItem('portfolios')) || [],
			graph_monthlyTimeSeries: [],
			graph_stockList: []
		}
	}
	renderPortfolios() {
		return (_.map(this.state.portfolios, (portfolio, index) => <Portfolio 
																		key={index}
																		{...portfolio}
																		deletePortfolio={this.deletePortfolio.bind(this)}
																		createStock={this.createStock.bind(this)}
																		saveStock={this.saveStock.bind(this)}
																		deleteStock={this.deleteStock.bind(this)}
																		saveStockName={this.saveStockName.bind(this)}
																		saveUnitValue={this.saveUnitValue.bind(this)}
																		saveQuantity={this.saveQuantity.bind(this)}
																		saveTotalValue={this.saveTotalValue.bind(this)}
																		changeCurrency={this.changeCurrency.bind(this)}
																		getStockList={this.getStockList.bind(this)}
																		getGraph={this.getGraph.bind(this)}
																	/>));
	}
	render() {
		return (
			<div>
				<div className='container' id='original_body'>
					<CreatePortfolio
							error={this.state.error}
							portfolios={this.state.portfolios}
							createPortfolio={this.createPortfolio.bind(this)}
					/>
					<div className='row portfolios'>
						{this.renderPortfolios()}
					</div>

				</div>
				<div id = 'pref_graph' >
					<Graph 
						graph_monthlyTimeSeries={this.state.graph_monthlyTimeSeries}
						graph_stockList={this.state.graph_stockList}
						graph_pfName={this.state.graph_pfName}
						getGraph={this.getGraph.bind(this)}
						removeGraph={this.removeGraph.bind(this)}
						starting_time={this.state.starting_time}
						ending_time={this.state.ending_time}
						changeStartingTime={this.changeStartingTime.bind(this)}
						changeEndingTime={this.changeEndingTime.bind(this)}
						closeGraph={this.closeGraph.bind(this)}
					/>
				</div>
			</div>
		);
	}
	createPortfolio(portfolioName) {
		if (!portfolioName) {
			// if use doesn't enter the portfolio name before click the 'Add new portfolio' button,set the error to state
			this.setState({
				error: '  Please enter a portfolio name.',
				portfolios: this.state.portfolios
			})
			return;
		}
		if (_.find(this.state.portfolios, portfolio => portfolio.name === portfolioName)) {
			// if portfolio name already exists,set the error to state
			this.setState({
				error: '  Portfolio already exist. Please enter another name.',
				portfolios: this.state.portfolios
			})
			return;
		}
		if (this.state.portfolios.length > 9) {
			// if the number of portfolios is more than 10, set the error
			this.setState({
				error: '  You can only have 10 portfolios.'
			})
			return;
		}

		this.state.portfolios.push({
			name: portfolioName,
			stocks: [],
			errorUnsaved: null,
			totalValue: 0,
			currency: 'USD',
			exchangeRate: 0
		})
		this.setState({
			error: null,
			portfolios: this.state.portfolios
		})
		// put the portfolios data into localStorage
		localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
	}

	deletePortfolio(portfolioName) {
		_.remove(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		this.setState({
			portfolios: this.state.portfolios
		})
		// reset the portfolios data in localStorage
		localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
	}

	createStock(portfolioName) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);

		// In one portfolio, stock can be created only when all the other stocks are saved;otherwise raise an error
		if (_.find(portfolio.stocks, stock => stock.editable === true)) {
			portfolio.errorUnsaved = 'Please save stocks before adding a new one.';
			this.setState({
				portfolios: this.state.portfolios
			})
			return;
		}

		// if the number of stocks in one portfolio is more than 50, new stocks can't be created
		if (portfolio.stocks.length > 49) {
			return;
		}
		portfolio.stocks.unshift({
			stockName: '',
			unitValue: '',
			quantity: '',
			totalValue: '',
			editable: true,
			errorName: null,
			errorQuantity: null,
		})

		portfolio.errorUnsaved = null;
		portfolio.errorExtraStock = null;
		this.setState({
			portfolios: this.state.portfolios
		})
	}
	saveStock(portfolioName, stockName, quantity) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === stockName);

		if (!stockName) {
			// user must select a stock from the list before saving the stock, otherwise set the error
			stock.errorName = 'Please select a stock from the list';
			this.setState({
				portfolios: this.state.portfolios
			})
			return;
		}
		if (!quantity) {
			// user must enter quantity before saving the stock, otherwise set the error
			stock.errorQuantity = 'Please enter quantity';
			this.setState({
				portfolios: this.state.portfolios
			})
			return;
		}
		if (_.find(portfolio.stocks, stock => stock.editable === true)) {
			portfolio.errorUnsaved = null;
		}
		stock.editable = false;
		portfolio.totalValue = portfolio.totalValue + stock.totalValue;

		this.setState({
			portfolios: this.state.portfolios
		})

		// put the stocks data into localStorage
		localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
	}

	deleteStock(portfolioName, stockName) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === stockName);
		portfolio.totalValue = portfolio.totalValue - stock.totalValue;
		_.remove(portfolio.stocks, stock => stock.stockName === stockName);

		this.setState({
			portfolios: this.state.portfolios
		})
		// reset the stocks data in localStorage
		localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
	}
	saveStockName(portfolioName, stockName, option) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === stockName);
		const sameStockName = _.find(portfolio.stocks, stock => stock.stockName === option);

		if (sameStockName) {
			stock.errorName = 'Stock already exists';
			this.setState({
				portfolios: this.state.portfolios
			})
			return;
		}
		stock.stockName = option;
		stock.errorName = null;
		this.setState({
			portfolios: this.state.portfolios
		})
	}
	saveUnitValue(portfolioName, option) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === option);
		const url_add = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + option + "&apikey=K2P9G0YNNHAZ7H10";
		var client = new XMLHttpRequest();
		client.open("GET", url_add, true);
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status === 200) {
				var jsonObj = JSON.parse(client.responseText);
				var lastRefreshed = jsonObj['Meta Data']['3. Last Refreshed'].slice(0, 10);
				var unitValue = Number.parseFloat(jsonObj['Time Series (Daily)'][lastRefreshed]['4. close']);
				if (portfolio.currency === 'EUR') {
					stock.unitValue = Number.parseFloat((unitValue * portfolio.exchangeRate).toFixed(2));
				} else {
					stock.unitValue = unitValue;
				}
				this.setState({
					portfolios: this.state.portfolios
				})
			}
		}.bind(this)
		client.send();
	}
	saveQuantity(portfolioName, stockName, quantity) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === stockName);
		stock.quantity = quantity;
		stock.errorQuantity = null;
		this.setState({
			portfolios: this.state.portfolios
		})
	}
	saveTotalValue(portfolioName, stockName, unitValue, quantity) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stock = _.find(portfolio.stocks, stock => stock.stockName === stockName);
		stock.totalValue = Number.parseFloat((unitValue * quantity).toFixed(2));
		this.setState({
			portfolios: this.state.portfolios
		})
	}

	//change the currency between US dollar and Euro
	changeCurrency(portfolioName, fromCurrency, toCurrency) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const url_add = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + fromCurrency + "&to_currency=" + toCurrency + "&apikey=K2P9G0YNNHAZ7H10";
		var client = new XMLHttpRequest();
		client.open("GET", url_add, true);
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status === 200) {
				var jsonObj = JSON.parse(client.responseText);
				var exchangeRate = jsonObj['Realtime Currency Exchange Rate']['5. Exchange Rate'];
				portfolio.currency = toCurrency;
				portfolio.exchangeRate = exchangeRate;
				portfolio.stocks.map(stock => stock.unitValue = Number.parseFloat(stock.unitValue * exchangeRate).toFixed(2));
				portfolio.stocks.map(stock => stock.totalValue = Number.parseFloat(stock.totalValue * exchangeRate).toFixed(2));
				portfolio.totalValue = Number.parseFloat((portfolio.totalValue * exchangeRate).toFixed(2));
				this.setState({
					portfolios: this.state.portfolios
				})
			}
		}.bind(this)
		client.send();
	}

	// graph
	// getStockList method: getting a list of stock names, to show on the left of the graph.
	getStockList(portfolioName) {
		const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const stockNames = _.map(portfolio.stocks, stock => stock.stockName);
		var graph_stockList = [];
		// when the graph first showup, the linechart is empty,users can choose the stocks from stocklist,showing on the linechart
		for (var i = 0; i < stockNames.length; i++) {
			graph_stockList.push({
				name: stockNames[i],
				ifChecked: false
			})
		}
		this.setState({
			graph_stockList: graph_stockList,
			graph_pfName: portfolio.name,
		})
		this.getCurrentTime();
	}
	// get the current year,month,day, set the current date as the default ending_time of the graph
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
		this.setState({
			starting_time: '2017-06-01',
			ending_time: date
		})
	}
	// add the checked stock to the state; get stocklist, monthlyTimeSeries to render the graph
	getGraph(portfolioName, stockName) {
		// const portfolio = _.find(this.state.portfolios, portfolio => portfolio.name === portfolioName);
		const url_add = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + stockName + "&apikey=K2P9G0YNNHAZ7H10"
		var client = new XMLHttpRequest();
		client.open("GET", url_add, true);
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status === 200) {
				var jsonObj = JSON.parse(client.responseText);
				// var lastRefreshed = jsonObj['Meta Data']['3. Last Refreshed'].slice(0, 10);
				var monthlyTimeSeries = jsonObj['Monthly Time Series'];
				this.state.graph_monthlyTimeSeries.push({
					monthlyTimeSeries: monthlyTimeSeries,
					name: stockName,
					ifChecked: true
				});
				const selectedStock = _.find(this.state.graph_stockList, stock => stock.name === stockName);
				selectedStock.ifChecked = true;

				this.setState({
					graph_monthlyTimeSeries: this.state.graph_monthlyTimeSeries,
					graph_stockList: this.state.graph_stockList
				})
			}
		}.bind(this)
		client.send();
	}

	// remove the line of the stock, which is click to be 'not checked'
	removeGraph(stockName) {
		const selectedStock = _.find(this.state.graph_stockList, stock => stock.name === stockName);
		selectedStock.ifChecked = false;
		_.remove(this.state.graph_monthlyTimeSeries, monthlyTimeSeries => monthlyTimeSeries.name === stockName);
		this.setState({
			graph_monthlyTimeSeries: this.state.graph_monthlyTimeSeries,
			graph_stockList: this.state.graph_stockList
		})
	}

	//adjust the time window of the graph by selecting the starting and ending time of the graph
	changeStartingTime(starting_time) {
		this.setState({
			starting_time: starting_time
		})
	}
	changeEndingTime(ending_time) {
		this.setState({
			ending_time: ending_time
		})
	}
	closeGraph() {
		this.setState({
			graph_monthlyTimeSeries: [],
			graph_stockList: [],
			graph_pfName: '',
		})
	}
}