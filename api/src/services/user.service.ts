import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as AppleProfile } from "passport-apple";

import { UserEntity } from "../models/user.model";
import { pool } from "../database/pool";

export async function getById(id: string): Promise<UserEntity> {
  const client = await pool.connect();

  const result =
    await client.sql<UserEntity>`SELECT * FROM users WHERE id = ${id}`;

  client.release();

  if (!result.rows?.at(0)) {
    throw new Error("User not found");
  }

  return result.rows.at(0)!;
}

export async function getByGoogleIdOrCreateWithProfile(
  profile: GoogleProfile,
  accessToken: string,
  refreshToken: string,
): Promise<UserEntity> {
  const client = await pool.connect();

  let result =
    await client.sql<UserEntity>`SELECT * FROM users WHERE google_id = ${profile.id}`;

  if (!profile.emails?.[0]?.value) {
    throw new Error("No email in profile!");
  }

  if (!result.rows?.at(0)) {
    result = await client.sql<UserEntity>`
      INSERT INTO users (google_id, name, email, access_token, refresh_token)
      VALUES (${profile.id}, ${profile.displayName}, ${profile.emails[0].value!}, ${accessToken}, ${refreshToken})
      RETURNING *
    `;
  } else {
    result = await client.sql<UserEntity>`
      UPDATE users
      SET access_token = ${accessToken}, refresh_token = ${refreshToken}
      WHERE google_id = ${profile.id} AND id = ${result.rows.at(0)!.id}
      RETURNING *
    `;
  }

  client.release();

  if (!result.rows?.at(0)) {
    throw new Error("User not found");
  }

  return result.rows.at(0)!;
}
