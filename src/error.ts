import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.message, error: isProduction() ? {} : err.stack });
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}
