import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  const secret = (process.env.JWT_SECRET! || "chatbot") as jwt.Secret;
  const expiresIn = (process.env.EXPIRES_IN! || "7d") as any;

  return jwt.sign({ id: userId }, secret, {
    expiresIn,
  });
};

const verifyToken = (token: string) => {
  const secret = (process.env.JWT_SECRET! || "chatbot") as jwt.Secret;
  const TOKEN = token.replace("Bearer ", "");
  const decodedToken = jwt.verify(TOKEN, secret) as jwt.JwtPayload;
  const { id } = decodedToken;
  return id;
};

export { generateToken, verifyToken };
