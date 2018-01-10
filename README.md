# Stock_Portfolio_Management_System-SPMS

demo: https://alexxuancheng.github.io/Stock_Portfolio_Management_System/

Features:
1. Users can create portfolios, and maximum 10 portfolios; everytime creating a portfolio, user must enter a portfolio name, otherwise raise an error; each portfolio name should be different, otherwise raise an error;
2. Delete portfolios;
3. In each portfolio, user can create stocks, and maximum 50 stock; each stock name should be different, otherwise raise an error; stock symbols can be selected in the datelist, user can enter 'quantity', once a stockname is selected and quantity is entered, user can view 'unit value' and 'total value' of the particular stock, and the 'total value' of the protfolio from the table; user can save and delete the particular stock;
4. In each portfolio, user can change currency, real-time currency rate will be get from the API: https://www.alphavantage.co/documentation/. The real-time currency will be showing in the table;
5. User can get the graph (line-chart) of the chosen portfolio. In the graph, user have to first choose the wanted stock,which will be displayed; user can change the starting-time and ending-time of the grapg.(In this project, data displayed monthly).


List of used frameworks and libraries:
1. react, react-dom
2. create-react-app : It sets up your development environment, to start building a new React single page application;
3. lodash : 
    _map :Creates an array of values by running each element in collection thru iteratee; 
    _find:Iterates over elements of collection, returning the first element predicate returns truthy for 
    _remove:Removes all elements from array that predicate returns truthy for and returns an array of the removed elements
4. react-easy-chart: use the LineChart to render the graph;
5. react-datalist： to list all the available stock symbols in the ‘Name’ column of the table

Note:
symbol.js (consists of symbols of all stocks) is converted from symbol.json, which is converted from csv file, downloaded from http://www.nasdaq.com/screening/company-list.aspx
