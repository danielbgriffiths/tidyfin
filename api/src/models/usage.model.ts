import { SubscriptionDTO } from "./subscription.model";
import { FeatureDTO } from "./feature.model";

export interface UsageEntity {
  id: string;
  subscription_id: string;
  feature_id: string;
  usage_date: string;
  amount: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class UsageDTO {
  id: string;
  subscription: SubscriptionDTO;
  feature: FeatureDTO;
  usageDate: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
