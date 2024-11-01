export interface IMemberShip {
  _id: string;
  userId:string;
  name: string;
  price: string;
  priceId: string;
  features: string[];
  isBlocked: boolean;
  users:string[]
}