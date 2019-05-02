DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_Name VARCHAR(45) NOT NULL,
  price DECIMAL(10) NOT NULL,
  quantity DECIMAL(10) NOT NULL,
  manufacturer VARCHAR(45) NOT NULL,
  category VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("toilet paper", "10", "100", "Charmin", "bathroom");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("lawn chain", "35", "2", "Cheap Chinese Knockoffs", "outdoor");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("55in TV", "400", "4", "Vizio", "electronics");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("19in Tire", "100", "4", "Michilen", "automotive");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Women's large T-shirt", "12", "14", "Merano", "clothing");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Men's large T-shirt", "10", "15", "Merano", "clothing");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Queen Bedsheet", "50", "8", "Cheap Chinese Knockoffs", "bedroom");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Toothpaste", "6", "30", "Crest", "bathroom");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Shovel", "20", "11", "Black & Decker", "outdoor");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Xbox Two", "450", "7", "Microsoft", "electronics");

INSERT INTO products (item_Name, price, quantity, manufacturer, category)
VALUES ("Playstation 5", "500", "10", "Sony", "electronics");