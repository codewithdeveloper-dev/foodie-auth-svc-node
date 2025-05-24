var express = require('express');
var router = express.Router();
const connection = require('../config/connection')
require('dotenv').config();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ valid: false, message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};

router.post('/verifyToken', async function (req, res, next) {

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ valid: false, message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  const validtoken = await connection.query("select * from Userlist where AccessToken='" + token +"';");
  console.log(validtoken.rows.length);
  
  if(validtoken.rows.length === 0) {
    return res.status(401).json({ valid: false, message: 'Token Expired' });
  }else{
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  
      req.user = decoded;
      return res.status(200).json({valid:true,message:'Token Valid'})
    } catch (err) {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }

  }

});

router.post('/register', async function (req, res, next) {

  const { UserName, Email, password, RollId } = req.body;

  try {
    const existingUser = await connection.query("select * from Userlist where username = '" + UserName + "' and email = '" + Email + "';");
    if (existingUser.rowCount) return res.status(400).json({ message: 'Email already exists' });
    const user = await connection.query("insert into Userlist(UserName,Email,password,RollId) " +
      " values('" + UserName + "','" + Email + "','" + password + "','" + RollId + "')");

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});



router.post('/login', async function (req, res, next) {
  const { Email, password } = req.body;

  try {
    const sql = "select * from Userlist where password = '" + password + "' and email = '" + Email + "';"
    const user = await connection.query(sql);
    console.log(user);
    
    if (user.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    const token = jwt.sign({ Email: user.rows[0].email, password: user.rows[0].password }, process.env.JWT_SECRET);
    const sqlquery = "Update UserList Set AccessToken = '" + token + "' where password = '" + password + "' and email = '" + Email + "';"
    console.log(sqlquery);

    const update = await connection.query(sqlquery)

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }

});

router.get('/get', verifyToken, async function (req, res, next) {
  try {
    const responce = await connection.query('select * from Roles;');
    res.json(responce.rows)
  } catch (err) {
    console.error('Connection error:', err.stack);
    res.json(err.message)
  }
});

module.exports = router;
