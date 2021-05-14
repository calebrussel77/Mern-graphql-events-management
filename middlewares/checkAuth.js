const jwt = require("jsonwebtoken");

module.exports = async (req, resp, next) => {
  try {
    const authHeader = req.headers?.authorization;
    req.userData = null;
    req.isAuth = null;

    if (!authHeader) {
      req.isAuth = false;
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
      req.isAuth = false;
      return next();
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    req.userData = {
      _id: decodedToken.userId,
      name: decodedToken.name,
      email: decodedToken.email,
    };
    req.isAuth = true;
    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
