import { validateBook } from "./validateBook";
import { Request, Response, NextFunction } from "express";

export function validate(req: Request, res: Response, next: NextFunction) {
  const validateErrors = validateBook(req.body);

  if (validateErrors) {
    const error = new Error();
    // @ts-ignore
    error.message = validateErrors;
    // @ts-ignore
    error.status = 400;
    next(error);
  } else {
    next();
  }
}
