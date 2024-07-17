import { SubscriptionDTO } from "./subscription.model";

export interface InvoiceEntity {
  id: string;
  subscription_id: string;
  amount: number;
  issue_date: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class InvoiceDTO {
  id: string;
  subscription: SubscriptionDTO;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
