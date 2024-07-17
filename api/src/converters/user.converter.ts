import { UserEntity, UserDTO } from "../models/user.model";

export function entityToDTO(user: UserEntity): UserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    googleId: user.google_id,
    stripeCustomerId: user.stripe_customer_id,
    status: user.status,
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    deletedAt: user.deleted_at,
  };
}
