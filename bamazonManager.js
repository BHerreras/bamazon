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
				message: "Welcome, Manager, what would you like to do?",
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
			console.log(results[i].product_name + " | Id: " + results[i].item_id);
			console.log("Quantity in stock: " + results[i].stock_quantity);
		}

	});
}