import { Case, Skin, Rarity, RARITY_ORDER } from '../core/types';
import { store } from '../core/store';

export function rollRarity(c: Case, pity: number): Rarity {
  let chances = { ...c.dropChances };
  // Pity system
  if (pity > 20) {
    const bonus = (pity - 20) * 0.2; // +0.2% per case after 20
    chances.Immortal += bonus;
    chances.Common = Math.max(5, chances.Common - bonus);
  }
  if (pity > 30) {
    chances.Immortal = Math.max(chances.Immortal, 10);
  }

  const roll = Math.random()*100;
  let acc = 0;
  for (const r of RARITY_ORDER) {
    acc += chances[r] || 0;
    if (roll <= acc) return r;
  }
  return 'Common';
}

export function rollSkin(c: Case): Skin {
  const rarity = rollRarity(c, store.state.pityCounter);
  const pool = c.items.filter(i => i.rarity === rarity);
  const finalPool = pool.length ? pool : c.items.filter(i => i.rarity === 'Common');
  const skin = finalPool[Math.floor(Math.random()*finalPool.length)];
  // clone with new float
  return { ...skin, wear: Math.random()*0.7 + 0.05, patternIndex: Math.floor(Math.random()*1000), statTrak: Math.random() < 0.1 };
}

export function generateRouletteItems(c: Case, winner: Skin, count = 50): Skin[] {
  const items: Skin[] = [];
  for (let i=0;i<count;i++) {
    if (i === 42) { // winner position
      items.push(winner);
    } else {
      const r = RARITY_ORDER[Math.floor(Math.random()*3)]; // mostly common for visuals
      const pool = c.items.filter(s => s.rarity === r);
      const s = pool.length ? pool[Math.floor(Math.random()*pool.length)] : c.items[0];
      items.push({ ...s });
    }
  }
  return items;
}

export function getRarityChanceTable(c: Case) {
  return RARITY_ORDER.map(r => ({ rarity: r, chance: c.dropChances[r] || 0 }));
}
