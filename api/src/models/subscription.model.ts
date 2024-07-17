import { PlanDTO } from './plan.model';
import { UserDTO } from './user.model';

export interface SubscriptionEntity {
  id: string;
  stripe_subscription_id: string;
  user_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface SubscriptionDTO {
  id: string;
  stripeSubscriptionId: string;
  plan: PlanDTO;
  user: UserDTO;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}