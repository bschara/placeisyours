// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   console.log(token);
//   console.log("secret key: ", process.env.SECRET_KEY);
//   if (!token) {
//     return res.status(403).send({ message: "No token provided." });
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(500).send({ message: "Failed to authenticate token." });
//     }

//     // Save the decoded user ID to request object
//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove "Bearer " from the string
  }
  console.log("Token after removing Bearer prefix:", token);
  console.log("Secret key: ", process.env.SECRET_KEY);

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    // Save the decoded user ID to request object
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
