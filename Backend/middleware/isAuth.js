import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // !Read token from cookie
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token. Unauthorized." });
    }

    // !Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //! Set userId in request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};

export default isAuth;