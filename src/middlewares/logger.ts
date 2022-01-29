import { Response, NextFunction } from "express";

export function logger(req: any, res: Response, next: NextFunction) {
  console.log({
    body: JSON.stringify(req.body),
    params: JSON.stringify(req.params),
    query: JSON.stringify(req.query),
  });
  next();
}
