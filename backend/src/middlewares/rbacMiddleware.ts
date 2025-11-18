import { Request, Response, NextFunction } from "express";

export const rbacMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not authenticated" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        msg: `Forbidden: You do not have permission to access this resource. Requires: ${allowedRoles.join(" or ")}` 
      });
    }
    next();
  };
};