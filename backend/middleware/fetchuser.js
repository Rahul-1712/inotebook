const jwt = require("jsonwebtoken");

// Json web token secret key 

const JWT_SECRET_KEY = "JaiBajarangbali";

const fetchuser = (req, res, next) => {
    // Get the user from JWT token and add the id to the req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).json({error: "Please authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).json({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;