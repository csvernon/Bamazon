var mysql = require("mysql");
var inquirer = require("inquirer");
var selectedProduct = "";
var currentQuantity = "";
var selectedAmount = "";
var cartBalance = "";
var itemPrice = "";
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "UNCbootcamp2019=",
  database: "BamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
function start() {
  inquirer
    .prompt({
      name: "which",
      type: "list",
      message: "Hello! Welcome to Bamazon! Where would you like to go?",
      choices: ["Full Catalog", "Order", "Multi-hits", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.which === "Full Catalog") {
        readProducts();
      }
      else if(answer.which === "Order") {
        Order();
      }
      else if(answer.which === "Multi-hits") {
        multiSearch();
      } else{
        connection.end();
      }
    });
}
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
start();
  });
}

function Order() {
  inquirer
    .prompt({
      name: "Order",
      type: "input",
      message: "Please input the product ID that would you like to buy.",
    })
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      var query = '"' + answer.Order + '"';
      // console.log(answer.Order)
      // console.log(JSON.stringify(answer));
      connection.query("SELECT * FROM products WHERE id = " + query, function(err, results) {
        if (err) throw err;
        
            if (results != ""){
              // console.log(JSON.stringify(results));
              selectedProduct = results[0].item_Name;
              currentQuantity = results[0].quantity;
              itemPrice = results[0].price;
              console.log("You have selected " + selectedProduct);
              OrderComplete();
            }
            else {console.log("Sorry, we were unable to find that product")
            start();
          }
        });
})}

function OrderComplete() {
  inquirer
  .prompt({
    name: "OrderComplete",
    type: "input",
    message: "What quantity of " + selectedProduct + " would you like to purchase?",
  })
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    var query = '"' + answer.OrderComplete + '"';
    selectedAmount = answer.OrderComplete;
    cartBalance = itemPrice * selectedAmount;
    var remainingQuantity = currentQuantity - selectedAmount;
    // console.log(answer.Order)
    // console.log(JSON.stringify(answer));
    connection.query("UPDATE products SET ? WHERE ?",
         [
           {
             quantity: remainingQuantity
           },
           {
             item_Name: selectedProduct
           }
         ],
     function(err, results) {
      if (err) throw err;
      
          if (results != ""){
            // console.log(JSON.stringify(results));
            console.log("Your order of " + selectedAmount + " " + selectedProduct + " will cost a total of $" + cartBalance);
            start();
          }
          else {console.log("Sorry, we were unable to find that product");
        start();
        }
      });
})}