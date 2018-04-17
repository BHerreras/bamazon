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
});
//Displays a list of all the products...
function displayProducts() {
	conn.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; ++i) {
			console.log(" ");
			console.log(results[i].id + " | Product Name: " + results[i].product_name);
			console.log("Price: $" + results[i].price);
			console.log("Quantity: " + results[i].stock_quantity);
		}
		userPrompt();
	});

	function userPrompt() {
		inquirer
			.prompt([
				{
					name: "item",
					type: "input",
					message: "What is the ID of the product you would like to purchase?"
				},
				{
					name: "amount",
					type: "input",
					message: "How many units would you like to buy?"
				}
			])
			.then(function (answer) {
				var productChoice = answer.item;
				var productAmount = answer.amount;

				conn.query("SELECT * FROM products WHERE ?",
					{
						id: productChoice
					},
					function (err, res) {
						if (err) throw err;
						var itemPrice = res[0].price;
						var itemStock = res[0].stock_quantity;

						if (productAmount <= itemStock) {
							conn.query(
								"UPDATE products SET ? WHERE ?",
								[
									{
										stock_quantity: itemStock - productAmount
									},
									{
										id: productChoice
									}
								],
								function (err) {
									if (err) throw err;
									console.log("Order Placed! Email confirmation will be sent shortly");
									conn.end();
								}
							);

						} else {
							console.log("Sorry, Insufficient Quantity. Please Check Back Later.");
							conn.end();
						}
					}
				)
			})
	}
};
displayProducts();