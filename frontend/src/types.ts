export interface User {
  _id: string;
  username: string;
  game_account: string;
  level: number;
  status: string;
  total_spending: number;
  last_login: string;
}

export interface Item {
  _id: string;
  name: string;
  category: string;
  rarity: string;
  price: number;
}

export interface OrderItem {
  item_id: Item;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user_id: { username: string; game_account: string };
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

export interface Payment {
  _id: string;
  user_id: { username: string; game_account: string };
  amount: number;
  provider: string;
  status: string;
  created_at: string;
}
