var mysql = require("mysql");
var inquirer = require("inquirer");
var username = "";
var managerUsername = "Manager"
var managerPassword = "Admin"
var selectedProduct = "";
var currentQuantity = "";
var managerSelectedProduct = "";
var managerCurrentQuantity = "";
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
  password: "",
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
      choices: ["Check Catalog", "Order", "Login", "Logout", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.which === "Check Catalog") {
        readProducts();
      }
      else if (answer.which === "Order") {
        Order();
      }
      else if (answer.which === "Login") {
        Login();
      }
      else if (answer.which === "Logout") {
        username = "";
        password = "";
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

function Login() {
  inquirer
    .prompt({
      name: "Login",
      type: "input",
      message: "What is your username?",
    })
    .then(function (answer) {
      username = answer.Login;
      Password();
    })
}

function Password() {
  inquirer
    .prompt({
      name: "Password",
      type: "input",
      message: "What is your password?",
    })
    .then(function (answer) {
      password = answer.Password;
      if (password == managerPassword && username == managerUsername){
        manager();
      }else {console.log("Welcome " + username + "!")
      // console.log(username + " | " + managerUsername + " | " + password + " | " + managerPassword)
    start();}
    })
}

function manager() {
  inquirer
    .prompt({
      name: "which",
      type: "list",
      message: "Hello " + username + "! Welcome back! What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add new Product", "Logout", "EXIT"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.which === "View Products for Sale") {
        inventory();
      }
      else if (answer.which === "View Low Inventory") {
        lowInventory();
      }
      else if (answer.which === "Add to Inventory") {
        addInventory();
      }
      else if (answer.which === "Add new Product") {
        addProduct();
      }
      else if (answer.which === "Logout") {
        username = "";
        password = "";
        start();
      } else {
        connection.end();
      }
    });
}

function inventory() {
  console.log("Selecting all inventory...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
    console.log("Product ID: " + res[i].id + " | " + res[i].item_Name + " | Price: " + res[i].price + " | Quantity in stock: " + res[i].quantity + "\n");
    } 
    manager();
})};

function lowInventory() {
  console.log("Selecting all low inventory products...\n");
  connection.query("SELECT * FROM products WHERE quantity < 5", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++){
    console.log("Product ID: " + res[i].id + " | " + res[i].item_Name + " | Price: " + res[i].price + " | Quantity in stock: " + res[i].quantity + "\n");
    } 
    manager();
})};

function addInventory() {
  inquirer
    .prompt({
      name: "Update",
      type: "input",
      message: "Please input the product ID that would you like to update.",
    })
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      var query = '"' + answer.Update + '"';
      // console.log(answer.Order)
      // console.log(JSON.stringify(answer));
      connection.query("SELECT * FROM products WHERE id = " + query, function (err, results) {
        if (err) throw err;

        if (results != "") {
          // console.log(JSON.stringify(results));
          managerSelectedProduct = results[0].item_Name;
          managerCurrentQuantity = results[0].quantity;
          console.log("You have selected " + managerSelectedProduct);
          UpdateComplete();
        }
        else {
          console.log("Sorry, we were unable to find that product")
          manager();
        }
      });
    })
}

function UpdateComplete() {
  inquirer
    .prompt({
      name: "UpdateComplete",
      type: "input",
      message: "What quantity of " + managerSelectedProduct + " would you like to add? There are " + managerCurrentQuantity + " in stock.",
    })
    .then(function (answer) {
      managerSelectedAmount = answer.UpdateComplete;
      var MSA = managerSelectedAmount * 1;
      var MCQ = managerCurrentQuantity * 1;
      var remainingQuantity = MSA + MCQ;
      console.log(remainingQuantity);
      // console.log(JSON.stringify(answer));
      connection.query("UPDATE products SET ? WHERE ?",
        [
          {
            quantity: remainingQuantity
          },
          {
            item_Name: managerSelectedProduct
          }
        ],
        function (err, results) {
          if (err) throw err;

          if (results != "") {
            // console.log(JSON.stringify(results));
            console.log("There are now " + remainingQuantity + " in stock.");
            manager();
          }
          else {
            console.log("Sorry, we were unable to find that product");
            manager();
          }
        })
    })
}

function addProduct() {
  inquirer.prompt([
    {
    name: "productName",
    message: "What what is the name of the product you would like to add?"
  }, {
    name: "productCost",
    message: "How much does it cost?"
  }, {
    name: "productQuantity",
    message: "How many do you want to add?"
  }, {
    name: "productMaker",
    message: "Who is the manufacturer?"
  }, {
    name: "productCategory",
    message: "What category is it in?"
  }
]).then(function (answer) {
    var newProduct = answer.productName;
    var productCost = answer.productCost;
    var productQuantity = answer.productQuantity;
    var productMaker = answer.productMaker;
    var productCategory = answer.productCategory;
    console.log("We here");
    connection.query("INSERT INTO products SET ?",
    {
      item_Name: newProduct,
      price: productCost,
      quantity: productQuantity,
      manufacturer: productMaker,
      category: productCategory
    },
      function (err, results) {
        if (err) throw err;

        if (results != "") {
          // console.log(JSON.stringify(results));
          console.log(newProduct + " has been added to database. There are " + productQuantity + " in stock and they are priced at " + productCost + " each.");
          manager();
        }
        else {
          console.log("Sorry, we were unable to add this product, please contact system support.");
          manager();
        }
      })
  })
}
