export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  initialStock: number;
  salesActive: boolean;
  salesStartTime: Date;
  salesEndTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
