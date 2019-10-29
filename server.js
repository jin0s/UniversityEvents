const mysql = require("mysql2");
const express = require('express');
var app = express();
const env = require('dotenv');
checkPassword = require("./api/login.js").checkPassword;
require("./api/event.js");

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

  return res.json(customers);
});

app.get('/api/users', async (req, res) => {
    /*********  Queury Paramenters *********/
    try {
      var conn = pool.promise();
      var query_str =
        "SELECT name FROM UniversityEvents.Users";
      var [results] =  await conn.query(query_str);
      console.log(results);
      return res.json(results);
    } 
    catch (e) {
      console.error(e);
      return res.json({status: 'ERRORED'});
    }
});

app.post('/api/login', async (req, res) => {
  console.log("username: " + req.body.username)
  console.log("inputPassword: " + req.body.inputPassword)
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.username];
    var query_str = 
      " SELECT \
          password, name \
        FROM \
          UniversityEvents.Users \
        WHERE \
          id = ? ";
    var [results] =  await conn.query(query_str, values);
    console.log(results[0].password);
    return res.json({
      status: checkPassword(req.body.inputPassword, results[0].password)
    })
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

app.post('/api/signup', async (req, res) => {
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.username, req.body.password, req.body.name];
    var query_str = 
      " INSERT INTO UniversityEvents.Users VALUES (?, ?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// Get User Events
app.get('/api/events', async (req, res) => {
    try {
      var conn = pool.promise();
      var query_str =
        "SELECT * FROM UniversityEvents.Events";
      var [results] =  await conn.query(query_str);
      return res.json(results);
    } 
    catch (e) {
      return res.json({status: 'ERRORED'});
    }
});

// Create Events
app.post('/api/events', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [
           req.body.event_type_id
          ,req.body.name 
          ,req.body.datetime 
          ,req.body.description 
          ,req.body.contact_phone 
          ,req.body.contact_email 
        ];
    var query_str = 
      " INSERT INTO UniversityEvents.Events (\
           event_type_id \
          ,name \
          ,datetime \
          ,description \
          ,contact_phone \
          ,contact_email ) \
        VALUES \
           (?,?,?,?,?,?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

/***************************** END OF ROUTING ********************************/

// Start the server
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);