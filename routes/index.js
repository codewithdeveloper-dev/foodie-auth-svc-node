var express = require('express');
var router = express.Router();
const connection = require('../config/connection')
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', async function (req, res, next) {
  try {
    const responce = await connection.query('select * from Roles;');
    res.json(responce.rows)
  } catch (err) {
    console.error('Connection error:', err.stack);
    res.json(err.message)
  }
});


router.post('/register', async function (req, res, next) {

  const { UserName, Email, password, RollId } = req.body;
  
  try {
    const existingUser = await connection.query("select * from Userlist where username = '" + UserName + "' and email = '" + Email + "';");
    if (existingUser.rowCount) return res.status(400).json({ message: 'Email already exists' });
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await connection.query("insert into Userlist(UserName,Email,password,RollId) " +
      " values('" + UserName + "','" + Email + "','" + password + "','" + RollId + "')");

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});


module.exports = router;
