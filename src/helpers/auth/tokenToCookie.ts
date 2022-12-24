import { Response } from "express";
import { AuthResponse } from "../../types/auth";

const date: Date = new Date(new Date().setDate(new Date().getDate() + 7));

const tokenToCookie = (
  res: Response,
  result: AuthResponse,
  statusCode: number
): Response => {
  if (result.success) {
    return res
      .cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        expires: date,
      })
      .status(statusCode)
      .json(result.user);
  }
  return res.status(statusCode).json(result.user)
};

export default tokenToCookie;
