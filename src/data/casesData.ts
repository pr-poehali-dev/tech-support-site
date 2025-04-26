
import { Case, Skin } from "@/types/cases";

// Моковые данные для скинов
export const skins: Skin[] = [
  {
    id: 'skin1',
    name: 'AWP | Dragon Lore',
    image: 'https://images.unsplash.com/photo-1608031958660-83916e0e408f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1890.50,
    rarity: 'ancient',
    wear: 'Factory New'
  },
  {
    id: 'skin2',
    name: 'AK-47 | Fire Serpent',
    image: 'https://images.unsplash.com/photo-1593693344666-d3f8869c2abb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 734.22,
    rarity: 'legendary',
    wear: 'Minimal Wear'
  },
  {
    id: 'skin3',
    name: 'M4A4 | Howl',
    image: 'https://images.unsplash.com/photo-1588201013435-5af39ea6bf6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1250.00,
    rarity: 'legendary',
    wear: 'Field-Tested'
  },
  {
    id: 'skin4',
    name: 'Karambit | Fade',
    image: 'https://images.unsplash.com/photo-1597767752014-bcd8d2499332?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 980.75,
    rarity: 'mythical',
    wear: 'Factory New'
  },
  {
    id: 'skin5',
    name: 'USP-S | Kill Confirmed',
    image: 'https://images.unsplash.com/photo-1581854374145-7bbe3b3f7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 245.30,
    rarity: 'rare',
    wear: 'Minimal Wear'
  },
  {
    id: 'skin6',
    name: 'Glock-18 | Fade',
    image: 'https://images.unsplash.com/photo-1583181118639-1108f76669f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 310.45,
    rarity: 'rare',
    wear: 'Factory New'
  },
  {
    id: 'skin7',
    name: 'Desert Eagle | Blaze',
    image: 'https://images.unsplash.com/photo-1621363233431-9e09f23da5e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 198.60,
    rarity: 'uncommon',
    wear: 'Factory New'
  },
  {
    id: 'skin8',
    name: 'P250 | Mehndi',
    image: 'https://images.unsplash.com/photo-1610041321411-86e27c5221e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 52.80,
    rarity: 'uncommon',
    wear: 'Field-Tested'
  },
  {
    id: 'skin9',
    name: 'MP7 | Forest DDPAT',
    image: 'https://images.unsplash.com/photo-1561998619-58348d0c3777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 3.21,
    rarity: 'common',
    wear: 'Well-Worn'
  },
  {
    id: 'skin10',
    name: 'P90 | Sand Spray',
    image: 'https://images.unsplash.com/photo-1603145755623-fdc34e81fed3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 2.15,
    rarity: 'common',
    wear: 'Battle-Scarred'
  }
];

// Моковые данные для кейсов
export const cases: Case[] = [
  {
    id: 'case1',
    name: 'Премиум кейс',
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 49.99,
    items: [...skins],
    bestDrop: 'AWP | Dragon Lore',
    bestDropImage: 'https://images.unsplash.com/photo-1608031958660-83916e0e408f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-yellow-400 to-yellow-600',
    category: 'popular'
  },
  {
    id: 'case2',
    name: 'Кейс редкости',
    image: 'https://images.unsplash.com/photo-1576513580460-78e943a6b523?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 29.99,
    items: [...skins.filter(s => s.rarity !== 'common')],
    bestDrop: 'M4A4 | Howl',
    bestDropImage: 'https://images.unsplash.com/photo-1588201013435-5af39ea6bf6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-red-400 to-red-600',
    category: 'popular'
  },
  {
    id: 'case3',
    name: 'Бюджетный кейс',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 9.99,
    items: [...skins],
    bestDrop: 'USP-S | Kill Confirmed',
    bestDropImage: 'https://images.unsplash.com/photo-1581854374145-7bbe3b3f7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-blue-400 to-blue-600',
    category: 'popular'
  },
  {
    id: 'case4',
    name: 'Новый Esports кейс',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 19.99,
    items: [...skins],
    bestDrop: 'Karambit | Fade',
    bestDropImage: 'https://images.unsplash.com/photo-1597767752014-bcd8d2499332?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-green-400 to-green-600',
    category: 'new'
  },
  {
    id: 'case5',
    name: 'Специальный кейс',
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 39.99,
    items: [...skins.filter(s => s.rarity === 'mythical' || s.rarity === 'legendary' || s.rarity === 'ancient')],
    bestDrop: 'AK-47 | Fire Serpent',
    bestDropImage: 'https://images.unsplash.com/photo-1593693344666-d3f8869c2abb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-purple-400 to-purple-600',
    category: 'special'
  },
  {
    id: 'case6',
    name: 'Лимитированный кейс',
    image: 'https://images.unsplash.com/photo-1619252584172-a83a949b6efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 59.99,
    items: [...skins],
    bestDrop: 'Glock-18 | Fade',
    bestDropImage: 'https://images.unsplash.com/photo-1583181118639-1108f76669f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rarityColor: 'from-pink-400 to-pink-600',
    category: 'special'
  }
];

// Группировка кейсов по категориям для упрощения использования
export const casesData = {
  popularCases: cases.filter(c => c.category === 'popular'),
  newCases: cases.filter(c => c.category === 'new'),
  specialCases: cases.filter(c => c.category === 'special'),
  allCases: cases
};

export default casesData;
