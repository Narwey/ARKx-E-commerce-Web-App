const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Customer = require('../models/customer');

const loginCustomers = async (req, res) => {
  const { username, password } = req.body;

  try {
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!customer.active) {
      return res.status(401).json({ message: 'Customer is not active' });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = { userId: customer._id, role: 'customer' }; // Assuming all logins are for customers

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300h' });

    res.cookie('token', accessToken, { httpOnly: true });

    customer.lastLogin = new Date();
    await customer.save();

    res.status(200).json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 300000,
      status: 200,
      message: 'Login success',
      customer: {
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        role: 'customer', // Set role to 'customer' as all logins are for customers
        creationDate: customer.creationDate,
        lastLogin: customer.lastLogin,
        validAccount: customer.validAccount,
        active: customer.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};



const AddCustomer = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newCustomer = await Customer.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
  };

  const getCustomers = async (req, res) => {
    const { page, sort } = req.query;
    const defaultLimit = 10;
  
    try {
      const currentPage = parseInt(page) || 1;
      const sortOrder = sort === 'ASC' ? 'asc' : 'desc';
  
      const customers = await Customer.find()
        .skip((currentPage - 1) * defaultLimit)
        .limit(defaultLimit)
        .sort({ creationDate: sortOrder });
  
      if (!customers || customers.length === 0) {
        return res.status(200).json({ status: 200, data: [] });
      }
  
      // Format the response
      const formattedCustomers = customers.map((customer) => ({
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        username: customer.username,
        role: 'customer', // All users are customers in this context
        creationDate: customer.creationDate,
        lastLogin: customer.lastLogin,
        validAccount: customer.validAccount,
        active: customer.active,
      }));
  
      res.status(200).json({
        status: 200,
        data: formattedCustomers,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving customers' });
    }
  };

  const searchCustomers = async (req, res) => {
    try {
      let filteredCustomers;
  
      if (req.query && req.query.query && req.query.page && req.query.sort) {
        const { query, page, sort } = req.query;
        const regexQuery = new RegExp(query, 'i');
  
        filteredCustomers = await Customer.find({
          $or: [
            { firstName: { $regex: regexQuery } },
            { lastName: { $regex: regexQuery } },
            { email: { $regex: regexQuery } },
            { username: { $regex: regexQuery } },
          ],
        });
  
        // Pagination, sorting
        const defaultLimit = 10;
        const pageInt = parseInt(page) || 1;
        const startIndex = (pageInt - 1) * defaultLimit;
        const endIndex = startIndex + defaultLimit;
  
        if (sort === 'DESC') {
          filteredCustomers.sort((a, b) => b.creationDate - a.creationDate);
        } else {
          filteredCustomers.sort((a, b) => a.creationDate - b.creationDate);
        }
  
        filteredCustomers = filteredCustomers.slice(startIndex, endIndex);
      } else {
        filteredCustomers = await Customer.find();
      }
  
      res.status(200).json({
        status: 200,
        data: filteredCustomers,
      });
    } catch (error) {
      console.error('Error searching customers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getCustomerById = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Use the Customer.findById method to retrieve the customer by ID
      const customer = await Customer.findById(id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Format the response in the desired structure
      const formattedCustomer = {
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        creationDate: customer.creationDate,
        lastLogin: customer.lastLogin,
        validAccount: customer.validAccount,
        active: customer.active,
      };
  
      res.status(200).json({
        status: 200,
        data: formattedCustomer,
      });
    } catch (error) {
      console.error('Error finding customer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateCustomer =  async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, password, email } = req.body;
  
    try {
      const update = await Customer.findByIdAndUpdate(id, {
        firstName,
        lastName,
        password,
        email,
      });
  
      if (!update) {
        return res.status(404).json({ message: 'Invalid customer id' });
      }
  
      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteCustomer = await Customer.findByIdAndDelete(id);
  
        if (!deleteCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
  
        res.status(200).json({
            status: 200,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        console.log("wach hadi li fiha l error" , error.message);
        res.status(500).json({ message: error.message });
    }
  };

  const getCustomerProfile = async (req) => {
    const token = req.headers.authorization.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.role !== "customer") {
        throw new Error("Not authorized");
      }
  
      const customer = await Customer.findById(decoded.id);
  
      if (!customer) {
        throw new Error("Customer not found");
      }
  
      // Remove the password field from the customer object
      delete customer.password;
  
      const response = {
        status: 200,
        data: [customer],
      };
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateCustomerProfile = async (req) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.role !== "customer") {
        throw new Error("Not authorized");
      }
  
      const customerId = decoded.id;
  
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        throw new Error("Customer not found");
      }
  
      // Update customer data
      customer.firstName = req.body.firstName;
      customer.lastName = req.body.lastName;
      customer.email = req.body.email;
  
      // Save the updated customer data
      await customer.save();
  
      const response = {
        status: 200,
        data: customer,
      };
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
module.exports = {
  AddCustomer , 
  loginCustomers , 
  getCustomers , 
  searchCustomers , 
  getCustomerById , 
  updateCustomer , 
  deleteCustomer ,
  getCustomerProfile ,
  updateCustomerProfile ,

}