import { SubscriptionDTO } from "./subscription.model";

export interface PaymentEntity {
  id: string;
  stripe_payment_intent_id: string;
  subscription_id: string;
  amount: number;
  payment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class PaymentDTO {
  id: string;
  stripePaymentIntentId: string;
  subscription: SubscriptionDTO;
  amount: number;
  paymentDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
