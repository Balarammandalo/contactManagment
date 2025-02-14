const jwt = require("jsonwebtoken");

const User = require("../model/User");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(" ")[1]; //Bearer kasdhflasdhdasf
      
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.json({ error: "Unauthorized!" });
        }
        const user = await User.findOne({ _id: payload._id });
        req.user = user;
        next();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.json({ error: "Data not authorization" });
  }
};

module.exports = authMiddleware;
