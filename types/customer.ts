export type CustomerStatus = "active" | "inactive";

export interface CustomerDTO {
  key: string;
  name: string;
  phone: string;
  points: string;
  orders: string;
  spent: string;
  status: CustomerStatus;
}
