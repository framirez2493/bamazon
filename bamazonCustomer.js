var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var displayTable = require('./constructor.js');//u need department extension in case of questions
//security purpose u do not need to know how many in stock.
var options = ["View items for sale", "Place an order", "Back to main menu"];

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //runSearch();
    //readProducts();
});
var customer = function() { 
	inquirer.prompt([
		{
			type: "list",
			message: "\nWhat do you want to do next?\n",
			choices: options,
			name: "customer"
		}
	]).then(function(res) {
		switch (res.customer) {
			case options[0]:
				readProducts();
				break;

			case options[1]:
				purchaseItem();
				break;

			case options[2]:
				var greeting = require("./bamazon.js");
				greeting();
				break;
		}
	});
};
var readProducts = function() {
	var display = new displayTable();
	connection.query('SELECT * FROM products', function(err, results){
		display.displayInventoryTable(results);
		customer();
	});
}

var purchaseItem = function() {
	console.log('\n  ');
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: " Enter the Item ID of the product you want to purchase",

	}, {
		name: "quantity",
		type: "input",
		message: " Enter the quantity you want to purchase",

	}]).then(function(answer) {
		// Query the database for info about the item including the quantity currently in stock. 
		connection.query('SELECT ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ?', {ItemID: answer.id}, function(err,res) {
			
		console.log('\n  You would like to buy ' + answer.quantity + ' ' + res[0].ProductName + ' ' + res[0].DepartmentName + ' at $' + res[0].Price + ' each'
			);
			if (res[0].StockQuantity >= answer.quantity) {
				//If enough inventory to complete order, process order by updating database inventory and notifying customer that order is complete. 
				var itemQuantity = res[0].StockQuantity - answer.quantity;
				connection.query("UPDATE products SET ? WHERE ?", [
				{
					StockQuantity: itemQuantity
				}, {
					ItemID: answer.id
				}], function(err,res) {
					});	
				var cost = res[0].Price * answer.quantity;
				console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');
				// Order completed
				customer();
					
			} else {
				//If not enought inventory notify customer and prompt customer for desire to shop more
				console.log('\n  Sorry, Insufficient quantity to fulfill your order!\n');
				// Order not completed
				customer();
			}
		})
    });
}


/*var customerPrompt = function() {
    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to do shopping?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                readProducts();
            break;

            case 'No':
                connection.end();
            break;
        }
    })
};*/

// Start app by Prompting the customer
//customerPrompt();
module.exports = customer;
