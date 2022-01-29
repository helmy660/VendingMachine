import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/secrets";

export function auth(req: Request & { payload: any }, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error(`Token doesn't exist: ${token}`);
    }
    const payload = jwt.verify(token, JWT_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: "Access denied. Invalid token, Please try to relogin",
    });
  }
}
