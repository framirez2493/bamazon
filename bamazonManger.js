var mysql = require('mysql');
var Table = require('cli-table2');
var inquirer = require('inquirer');
var username = "FR";
var password = "FR7";

var displayTable = require('./constructormanager.js');//management purpose u wanna know about stock#
var options = ["View Products for Sale", " View Low Inventory", "Add to Inventory", "Add new Price",
    "Add New Product", " Delete Product", "Main menu"];
var TASKS = 7;
var displayForManager = function (results) {
    var display = new displayTable();
    display.displayInventoryTable(results);
}

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root', //your mysql workbench password goes here
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        throw err;
    }
});
var login = function () {
    console.log("\n-------------------------------------------------\n");
    console.log("To get access to backstage, please confirm username and password.")
    inquirer.prompt([
        {
            type: "confirm",
            message: "Are you sure?\n",
            name: "islogin"
        }
    ]).then(function (res) {
        if (res.islogin) {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Username:",
                    name: "username"
                },
                {
                    type: "password",
                    message: "Password:",
                    name: "password"
                }
            ]).then(function (res) {
                if (res.username === username && res.password === password) {
                    console.log("\n-------------------------------------------------\n");
                    console.log("Dear manager FR7, welcome back.");
                    console.log("\n-------------------------------------------------\n");
                    manager();
                }
                else {
                    console.log("\n-------------------------------------------------\n");
                    console.log("Invalid username or password. Please try again.")
                    login();
                }
            });
        }
        else {
            var greeting = require("./bamazon.js");
            greeting();
        }
    });
}

function manager() {
    inquirer.prompt([
        {
            type: "list",
            choices: options,
            name: "options",
            message: "What do you want to do next?"
        }
    ]).then(function (res) {
        switch (res.options) {
            case options[0]:
                readProducts();
                break;

            case options[1]:
                viewLowInventory();
                break;

            case options[2]:
                addInventory();
                break;

            case options[3]:
                addNewprice();
                break;
            case options[4]:
                addProduct();
                break;
            case options[5]:
                deleteProduct();
                break;

            case options[6]:
                var greeting = require("./bamazon.js");
                greeting();
                break;
        }
    });
};

/*  inquirer.prompt({
      name: "option",
      type: "input",
      message: " Which option would you like to perform?\n",
  }).then(function(answer) {

      var choice = parseInt(answer.option);

      if (choice > 0 && choice <= TASKS) {
          switch(answer.option) {
              case '1':
                   readProducts();
                   break;
              
              case '2':
                   viewLowInventory();
                   break;
              
              case '3':
                   addInventory();
                   break;
              case '4':
                   addNewprice();
                   break;
              
              case '5':
                   addProduct();
                   break;

              case '6':
                   deleteProduct();
                   break;

              case '7':
              var greeting = require("./bamazon.js");
              greeting();
              break;
            

              case '8':
                   connection.end();
                   break;       
          } 
      } else {
          console.log('Please choose a number between 1 and ' + TASKS);
          Manager();
      }
  });
}*/

// Displays Inventory Table for Manager, Results from a SELECT query are passed in as parameter and used 


// Prompt Manager for desire to continue or end connection to database
/*function promptManager() {
    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to continue?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                askManager();
            break;

            case 'No':
                connection.end();
            break;
        }
    });
}*/

// Select all information from products table to display for Manager, prompt manager for desire to continue
function readProducts() {
    connection.query('SELECT * FROM products', function (err, results) {
        displayForManager(results);
        manager();
    })
}

//Select products from database whose quantity is less than 5 items and display in a table, prompt manager if desires to continue
function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE StockQuantity < 5', function (err, results) {
        console.log('\n  All products with quantity lower than 5 shown in Inventory Table\n');
        displayForManager(results);
        manager();
    })
}

// Update the quantity of an item already in database, display updated value in a table
function addInventory() {

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product",

    }, {
        name: "quantity",
        type: "input",
        message: " Enter quantity you wish to add",

    }]).then(function (answer) {

        connection.query('SELECT * FROM products WHERE ?', { ItemID: answer.id }, function (err, res) {
            itemQuantity = res[0].StockQuantity + parseInt(answer.quantity);

            connection.query("UPDATE products SET ? WHERE ?", [{
                StockQuantity: itemQuantity
            }, {
                ItemID: answer.id
            }], function (err, results) { });

            connection.query('SELECT * FROM products WHERE ?', { ItemID: answer.id }, function (err, results) {
                console.log('\n The Stock Quantity was updated- see Inventory Table\n');
                displayForManager(results);
                manager();
            });

        });
    });
}
//markout clearance change price 
function addNewprice() {

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product",

    }, {
        name: "price",
        type: "input",
        message: " Enter new price",

    }]).then(function (answer) {

        connection.query('SELECT * FROM products WHERE ?', { ItemID: answer.id }, function (err, res) {
            itemPrice = parseInt(answer.price);

            connection.query("UPDATE products SET ? WHERE ?", [{
                Price: itemPrice
            }, {
                ItemID: answer.id
            }], function (err, results) { });

            connection.query('SELECT * FROM products WHERE ?', { ItemID: answer.id }, function (err, results) {
                console.log('\n The Price was updated- see Inventory Table\n');
                displayForManager(results);
                manager();
            });

        });
    });
}

// Add a new product into the database with all of it's information, display the Inventory Table, prompt Manager if desires to continue
function addProduct() {
    inquirer.prompt([{
        name: "productName",
        type: "input",
        message: " Enter the name of the product",
    }, {
        name: "departmentName",
        type: "input",
        message: " Enter the department of the product",
    }, {
        name: "price",
        type: "input",
        message: " Enter price of the product",
    }, {
        name: "extension",
        type: "input",
        message: " Enter extension of the product",
    },
    {
        name: "quantity",
        type: "input",
        message: " Enter the quantity",
    }]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", {
            ProductName: answer.productName,
            DepartmentName: answer.departmentName,
            Price: answer.price,
            ExtensionNumber: answer.extension,
            StockQuantity: answer.quantity
        }, function (err, res) {
            console.log('\n  The new product was added - See the Inventory Table\n');
            connection.query('SELECT * FROM products', function (err, results) {
                displayForManager(results);
                manager();
            });
        });
    });
}

function deleteProduct() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product you wish to delete",

    }]).then(function (answer) {

        connection.query("DELETE FROM products WHERE ?", {
            ItemID: answer.id
        }, function (err, results) {
            console.log('\n  The product was deleted - See the Inventory Table\n');
            connection.query('SELECT * FROM products', function (err, results) {
                displayForManager(results);
                manager();
            });
        });
    });
}

// Give Manager choices for options to view or update database, give option to terminate, and check for valid choice

// **** Start the Bamazon Manager Function ****
module.exports = login;