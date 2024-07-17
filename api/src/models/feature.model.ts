export interface FeatureEntity {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export class FeatureDTO {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
