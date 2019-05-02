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