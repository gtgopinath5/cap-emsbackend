import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expiration time
  });

};

export default generateTokenAndSetCookie;