
export interface Skin {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  wear?: string;
}

export interface Case {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  items: Skin[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  inventory: Skin[];
}
