import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(403).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
    console.log(decoded.id);
    req.body = { ...req.body, userId: decoded.id };
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

export default userAuth;
