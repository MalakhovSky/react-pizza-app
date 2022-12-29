export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  imageUrl: string;
  count: number;
}
export interface CartSliceState {
  totalPrice: number,
  items: CartItem[],
}