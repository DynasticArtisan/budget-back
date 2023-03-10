import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../exeptions/api.error";

export default function ErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  } else {
    console.log(err);
    return res.status(500).json({ message: "Произошла непредвиденная ошибка" });
  }
}
