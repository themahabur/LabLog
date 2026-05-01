import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { auth as batterAuth } from "../lib/auth";
import { Roles } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: Roles;
        emailVerified: boolean;
      };
    }
  }
}

const authorize = (...roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await batterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // if (!session.user.emailVerified) {
      //   return res.status(403).json({
      //     success: false,
      //     message: "Email verification required. Please verfiy your email!",
      //   });
      // }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as Roles,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as Roles)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default authorize;
