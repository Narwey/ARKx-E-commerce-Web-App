const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/user');


const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.active !== true) {
      return res.status(401).json({ message: 'User is not active' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a payload object with user ID and role
    const payload = { userId: user._id, role: user.role };

    // Include the payload in the JWT
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300h' });

    // Set the access token in an HTTP-only cookie
    res.cookie('token', accessToken, { httpOnly: true });

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 300000,
      status: 200,
      message: 'Login success',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
        creationDate: user.creationDate,
        lastLogin: user.lastLogin,
        lastUpdate: user.lastUpdate,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

const AddUser = async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;
  console.log(firstName);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      role: role || 'manager',
      creationDate: new Date(),
    });

    // Send a notification email to the user with their credentials
    const emailBody = `
      Welcome, ${firstName} ${lastName}!\n
      Your account has been created with the following credentials:
      Username: ${username}
      Password: ${password}\n
      Please change your password after your first login for security.\n
      Thank you for using our service.
    `;

    // Use the configured transporter to send the email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SEND_EMAIL,
      to: email,
      subject: 'Welcome to Our Service',
      text: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

 const getUsers = async (req, res) => {
  const { page, sort } = req.query;


  try {
    const users = await User.find()

    // Format the response
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      creationDate: user.creationDate,
      lastLogin: user.lastLogin,
      lastUpdate: user.lastUpdate,
      active: user.active,
    }));

    res.status(200).json({
      status: 200,
      data: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};
  


const getUserById = async (req, res) => {
  try {
    const id = req.params.id; // Ensure you declare id using 'const'
    
    // Use the User.findById method to retrieve the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format the response in the desired structure
    const formattedUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.userName, // Note the corrected field name
      role: user.role,
      creationDate: user.creationDate,
      lastLogin: user.lastLogin,
      lastUpdate: user.lastUpdate,
      active: user.active,
    };

    res.status(200).json({
      status: 200,
      data: formattedUser, // Wrap the user object in an array
    });
  } catch (e) {
    res.status(400).json({ message: 'Cannot find user' });
  }
};

const searchUsers = async (req, res) => {
  const { query, page, sort } = req.query;

  // Define the default limit
  const defaultLimit = 10;

  try {
      const regexQuery = new RegExp(query, 'i');

      // Use Mongoose to search for users in the database
      const filteredUsers = await User.find({
          $or: [
              { firstName: { $regex: regexQuery } },
              { lastName: { $regex: regexQuery } },
              { email: { $regex: regexQuery } },
              { userName: { $regex: regexQuery } },
          ],
      });

      // Pagination, sorting, and response
      const pageInt = parseInt(page) || 1;
      const startIndex = (pageInt - 1) * defaultLimit;
      const endIndex = startIndex + defaultLimit;

      // Sort the results
      if (sort === 'DESC') {
          filteredUsers.sort((a, b) => b.creationDate - a.creationDate);
      } else {
          filteredUsers.sort((a, b) => a.creationDate - b.creationDate);
      }

      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      res.status(200).json({
          status: 200,
          data: paginatedUsers,
      });
  } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, role , active , password, email } = req.body;

  try {
      
      const update = await User.findByIdAndUpdate(id, { firstName, lastName, role , active, password, email , lastUpdate: new Date() });

      if (!update) {
          return res.status(404).json({ message: 'invalid user id' });
      }

      res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  

  try {
      const deleteUser = await User.findByIdAndDelete(id);

      if (!deleteUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
          status: 200,
          message: 'User deleted successfully'
      });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login , AddUser ,  getUserById , searchUsers , updateUser , deleteUser , getUsers
};
