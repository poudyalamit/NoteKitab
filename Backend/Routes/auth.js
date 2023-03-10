// const { json } = require('express')
const express = require('express');
const User = require('../Models/User');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "lolrebot"
// Route 1:create a user using: POST "/api/auth/createUser" no login required
router.post('/createUser', [
  body('name', "Enter a valid name").isLength({ min: 5 }),
  body('email', "Enter a valid E-mail").isEmail(),
  body('password', "Password must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether user with this email exists already
  try {      //making a try catch block to check the error occuring while passing data 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = bcrypt.genSaltSync(5);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error: 'Please enter unique value for email',message:err.message})})
    // console.log(req.body);  
    // const user=User(req.body);
    // user.save()
    // res.send(req.body)
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtdata);

    // res.json(user)
    res.json(authtoken);
  } catch (error) {      //catching the errors occured
    console.error(error.message);
    res.status(500).send("some error occured"); //to get the bad request of error
  }

})
// Route 2: authenticate a user using POST "/api/auth/login" No login required
router.post('/login', [
  body('email', "Enter a valid E-mail").isEmail(),
  body('password', "Password cannot be blank").exists(),

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const PasswordCompare = await bcrypt.compare(password, user.password);
    if (!PasswordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json(authtoken);
  } catch (error) {      //catching the errors occured
    console.error(error.message);
    res.status(500).send("Internal Server Error"); //to get the bad request for error
  }
});


//Route 3: Get logged in user details using: POST "/api/auth/getuser", login required
router.post('/getuser',fetchuser, async (req, res) => {
  
  try {
    userId= req.user.id;
    // console.log(userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {      //catching the errors occured
    console.error(error.message);
    res.status(500).send("Internal Server Error"); //to get the bad request for error
  }
})

module.exports = router