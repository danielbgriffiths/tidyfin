export interface PlanEntity {
  id: string;
  stripe_price_id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class PlanDTO {
  id: string;
  stripePriceId: string;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}