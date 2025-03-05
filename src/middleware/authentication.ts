import { Request, Response, NextFunction } from "express";
import variables from "../utils/variable";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = variables.AUTH.JWT_SECRET || process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT secret is not defined in the enviroment variable");
}

interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
