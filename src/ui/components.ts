import { RARITY_COLORS, Rarity } from '../core/types';

export function rarityBadge(rarity: Rarity) {
  const color = RARITY_COLORS[rarity];
  return `<span class="rarity-badge" style="background:${color}20; color:${color}; border:1px solid ${color}40">${rarity}</span>`;
}

export function iconForWeapon(type: string) {
  const map: Record<string,string> = { Pistol:'🔫', SMG:'🔫', Rifle:'🎯', Sniper:'🎯', Shotgun:'💥', LMG:'🔥', Knife:'🔪', Grenade:'💣' };
  return map[type] || '🎮';
}

export function formatMoney(n: number) {
  return `$${n.toLocaleString()}`;
}

export function toast(msg: string) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `position:fixed; bottom:32px; left:50%; transform:translateX(-50%); background:rgba(24,24,27,0.9); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.15); padding:12px 20px; border-radius:8px; font-family:JetBrains Mono; font-size:13px; z-index:1000; animation: fadeIn 0.3s ease;`;
  document.body.appendChild(el);
  setTimeout(()=> { el.style.opacity='0'; el.style.transition='opacity 0.3s'; setTimeout(()=> el.remove(),300); }, 2500);
}
