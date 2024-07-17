export interface UserEntity {
  id: string;
  name: string;
  email: string;
  google_id?: string;
  stripe_customer_id?: string;
  status: string;
  access_token?: string;
  refresh_token?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class UserDTO {
  id: string;
  name: string;
  email: string;
  googleId?: string;
  stripeCustomerId?: string;
  status: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
