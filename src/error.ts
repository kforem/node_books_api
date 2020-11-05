import { Request, Response, NextFunction } from "express";

export class StatusError extends Error {
  constructor(readonly error: string | object, readonly status: number) {
    super();
  }
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new StatusError("Not Found", 404);
  next(err);
}

export function errorHandler(
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.error, error: isProduction() ? {} : err.stack });
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}
