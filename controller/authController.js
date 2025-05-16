const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../Model/User');
// const Role = require('../Model/Role');

const register = async (req, res) => {
  const { UserName, Email, password, RollId } = req.body;
  try {
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      UserName,
      Email,
      password: hashedPassword,
      RollId: RollId || 3,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { Email, password } = req.body;
  try {
    const user = await User.findOne({ where: { Email }, include: Role });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user.UserId, role: user.Role.Roll },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

const validateToken = (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
};

module.exports = { register, login, validateToken };
