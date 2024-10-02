import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  // Corrected the environment variable name
    expiresIn: '15d',
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",  // Fixed the typo from `samesite` to `sameSite`
  });

  return token;
};

export default generateTokenAndSetCookie;