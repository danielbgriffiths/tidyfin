import { Router, Request, Response, NextFunction } from "express";

import { passport } from "../utils/passport";
import { UserDTO } from "../models/user.model";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google-web", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google-web", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.json({
      accessToken: (req.user as unknown as UserDTO).accessToken,
    });
  },
);

authRouter.get(
  "/google/ios",
  passport.authenticate("google-ios", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback/ios",
  passport.authenticate("google-ios", { failureRedirect: "/" }),
  (req, res) => {
    res.json({
      accessToken: (req.user as unknown as UserDTO).accessToken,
    });
  },
);

authRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

authRouter.get("/current_user", (req: Request, res: Response) => {
  res.send(req.user);
});

export { authRouter };
