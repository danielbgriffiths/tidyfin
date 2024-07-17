import passport from "passport";
import {
  Profile as GoogleProfile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

import * as userService from "../services/user.service";
import * as userConverter from "../converters/user.converter";
import { UserEntity } from "../models/user.model";

passport.use(
  "google-web",
  new GoogleStrategy(
    {
      clientID: process.env.WEB_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.WEB_GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback,
    ): Promise<any> => {
      try {
        const user = await userService.getByGoogleIdOrCreateWithProfile(
          profile,
          accessToken,
          refreshToken,
        );
        return done(null, userConverter.entityToDTO(user));
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  "google-ios",
  new GoogleStrategy(
    {
      clientID: process.env.IOS_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.WEB_GOOGLE_CLIENT_SECRET!,
      callbackURL: "com.danielbgriffiths.tidyfin:/auth-google-redirect-ios",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: VerifyCallback,
    ): Promise<any> => {
      try {
        const user = await userService.getByGoogleIdOrCreateWithProfile(
          profile,
          accessToken,
          refreshToken,
        );
        return done(null, userConverter.entityToDTO(user));
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user: any, done): void => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done): Promise<void> => {
  try {
    const user = await userService.getById(id);
    done(null, userConverter.entityToDTO(user));
  } catch (err) {
    done(err);
  }
});

export { passport };
