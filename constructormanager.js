Table = require('cli-table2');
var displayTable = function() {

    this.table = new Table({
        head: ['Item ID', 'Product Name', 'Price','Department Name', 'Stock Quantity'],
    });

    this.displayInventoryTable = function(results) {
    	this.results = results;
	    for (var i=0; i <this.results.length; i++) {
	        this.table.push(
	            [this.results[i].ItemID, this.results[i].ProductName, '$'+ this.results[i].Price, this.results[i].DepartmentName, this.results[i].StockQuantity] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displayTable;