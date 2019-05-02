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

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
function start() {
  selectedProduct = "";
  currentQuantity = "";
  selectedAmount = "";
  cartBalance = "";
  itemPrice = "";
  inquirer
    .prompt({
      name: "which",
      type: "list",
      message: "Hello! Welcome to Bamazon! Where would you like to go?",
      choices: ["Check Catalog", "Order", "Reset", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.which === "Check Catalog") {
        readProducts();
      }
      else if (answer.which === "Order") {
        Order();
      }
      else if (answer.which === "Reset") {
        start();
      } else {
        connection.end();
      }
    });
}
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    
    
    for (var i = 0; i < res.length; i++){
    console.log("Product ID: " + res[i].id + " | " + res[i].item_Name + " | Price: " + res[i].price + "\n");
    } 
    start();
})};


function Order() {
  inquirer
    .prompt({
      name: "Order",
      type: "input",
      message: "Please input the product ID that would you like to buy.",
    })
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      var query = '"' + answer.Order + '"';
      // console.log(answer.Order)
      // console.log(JSON.stringify(answer));
      connection.query("SELECT * FROM products WHERE id = " + query, function (err, results) {
        if (err) throw err;

        if (results != "") {
          // console.log(JSON.stringify(results));
          selectedProduct = results[0].item_Name;
          currentQuantity = results[0].quantity;
          itemPrice = results[0].price;
          console.log("You have selected " + selectedProduct);
          OrderComplete();
        }
        else {
          console.log("Sorry, we were unable to find that product")
          start();
        }
      });
    })
}

function OrderComplete() {
  inquirer
    .prompt({
      name: "OrderComplete",
      type: "input",
      message: "What quantity of " + selectedProduct + " would you like to purchase? There are " + currentQuantity + " in stock.",
    })
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      // var query = '"' + answer.OrderComplete + '"';
      selectedAmount = answer.OrderComplete;
      cartBalance = itemPrice * selectedAmount;
      var remainingQuantity = currentQuantity - selectedAmount;
      // console.log(answer.Order)
      // console.log(JSON.stringify(answer));
      if (selectedAmount <= currentQuantity){ 
      connection.query("UPDATE products SET ? WHERE ?",
        [
          {
            quantity: remainingQuantity
          },
          {
            item_Name: selectedProduct
          }
        ],
        function (err, results) {
          if (err) throw err;

          if (results != "") {
            // console.log(JSON.stringify(results));
            console.log("Your order of " + selectedAmount + " " + selectedProduct + " will cost a total of $" + cartBalance + ". Will that be cash or card?");
            start();
          }
          else {
            console.log("Sorry, we were unable to find that product");
            start();
          }
        })}
        else {console.log("We do not have enough stock to complete your order")
          start();};
    })
}


// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       genre: "eurodance"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }