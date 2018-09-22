-- Creates the "bamazon" database --

CREATE DATABASE bamazon;

-- all of the code will affect "bamazon" --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
	ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
  ProductName  VARCHAR(50) NOT NULL,
  DepartmentName VARCHAR(50) NOT NULL,
  Price DECIMAL(10,2),
	StockQuantity INTEGER(10),
  PRIMARY KEY (ItemID)
);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Code Names", "Games", 19.95, 15);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Taboo", "Games", 10.95, 10);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Scattergories", "Games", 20.49, 2);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Catan", "Games", 24.95, 5);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("The Girl on the Train", "Books", 14.95, 5);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Behind Closed Doors", "Books", 10.99, 1);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Harry Potter and the Cursed Child", "Books", 14.95, 10);
INSERT INTO products ( ProductName,DepartmentName,Price,StockQuantity)
VALUES ("MacBook Air", "Computers", 899.99, 3);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("HP", "Computers", 479.99, 10);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Dell", "Computers", 499.99, 1);

select * FROM products