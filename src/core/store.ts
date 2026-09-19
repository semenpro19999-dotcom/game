import { User, GameSettings, InventoryItem, Skin, Case, GameMode, MapName, Weather } from './types';
import { SKINS } from './data';

type Screen = 'menu' | 'play' | 'inventory' | 'cases' | 'shop' | 'profile' | 'settings' | 'training' | 'friends' | 'hud' | 'result';

interface AppState {
  screen: Screen;
  user: User;
  inventory: InventoryItem[];
  settings: GameSettings;
  selectedCase: Case | null;
  lastRoll: Skin | null;
  pityCounter: number;
  matchmaking: {
    active: boolean;
    mode: GameMode;
    map: MapName;
    region: string;
    timer: number;
    weather: Weather;
  };
  hud: {
    hp: number;
    armor: number;
    ammo: number;
    reserve: number;
    money: number;
    timer: string;
    score: { s: number; f: number };
  };
}

const defaultSettings: GameSettings = {
  graphics: { quality: 'High', resolution: '1920x1080', vsync: false, lumen: true, dlss: true },
  sound: { master: 80, sfx: 90, voice: 80, music: 60, hrtf: true },
  controls: { sensitivity: 2.1, dpi: 800, crosshair: { color: '#00D9FF', size: 4, thickness: 1, gap: -2, dot: false, outline: true, alpha: 200 }, keybinds: {} }
};

const defaultUser: User = {
  id: 'u_ks3_001',
  name: 'Spectr_7',
  avatar: 'S7',
  rank: 'Gold III',
  mmr: 1842,
  level: 27,
  xp: 68,
  credits: 1250,
  scrap: 3420,
  stats: { kills: 3421, deaths: 2987, wins: 412, matches: 892, hsPercent: 42, kd: 1.14 },
  specialization: 'Breacher'
};

const genInventory = (): InventoryItem[] => {
  return SKINS.slice(0,24).map((s,i) => ({
    ...s,
    instanceId: `inst_${i}_${Date.now()}`,
    acquiredAt: Date.now() - Math.random()*10000000,
    tradable: Math.random() > 0.2
  }));
};

export class Store {
  state: AppState;
  listeners: Array<() => void> = [];

  constructor() {
    this.state = {
      screen: 'menu',
      user: defaultUser,
      inventory: genInventory(),
      settings: defaultSettings,
      selectedCase: null,
      lastRoll: null,
      pityCounter: parseInt(localStorage.getItem('ks3_pity') || '0'),
      matchmaking: { active: false, mode: 'Classic', map: 'de_dustline', region: 'CIS', timer: 0, weather: 'Clear' },
      hud: { hp: 100, armor: 100, ammo: 30, reserve: 90, money: 4200, timer: '01:42', score: { s: 7, f: 5 } }
    };
  }

  subscribe(fn: () => void) { this.listeners.push(fn); return () => { this.listeners = this.listeners.filter(l => l!==fn); }; }
  private emit() { this.listeners.forEach(fn => fn()); }

  setScreen(screen: Screen) { this.state.screen = screen; this.emit(); }
  setSelectedCase(c: Case | null) { this.state.selectedCase = c; this.emit(); }
  setLastRoll(s: Skin | null) { this.state.lastRoll = s; this.emit(); }
  
  addInventory(skin: Skin) {
    const item: InventoryItem = { ...skin, instanceId: `inst_${Date.now()}_${Math.random()}`, acquiredAt: Date.now(), tradable: true };
    this.state.inventory.unshift(item);
    this.emit();
  }

  incPity() { this.state.pityCounter++; localStorage.setItem('ks3_pity', String(this.state.pityCounter)); this.emit(); }
  resetPity() { this.state.pityCounter = 0; localStorage.setItem('ks3_pity', '0'); this.emit(); }

  updateSettings(patch: Partial<GameSettings>) {
    this.state.settings = { ...this.state.settings, ...patch };
    this.emit();
  }

  setMatchmaking(patch: Partial<AppState['matchmaking']>) {
    this.state.matchmaking = { ...this.state.matchmaking, ...patch };
    this.emit();
  }

  setHud(patch: Partial<AppState['hud']>) {
    this.state.hud = { ...this.state.hud, ...patch };
    this.emit();
  }
}

export const store = new Store();
