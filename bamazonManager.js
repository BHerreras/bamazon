var mysql = require('mysql');
var inquirer = require("inquirer");

var conn = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'NicoleK528',
	database: 'bamazon_db'
})

conn.connect(function (err) {
	if (err) {
		throw err;
	}
	console.log("Connected as id = " + conn.threadId);
	managerMenu();
});

function managerMenu() {
	inquirer
		.prompt([
			{
				name: "manage",
				type: "list",
				message: "Manager View, what would you like to do?",
				choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
			}
		])
		.then(function (answer) {
			switch (answer.manage) {
				case "View Products for Sale":
					viewProducts();
					break;

				case "View Low Inventory":
					viewLow();
					break;

				case "Add to Inventory":
					restock();
					break;

				case "Add New Product":
					newProduct();
					break;
			}

		});

}
function viewProducts() {
	conn.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; ++i) {
			console.log(" ");
			console.log(results[i].id + " | Product Name: " + results[i].product_name);
			console.log("Price: $" + results[i].price);
		}


	});
}
function viewLow() {
	conn.query("SELECT * FROM products WHERE stock_quantity <= 3", function (err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; ++i) {
			console.log(" ");
			console.log(results[i].product_name + " | Id: " + results[i].id);
			console.log("Quantity in stock: " + results[i].stock_quantity);

			if (results[i].stock_quantity <= 3) {
				inquirer
					.prompt([
						{
							name: "add",
							type: "list",
							message: "Would you like to add more?",
							choices: ["Sure", "Not Now"]
						},
					])
					.then(function (answer) {
						switch (answer.manage) {
							case "Sure":
								restock();
								break;
						}
					});

			} else {
				console.log("Inventory Stock is all good")
			}
		}

	});
}
function newProduct() {
	inquirer
		.prompt([
			{
				name: "name",
				type: "input",
				message: "What is the name of the new product?"
			},
			{
				name: "department",
				type: "list",
				message: "What department will this go in?"
			},
			{
				name: "price",
				type: "input",
				message: "What is the price of the new product?"
			},
			{
				name: "quantity",
				type: "input",
				message: "How many are we adding?"
			}
		])
		.then(function (answer) {
			conn.query(
				"INSERT INTO products SET ?",
				{
					product_name: answer.name,
					department_name: answer.department,
					price: answer.price,
					stock_quantity: answer.quantity
				},
				function (err) {
					if (err) throw err;
					console.log("New Product Added");
				}
			);
		});
}
function restock() {
	conn.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		var currentStock = results.stock_quantity;
		inquirer
			.prompt([
				{
					name: "itemOptions",
					type: "list",
					message: "Which item are we restocking?",
					choices: function () {
						var choiceItem = [];
						for (var i = 0; i < results.length; i++) {
							choiceItem.push(results[i].item_name);
						}
						return choiceItem;
					}
				},
				{
					name: "quantity",
					type: "input",
					message: "How many units are we adding?",
				}
			])
			.then(function (answer) {
				conn.query("UPDATE products SET ? WHERE ?", [
					{
						stock_quantity: currentStock + answer.quantity
					},
					{
						product_name: answer.itemOptions
					},
					function (err) {
						if (err) throw err;
						console.log("Quantity Updated");
					}]
				);
			})
	});
}
