const mysql = require("mysql2");
const express = require('express');
var app = express();
const env = require('dotenv');
const helpers = require("./helper.js");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false)
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5 
  },
  fileFilter: fileFilter
});

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
app.post('/api/events/', async (req, res) => {
    try {
      var conn = pool.promise();
      const accesstoken = req.body.accesstoken;
      const values = [req.body.username];
      var query_str;
      switch(req.body.event_type){
        case "rso":
          query_str = "CALL UniversityEvents.getuserrsoevents(?)"
          break;
        case "private":
          query_str = "call UniversityEvents.getuserprivateevents(?)"
          break;
        case "public":
          query_str = "SELECT * FROM UniversityEvents.getallpublicevents"
          break;
        default:
          return res.json({
            "username" : req.body.username,
            "event_type" : req.body.event_type,
            "results" : "No results"
          })
      }
      
      var [results] =  await conn.query(query_str, values);
      return res.json({
        "username" : req.body.username,
        "event_type" : req.body.event_type,
        "results" : results
      });
    } 
    catch (e) {
      console.log(e);
      return res.json({status: 'ERRORED'});
    }
});

// assign super admins
app.post('/api/assign_super_admins', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id] 
    var query_str = 
      "INSERT INTO UniversityEvents.SuperAdmin VALUES (?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

app.post('/api/getSuperAdminById', async (req, res) => {
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.user_id] 
    var query_str =
      "SELECT * FROM UniversityEvents.SuperAdmin WHERE user_id=?";
    var [results] =  await conn.query(query_str, values);
    console.log(results);
    return res.json(results);
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// create admins
app.post('/api/create_admins', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, req.body.university_id] 
    var query_str = 
      "INSERT INTO UniversityEvents.Admins VALUES (?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// create universities
app.post('/api/create_universities', upload.single('pictures'), async (req, res) => {
  try {
    var conn = pool.promise();
    console.log("req.pictures: " + req.pictures)
    const values = [req.body.super_user_id, req.body.name, 
      req.file.path, req.body.location_address, req.body.num_of_students];
    var query_str = 
      "INSERT INTO UniversityEvents.Universities (super_user_id, name, pictures, location_address, num_of_students) VALUES (?, ?, ?, ?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// create RSO
app.post('/api/create_rso', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.admin_id
                    ,req.body.user_id1
                    ,req.body.user_id2
                    ,req.body.user_id3
                    ,req.body.user_id4
                    ,req.body.name
                    ,req.body.admin_university_id];
    var query_str = 
      "SELECT UniversityEvents.createrso(?, ?, ?, ?, ?, ?, ?) AS status";
    var [results] =  await conn.query(query_str, values);
    return res.json(results)
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// Get List of RSOs
app.get('/api/get_all_rsos', async (req, res) => {
  try {
    var conn = pool.promise();
    var query_str =
      "SELECT * FROM UniversityEvents.RSOs";
    var [results] =  await conn.query(query_str);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});
/***************************** END OF ROUTING ********************************/


// Start the server
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);