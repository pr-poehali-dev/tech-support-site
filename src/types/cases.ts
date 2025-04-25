
export type RarityType = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';

export interface Skin {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: RarityType;
  wear?: string;
}

export interface Case {
  id: string;
  name: string;
  image: string;
  price: number;
  items: Skin[];
  bestDrop: string;
  bestDropImage: string;
  rarityColor: string;
  category: 'popular' | 'new' | 'special';
}
