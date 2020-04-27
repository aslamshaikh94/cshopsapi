var mysql = require('mysql');

let connection = mysql.createConnection({
    host     : process.env.MYSQL_ADDON_HOST,
    database : process.env.MYSQL_ADDON_DB,
    user     : process.env.MYSQL_ADDON_USER,
    password : process.env.MYSQL_ADDON_PASSWORD
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // Create Database if not exists
  let sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

  connection.query(sql_mode, function (err, result) {
    if (err) throw err;
    console.log("ONLY_FULL_GROUP_BY");
  });
  
  // Create column for signup users
  let users = `CREATE TABLE IF NOT EXISTS users 
               (id INT AUTO_INCREMENT PRIMARY KEY, 
               fname VARCHAR(50), 
               lname VARCHAR(50), 
               usertype VARCHAR(100), 
               username VARCHAR(100), 
               email VARCHAR(100), 
               password VARCHAR(255), 
               address VARCHAR(255), 
               verified BOOLEAN, 
               created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(users, function (err, result) {
    if (err) throw err;
    console.log("Users Table created");
  });

  // Create TABLE for contact information
  let contact_info = `CREATE TABLE IF NOT EXISTS contact_info
               (id INT AUTO_INCREMENT PRIMARY KEY, 
               user_id INT(255),
               fname VARCHAR(50),
               phone VARCHAR(30),                
               email VARCHAR(100), 
               pincode VARCHAR(10), 
               countries VARCHAR(255), 
               states VARCHAR(255), 
               cities VARCHAR(255), 
               address VARCHAR(255),               
               created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(contact_info, function (err, result) {
    if (err) throw err;
    console.log("Users Table created");
  });

  // Create column for favorites product
  let favorite_cart_products = `CREATE TABLE IF NOT EXISTS favorite_cart_products 
                            (id INT AUTO_INCREMENT PRIMARY KEY, 
                            user_id INT(255),
                            product_id INT(255),
                            type VARCHAR(20),
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(favorite_cart_products, (err, result)=>{
    if (err) throw err;
    console.log("Products Table favorite_cart_products");
  });

  // Create column for Products
  let products = `CREATE TABLE IF NOT EXISTS products 
                  (id INT AUTO_INCREMENT PRIMARY KEY, 
                   seller_id INT(255),
                   categories VARCHAR(255),
                   type VARCHAR(255),
                   product_name VARCHAR(255),
                   purchase_price INT(255),
                   selling_price INT(255),
                   venders_price INT(255),
                   stock INT(255),
                   minorder INT(255),
                   warranty INT(100),
                   extra_fields LONGTEXT,
                   details LONGTEXT,
                   terms_conditions TEXT,
                   photos LONGTEXT,
                   thumbnail LONGTEXT,
                   created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(products, function (err, result) {
    if (err) throw err;
    console.log("Products Table created");
  });

  // Create column for enquiries
  let enquiries = `CREATE TABLE IF NOT EXISTS enquiries 
                   (id INT AUTO_INCREMENT PRIMARY KEY, 
                   user_id INT(255), 
                   product_id INT(255), 
                   seller_id INT(255), 
                   fullname VARCHAR(100),  
                   phone VARCHAR(100), 
                   email VARCHAR(100), 
                   address VARCHAR(100), 
                   message VARCHAR(255), 
                   reply_message VARCHAR(255),
                   quantity INT(100), 
                   created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`
  connection.query(enquiries, function (err, result) {
    if (err) throw err;
    console.log("enquiries Table created");
  });

  // Create column for vender requests
  let requests = `CREATE TABLE IF NOT EXISTS requests 
                  (id INT AUTO_INCREMENT PRIMARY KEY, 
                  user_id INT(255), 
                  request_id INT(255), 
                  status BOOLEAN NOT NULL DEFAULT 0, 
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(requests, function (err, result) {
    if (err) throw err;
    console.log("requests Table created");
  });

  // Create column for vender requests
  let orders = `CREATE TABLE IF NOT EXISTS orders 
                  (id INT AUTO_INCREMENT PRIMARY KEY, 
                  user_id INT(255),
                  product_id INT(255),
                  seller_id INT(255),
                  product_name VARCHAR(255),
                  quantity INT(255),
                  price INT(255),
                  status VARCHAR(255) NOT NULL DEFAULT 'pending',
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP )`;
  connection.query(orders, function (err, result) {
    if (err) throw err;
    console.log("orders Table created");
  });


});


module.exports  = connection;