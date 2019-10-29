const mysql = require("mysql2");
const express = require('express');
var app = express();
const env = require('dotenv');
const helpers = require("./helper.js");

checkPassword = helpers.checkPassword;
// Load the environment
app.use(express.json())
const result = env.config();
if (result.error) { throw result.error; }
console.log(result.parsed);

// Connect to DB
const pool = mysql.createPool({
  host: process.env.YES,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
});


/********************************** ROUTING **********************************/
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/users', async (req, res) => {
    /*********  Queury Paramenters *********/
    try {
      var conn = pool.promise();
      var query_str =
        "SELECT * FROM UniversityEvents.Users";
      var [results] =  await conn.query(query_str);
      console.log(results);
      res.json(results);
    } 
    catch (e) {
      console.error(e);
      res.json({status: 'ERRORED'});
    }
});

app.post('/api/login', async (req, res) => {
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.username] 
    var query_str = 
      " SELECT \
          password, name \
        FROM \
          UniversityEvents.Users \
        WHERE \
          id = ? ";
    var [results] =  await conn.query(query_str, values);
    console.log(results[0].password);

    res.json({status: checkPassword(req.body.inputPassword, results[0].password)})
  } 
  catch (e) {
    console.error(e);
    res.json({status: 'ERRORED'});
  }
});
/***************************** END OF ROUTING ********************************/


// Start the server
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);