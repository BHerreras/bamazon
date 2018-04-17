create database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT primary key,
  product_name VARCHAR(45) NULL,
  department_name varchar(30) NULL,
  price INT NULL,
  stock_quantity INT not null
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics", 499, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Cards", "Collectables", 800, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Electronics", 2600, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Body Spray", "Health & Beauty", 12, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lotion", "Health & Beauty", 9, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scented Candle", "Home", 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Contacts", "Eyewear", 80, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pets", 16, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Bed", "Pets", 30, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Welcome Mat", "Home", 15, 7);


select * from bamazon_db.products