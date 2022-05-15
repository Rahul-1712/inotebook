const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// Json web token secret key 

const JWT_SECRET_KEY = "JaiBajarangbali";

// Route 1: Create a new User using : POST "/api/auth/createuser". No login required.
router.post(
  "/createuser",
  [
    // name must be at least 3 characters
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    // email must be in proper format
    body("email", "Enter a valid email address").isEmail(),
    // password must be at least 8 chars long
    body("password", "Password must be 8 chars long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
      // if there are errors in input respond with bad request and show error.
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

    // Check if the user with this email exists or not

    try {

    // use await as User model returns promise
    let user = await User.findOne({email : req.body.email});
    if (user) {
        return res.status(400).json({success, errors: "User already exists"})
    }

    // Hashing the password before storing data in database
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    //   .then((user) => res.json(user))
    //   .catch(err => res.json({ errors: 'Please enter a unique email'}));

    const data = {
        user: {
            id: user.id,
        }
    }
    // creating a token to check if the user is a client not a hacker
    const authToken = jwt.sign(data, JWT_SECRET_KEY)
    success = true;
    res.json({success,authToken})

} catch (error) {
        console.error(error.message);
        res.json({error : "Internal server error"})
}
  }
);


//Route 2:  Create a new User using : POST "/api/auth/login". No login required.
router.post(
    "/login",
    [
      // email must be in proper format
      body("email", "Enter a valid email address").isEmail(),
      // password must be at least 8 chars long
      body("password", "Please enter a valid password").exists(),
    ],
    async (req, res) => {

      let success = false;
    // if there are errors in input respond with bad request and show error.
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
      }

      const {email, password} = req.body;
      try {
          //   Check if user exists in the database
          let user = await User.findOne({email});
          if (!user) {
              res.status(400).json({success: false, error: "Please enter valid credentials"});
          }

        //   Check if the password is correct by compariing the hash
        let passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            req.status(400).json({success: false, error: "Please enter valid credentials"})
        }

        const data = {
            user: {
                id: user.id,
            }
        }
        // creating a token to check if the user is a client not a hacker
        const authToken = jwt.sign(data, JWT_SECRET_KEY)
    
        res.json({success: true, authToken})

      } catch (error) {
        console.error(error.message);
        res.json({error : "Internal server error"})
      }


    }

);


//Route 3: Get user details using middleware fetchuser  : POST "/api/auth/getUser". Login required.
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.json({error : "Internal server error"})
    }
});

module.exports = router;
