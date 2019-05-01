DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_Name VARCHAR(45) NOT NULL,
  price DECIMAL(10) NOT NULL,
  manufacturer VARCHAR(45) NOT NULL,
  category VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_Name, price, manufacturer, category)
VALUES ("toilet paper", "10", "Charmin", "bathroom");

INSERT INTO products (item_Name, price, manufacturer, category)
VALUES ("lawn chain", "35", "Cheap Chinese Knockoffs", "outdoor");

INSERT INTO products (item_Name, price, manufacturer, category)
VALUES ("55in TV", "400", "Vizio", "electronics");