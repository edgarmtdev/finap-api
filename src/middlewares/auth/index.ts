import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import config from "../../config";

const authValidation = (role: Role) => {
  return (req, res: Response, next: NextFunction) => {
    req.role = role;
    return validateToken(req, res, next);
  };
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log(req.cookies);

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provider",
    });
  }
  return verifyToken(token, req, res, next);
};

const verifyToken = (token: string, req, res: Response, next: NextFunction) => {
  try {
    const decoded: string | Jwt.JwtPayload = Jwt.verify(
      token,
      config.jwtSecret
    );
    if (typeof decoded !== "string") {
      delete decoded.iat;
      delete decoded.exp;
    }
    req.user = decoded;
    return validateRole(req, res, next);
  } catch ({ message, name }) {
    console.log(message);
    return res.status(403).json({
      success: false,
      message,
      type: name,
    });
  }
};

const validateRole = (req, res: Response, next: NextFunction) => {
  console.log(req.user.role, req.role);
  if (req.user.role === req.role) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Dont have permissions",
  });
};

export default authValidation;
