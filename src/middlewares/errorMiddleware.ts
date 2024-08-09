import { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError } from "../utils/errorHandle";
const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(err, res);
};

export default errorMiddleware;
