const mysql = require("mysql2");
const express = require('express');
var app = express();
const env = require('dotenv');
const helpers = require("./helper.js");
const multer = require('multer');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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

// Get User by ID
app.get('/api/getUserById', async (req, res) => {
  try {
    var conn = pool.promise();
    const id = req.query.id;
    var query_str =
      "SELECT * FROM UniversityEvents.Users \
       WHERE id = ?";
    var [results] =  await conn.query(query_str, id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

// Get UniversityId by usefId
app.get('/api/getUniversityIdByUserId', async (req, res) => {
  try {
    var conn = pool.promise();
    const id = req.query.user_id;
    var query_str =
      "SELECT university_id FROM UniversityEvents.StudentOf \
      WHERE user_id = ?";
    var [results] =  await conn.query(query_str, id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

// Get UniversityId by university name
app.get('/api/getUniversityIdByName', async (req, res) => {
  try {
    var conn = pool.promise();
    const name = req.query.name;
    var query_str =
      "SELECT id FROM UniversityEvents.Universities \
      WHERE name = ?";
    var [results] =  await conn.query(query_str, name);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
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

app.post('/api/studentOf', async (req, res) => {
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, req.body.university_id];
    var query_str = 
      " INSERT INTO UniversityEvents.StudentOf VALUES (?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
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

// get public events by uni id
app.get('/api/events', async (req, res) => {
  try {
    var conn = pool.promise();
    var id = req.query.uni;
    var event_id = req.query.id;
    var query_str =
        "CALL geteventsbyuniversity(?)";
    if(event_id != null) {
      query_str = "SELECT * FROM UniversityEvents.Events WHERE id = ?"
      id = event_id;
    }
    var [results] =  await conn.query(query_str, id);
    console.log(results);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

// get list of event categories
app.get('/api/events_categories', async (req, res) => {
  try {
    var conn = pool.promise();
    var query_str = "SELECT * FROM UniversityEvents.EventsTypes";
    var [results] =  await conn.query(query_str);
    console.log(results);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
  
});

// create events
app.post('/api/create_event', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.event_category,
                    req.body.name,
                    req.body.datetime,
                    req.body.description,
                    req.body.contact_phone,
                    req.body.contact_email ]
    const rso_id = req.body.rso_id;
    const admin_id = req.body.admin_id;
    switch(req.body.event_type){
      case "rso":
        values.push(rso_id)
        query_str = "CALL UniversityEvents.creatersoevent(?, ?, ?, ?, ?, ?, ?)"
        break;
      case "private":
        values.push(admin_id);
        query_str = "CALL UniversityEvents.createprivateevent(?, ?, ?, ?, ?, ?, ?)"
        break;
      case "public":
        values.push(admin_id);
        query_str = "CALL UniversityEvents.createpublicevent(?, ?, ?, ?, ?, ?, ?)"
        break;
      default:
        return res.json({status: 'ERRORED'})
    }
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED', info: e});
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

app.post('/api/getAdminById', async (req, res) => {
  /*********  Queury Paramenters *********/
  try {
    var conn = pool.promise();
    const values = [req.body.user_id] 
    var query_str =
      "SELECT * FROM UniversityEvents.Admins WHERE user_id=?";
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

// change admins
app.post('/api/change_admins', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, req.body.admin_id] 
    console.log("incomeing values " + values);
    var query_str = 
      "UPDATE UniversityEvents.Admins SET user_id = ? WHERE user_id = ? ";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0});
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

// Get User Avaiable RSOs To Join
app.get('/api/user_rso', async (req, res) => {
  try {
    var conn = pool.promise();
    var id = req.query.user_id;
    var query_str =
        "CALL getusersavailablerso(?)";
    var [results] =  await conn.query(query_str, id);
    console.log(results);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

// Get RSO by ID
app.get('/api/rsos', async (req, res) => {
  try {
    var conn = pool.promise();
    const id = req.query.id;
    var query_str =
      "SELECT * FROM UniversityEvents.RSOs \
       WHERE id = ?";
    var [results] =  await conn.query(query_str, id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

// Join RSO
app.post('/api/join_rso', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, 
                    req.body.rso_id];
    var query_str = 
      "INSERT INTO UniversityEvents.Member (user_id, RSO_id) VALUES (?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

// Create a comment
app.post('/api/comment', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, 
                    req.body.event_id,
                    req.body.description,
                    req.body.rating]; 
    var query_str = 
      "INSERT INTO Comments (user_id, event_id, description, rating) VALUES (?, ?, ?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0})
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});


app.get('/api/comment', async (req, res) => {
  try {
    var conn = pool.promise();
    const event_id = req.query.event_id;
    var query_str =
      "SELECT * FROM UniversityEvents.Comments \
       WHERE event_id = ?";
    var [results] =  await conn.query(query_str, event_id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});


// Get Locaiton by User
app.get('/api/location', async (req, res) => {
  try {
    var conn = pool.promise();
    const id = req.query.user_id;
    var query_str =
      "CALL UniversityEvents.getallavaiablelocationsforuser(?)";
    var [results] =  await conn.query(query_str, id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

app.post('/api/location', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.location_name, 
                    req.body.location_address,
                    req.body.location_city,
                    req.body.location_state,
                    req.body.location_zip,
                    req.body.location_lat,
                    req.body.location_long]; 
    var query_str = 
      "SELECT UniversityEvents.addlocation(?, ?, ?, ?, ?, ?, ?) AS status";
    var [results] =  await conn.query(query_str, values);
    return res.json(results)
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

app.post('/api/eventsbylocation', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.user_id, 
                    req.body.location_name]; 
    var query_str = 
      "CALL UniversityEvents.getalluserseventsbasedonlocation(?, ?)";
    var [results] =  await conn.query(query_str, values);
    return res.json(results)
  } 
  catch (e) {
    console.error(e);
    return res.json({status: 'ERRORED'});
  }
});

app.get('/api/managerso', async (req, res) => {
  try {
    var conn = pool.promise();
    const id = req.query.admin_id;
    var query_str =
      "SELECT id, name FROM UniversityEvents.RSOs WHERE user_id = ?";
    var [results] =  await conn.query(query_str, id);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

app.get('/api/members', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.query.rso_id, req.query.user_id];
    var query_str =
      "SELECT user_id FROM UniversityEvents.Member WHERE rso_id = ? AND user_id <> ?";
    var [results] =  await conn.query(query_str, values);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});

app.get('/api/approve_events', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.query.user_id];
    var query_str = "SELECT \
                       e.id \
                      ,e.event_type_id \
                      ,e.name \
                      ,e.datetime \
                      ,e.description \
                      ,e.contact_phone \
                      ,e.contact_email \
                      FROM UniversityEvents.Create_Public cp \
                    INNER JOIN UniversityEvents.Events e \
                      ON e.id = cp.event_id \
                      AND cp.super_admin_id = ? \
                      AND cp.approved = 0"
    var [results] =  await conn.query(query_str, values);
    return res.json(results);
  } 
  catch (e) {
    console.log(e);
    return res.json({status: 'ERRORED'});
  }
});


// Manage Events
app.post('/api/manage_events', async (req, res) => {
  try {
    var conn = pool.promise();
    const values = [req.body.approved, req.body.event_id] 
    console.log("incomeing values " + values);
    var query_str = 
      "UPDATE UniversityEvents.Create_Public SET approved = ? WHERE event_id = ? ";
    var [results] =  await conn.query(query_str, values);
    return res.json({status: 0});
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