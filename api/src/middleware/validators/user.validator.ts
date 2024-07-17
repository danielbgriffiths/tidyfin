import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../models/user.model";

export function isUserOwner(req: Request, res: Response, next: NextFunction) {
  if ((req.user as unknown as UserEntity).id === req.params.id) return next();
  res.status(401).json({ message: "Unauthorized" });
}
