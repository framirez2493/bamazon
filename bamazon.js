

var inquirer = require("inquirer");
var mysql = require("mysql");
var sha1 = require("sha1");

var customer = require("./bamazonCustomer.js");
var manager = require("./bamazonManger.js");
var supervisor = require("./bamazonsupervisor.js");

var options = ["Customer", "Manager", "Supervisor", "I got here by mistake, just wanna leave."];

function quit() {
	console.log("\n-------------------------------------------------\n");
	console.log("Thanks for visiting Bamazon. See you next time.");
	console.log("\n-------------------------------------------------\n");
	process.exit();
};

function greeting() {
	console.log("\n-------------------------------------------------\n");
	console.log("Welcome to Bamazon");
	console.log("\n-------------------------------------------------\n");
	inquirer.prompt([
		{
			type: "list",
			choices: options,
			message: "You are our:\n",
			name: "login"
		}
	]).then(function(res) {
		switch (res.login) {
			case options[0]:
				customer();
				break;

			case options[1]:
            manager();
				break;

			case options[2]:
				supervisor();
				break;

			case options[3]:
				quit();
				break;
		};
	});
};

module.exports = greeting;

greeting();