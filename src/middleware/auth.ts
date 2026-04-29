import { Role } from "../generated/prisma/enums";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { auth as batterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (roles: Role[] = []) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //   return res.status(401).json({ message: "No token provided" });
    // }

    // if (!authHeader.startsWith("Bearer ")) {
    //   return res.status(401).json({ message: "Invalid token format" });
    // }

    // const token = authHeader.split(" ")[1];

    // if (!token) {
    //   return res.status(401).json({ message: "No token provided" });
    // }

    //   if (!process.env.JWT_SECRET) {
    //     throw new Error("JWT_SECRET is not defined");
    //   }

    //   const decoded = jwt.verify( token,
    //     process.env.JWT_SECRET
    //   ) as JwtPayload;

    //   if (roles.length && !roles.includes(decoded.role)) {
    //     return res.status(403).json({ message: "Forbidden" });
    //   }

    //   req.user = decoded;


    try {




    const session = await batterAuth.api.getSession({
      headers: req.headers,
    });

    console.log("Session:", session);

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default auth;
