import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "1h" });
};

export default generateToken;
