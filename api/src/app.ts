import "reflect-metadata";
import express from "express";
import session from "express-session";

import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { passport } from "./utils/passport";
import { authenticated } from "./middleware/authenticated.middleware";

const PORT = process.env.PORT || 3000;

function onListen(): void {
  console.log(`[server]: Server is running on: ${PORT}`);
}

export function createExpressApplication(): void {
  const app = express();

  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", authRouter);
  app.use("/user", authenticated, userRouter);

  app.listen(PORT, onListen);
}
