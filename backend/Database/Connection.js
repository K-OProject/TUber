const mysql = require("mysql");

var Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "changeme",
  database: "tuber",
  multipleStatements: true,
});

Connection.connect((err) => {
  if (!err) console.log("Database connected successfully");
  else console.log("Connection failed");
});
module.exports = Connection;
