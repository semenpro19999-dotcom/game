import { Weapon, Skin, Case, Rarity } from './types';

export const WEAPONS: Weapon[] = [
  { id: 'k45', name: 'K-45', type: 'Pistol', price: 200, damage: 35, fireRate: 400, recoilPattern: [0,1,2], icon: '🔫' },
  { id: 's19', name: 'S-19 Spectre', type: 'Pistol', price: 300, damage: 32, fireRate: 350, recoilPattern: [0,1], icon: '🔫' },
  { id: 'd50', name: 'D-50 Handcannon', type: 'Pistol', price: 700, damage: 75, fireRate: 200, recoilPattern: [0,5], icon: '🔫' },
  { id: 'm9x', name: 'M-9X', type: 'SMG', price: 1200, damage: 26, fireRate: 750, recoilPattern: [0,1,2,3,2,1], icon: '🔫' },
  { id: 'akr', name: 'AK-R', type: 'Rifle', price: 2700, damage: 36, fireRate: 600, recoilPattern: [0,2,4,6,5,3,2,1,0,-1], icon: '🎯' },
  { id: 'm4s', name: 'M4-Spectr', type: 'Rifle', price: 3100, damage: 32, fireRate: 666, recoilPattern: [0,1,3,4,3,2,1,0], icon: '🎯' },
  { id: 'awp', name: 'AWP-K', type: 'Sniper', price: 4750, damage: 115, fireRate: 40, recoilPattern: [0,10], icon: '🎯' },
  { id: 'nova', name: 'Nova-K', type: 'Shotgun', price: 1050, damage: 26*8, fireRate: 80, recoilPattern: [0,3], icon: '💥' },
  { id: 'knife', name: 'Combat Knife', type: 'Knife', price: 0, damage: 55, fireRate: 100, recoilPattern: [], icon: '🔪' },
];

const genSkins = (): Skin[] => {
  const rarities: Rarity[] = ['Common','Uncommon','Rare','Mythic','Legendary','Immortal'];
  const collections = ['Spectrum','Fracture','Neon','Dustline','Arctic'];
  const skins: Skin[] = [];
  let id = 0;
  for (const weapon of WEAPONS) {
    for (let i=0; i<6; i++) {
      const rarity = rarities[i % rarities.length];
      const collection = collections[Math.floor(Math.random()*collections.length)];
      const names: Record<Rarity, string[]> = {
        Common: ['Sandstorm','Concrete','Rust','Ash','Basic'],
        Uncommon: ['Blue Steel','Night','Urban','Jungle','Frost'],
        Rare: ['Cyrex','Neon Rider','Asiimov','Redline','Frontside'],
        Mythic: ['Hyper Beast','Bloodsport','Neo-Noir','Printstream','Oni'],
        Legendary: ['Dragon Lore','Howl','Medusa','Gungnir','Fire Serpent'],
        Immortal: ['Aurora Borealis','Black Lotus','Gold Arabesque','Sapphire','Ruby']
      };
      const nameList = names[rarity];
      skins.push({
        id: `skin_${id++}`,
        weaponId: weapon.id,
        name: `${weapon.name} | ${nameList[Math.floor(Math.random()*nameList.length)]} ${rarity === 'Immortal' ? '★' : ''}`,
        rarity,
        collection,
        wear: Math.random()*0.8 + 0.05,
        patternIndex: Math.floor(Math.random()*1000),
        price: rarity === 'Common' ? 0.3 : rarity === 'Uncommon' ? 1.5 : rarity === 'Rare' ? 8 : rarity === 'Mythic' ? 25 : rarity === 'Legendary' ? 120 : 800,
        statTrak: Math.random() < 0.1,
        icon: weapon.icon,
        description: `${rarity} skin from ${collection} collection. Float: ${(Math.random()*0.5).toFixed(3)}`
      });
    }
  }
  return skins;
};

export const SKINS: Skin[] = genSkins();

export const CASES: Case[] = [
  {
    id: 'recruit',
    name: 'Recruit Case',
    description: 'Бесплатный еженедельный кейс. Шанс на Rare 10%. Выдается за 5 побед.',
    price: 0,
    currency: 'Free',
    rarity: 'Common',
    items: SKINS.filter(s => ['Common','Uncommon','Rare'].includes(s.rarity)).slice(0,15),
    image: '📦',
    color: '#8A8D93',
    dropChances: { Common: 60, Uncommon: 30, Rare: 10, Mythic: 0, Legendary: 0, Immortal: 0 }
  },
  {
    id: 'spectrum',
    name: 'Spectrum Case',
    description: 'Флагманский кейс SPECTRUM. 2 Immortal ножа. Самый популярный.',
    price: 250,
    currency: 'CR',
    rarity: 'Rare',
    items: SKINS.slice(0,15),
    image: '💠',
    color: '#00D9FF',
    dropChances: { Common: 50, Uncommon: 25, Rare: 12, Mythic: 7, Legendary: 4.5, Immortal: 1.5 }
  },
  {
    id: 'fracture',
    name: 'Fracture Case',
    description: 'Тематика FRACTURE. Оранжевые акценты, пустынные камуфляжи. 2 Immortal перчатки.',
    price: 250,
    currency: 'CR',
    rarity: 'Rare',
    items: SKINS.slice(15,30),
    image: '🔶',
    color: '#FF4D00',
    dropChances: { Common: 50, Uncommon: 25, Rare: 12, Mythic: 7, Legendary: 4.5, Immortal: 1.5 }
  },
  {
    id: 'season1',
    name: 'Season 1: Neon Dawn',
    description: 'Сезонный кейс. Исчезнет через 72 дня. Эксклюзивные неоновые скины.',
    price: 300,
    currency: 'CR',
    rarity: 'Mythic',
    items: SKINS.filter(s => s.collection === 'Neon').slice(0,15),
    image: '🌃',
    color: '#D32CE6',
    dropChances: { Common: 40, Uncommon: 25, Rare: 15, Mythic: 10, Legendary: 7, Immortal: 3 }
  },
  {
    id: 'workshop',
    name: 'Workshop Case',
    description: 'Лучшие работы комьюнити. 50% авторам. Голосование в Steam Workshop.',
    price: 250,
    currency: 'CR',
    rarity: 'Legendary',
    items: SKINS.slice(30,45),
    image: '🎨',
    color: '#10B981',
    dropChances: { Common: 45, Uncommon: 25, Rare: 14, Mythic: 8, Legendary: 6, Immortal: 2 }
  },
];
