//  create tables
const populatedb = require('../../populatedb');

var schema = function (connection, my_credentials) {

    connection.query(`CREATE DATABASE IF NOT EXISTS ${my_credentials.database}`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    connection.changeUser({
        database: my_credentials.database
    }, function (err) {
        if (err) {
            console.log('Error in changing database', err);
            return;
        }
    });

    var createTable = "CREATE TABLE IF NOT EXISTS Product (                 \
                            id int NOT NULL AUTO_INCREMENT,                 \
                            name VARCHAR(255) NOT NULL,                     \
                            image VARCHAR(255) NOT NULL,                    \
                            description TEXT NOT NULL,                      \
                            price FLOAT NOT NULL,                           \
                            PRIMARY KEY (id))";
    connection.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("Product table created");
        populatedb.product(connection);
    });

    createTable = "CREATE TABLE IF NOT EXISTS User (                        \
                            id int NOT NULL AUTO_INCREMENT,                 \
                            username VARCHAR(255) NOT NULL,                 \
                            password VARCHAR(255) NOT NULL,                 \
                            PRIMARY KEY (id))";
    connection.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("User Table created");
        populatedb.user(connection);
    });

    createTable = "CREATE TABLE IF NOT EXISTS PurchaseOrder (               \
                            id int NOT NULL AUTO_INCREMENT,                 \
                            total_price FLOAT,                              \
                            userid int,                                     \
                            status VARCHAR(255),                            \
                            date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  \
                            FOREIGN KEY (userid) REFERENCES User(id),       \
                            PRIMARY KEY (id))";
    connection.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("PurchaseOrder Table created");
    });

    createTable =
        "CREATE TABLE IF NOT EXISTS Cart (                                                      \
                            productid  int NOT NULL,                                            \
                            orderid int NOT NULL,                                               \
                            qty int NOT NULL,                                                   \
                            PRIMARY KEY(productid, orderid),                                    \
                            FOREIGN KEY(productid) REFERENCES Product(id) ON DELETE CASCADE,    \
                            FOREIGN KEY(orderid) REFERENCES PurchaseOrder(id))";
    connection.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("Cart Table created");
    });

}

module.exports = schema;