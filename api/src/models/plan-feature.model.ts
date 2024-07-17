import { PlanDTO } from "./plan.model";
import { FeatureDTO } from "./feature.model";

export interface PlanFeatureEntity {
  id: string;
  plan_id: string;
  feature_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class PlanFeatureDTO {
  id: string;
  plan: PlanDTO;
  feature: FeatureDTO;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
