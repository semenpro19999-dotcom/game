export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Mythic' | 'Legendary' | 'Immortal';
export type WeaponType = 'Pistol' | 'SMG' | 'Rifle' | 'Sniper' | 'Shotgun' | 'LMG' | 'Knife' | 'Grenade';
export type Team = 'SPECTRUM' | 'FRACTURE';
export type Specialization = 'Breacher' | 'Scout' | 'Anchor' | 'Support';
export type GameMode = 'Classic' | 'Deathmatch' | 'ArmsRace' | 'Wingman' | 'Coop' | 'Custom';
export type MapName = 'de_dustline' | 'de_neon' | 'cs_ark';
export type Weather = 'Clear' | 'Rain' | 'Storm' | 'Fog' | 'Sandstorm';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  price: number;
  damage: number;
  fireRate: number;
  recoilPattern: number[];
  icon: string;
}

export interface Skin {
  id: string;
  weaponId: string;
  name: string;
  rarity: Rarity;
  collection: string;
  wear: number; // 0.0 - 1.0
  patternIndex: number;
  price: number;
  statTrak?: boolean;
  icon: string;
  description: string;
}

export interface Case {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'CR' | 'SC' | 'Free';
  rarity: Rarity; // base rarity of case
  items: Skin[];
  image: string;
  color: string;
  dropChances: Record<Rarity, number>;
}

export interface InventoryItem extends Skin {
  instanceId: string;
  acquiredAt: number;
  tradable: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rank: string;
  mmr: number;
  level: number;
  xp: number;
  credits: number;
  scrap: number;
  stats: {
    kills: number;
    deaths: number;
    wins: number;
    matches: number;
    hsPercent: number;
    kd: number;
  };
  specialization: Specialization;
}

export interface MatchResult {
  map: MapName;
  mode: GameMode;
  score: { spectrum: number; fracture: number };
  players: Array<{
    name: string;
    kills: number;
    deaths: number;
    assists: number;
    mvp: boolean;
    team: Team;
  }>;
  mvp: string;
  xpGained: number;
  drop?: Skin;
}

export interface GameSettings {
  graphics: {
    quality: 'Low' | 'Medium' | 'High' | 'Ultra';
    resolution: string;
    vsync: boolean;
    lumen: boolean;
    dlss: boolean;
  };
  sound: {
    master: number;
    sfx: number;
    voice: number;
    music: number;
    hrtf: boolean;
  };
  controls: {
    sensitivity: number;
    dpi: number;
    crosshair: Crosshair;
    keybinds: Record<string, string>;
  };
}

export interface Crosshair {
  color: string;
  size: number;
  thickness: number;
  gap: number;
  dot: boolean;
  outline: boolean;
  alpha: number;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  Common: '#B0C3D9',
  Uncommon: '#5E98D9',
  Rare: '#4B69FF',
  Mythic: '#8847FF',
  Legendary: '#D32CE6',
  Immortal: '#EB4B4B'
};

export const RARITY_ORDER: Rarity[] = ['Common','Uncommon','Rare','Mythic','Legendary','Immortal'];
