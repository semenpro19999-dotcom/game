import { store } from '../core/store';
import { CASES, SKINS } from '../core/data';
import { RARITY_COLORS } from '../core/types';

export function renderShop(container: HTMLElement) {
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>SHOP</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div>
        <div class="nav-item active"><span class="nav-icon">🛒</span><span class="nav-label">Магазин</span></div>
        <div class="nav-item" data-screen="cases"><span class="nav-icon">📦</span><span class="nav-label">Кейсы</span></div>
        <div class="nav-item" data-screen="inventory"><span class="nav-icon">🎒</span><span class="nav-label">Инвентарь</span></div>
      </nav>
    </div>
    <div class="main-content">
      <div class="shop-banner">
        <div>
          <div style="font-family:Rajdhani; font-size:28px; font-weight:700;">SEASON 1: NEON DAWN • BATTLE PASS</div>
          <div style="font-size:13px; color:var(--text-dim); margin-top:4px;">100 уровней • 20 эксклюзивных скинов • 3 ножа • До конца сезона 72 дня</div>
        </div>
        <button class="btn btn-primary btn-large">Купить за 1000 CR ($10)</button>
      </div>

      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
        <div>
          <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">🔥 ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ</h3>
          <div class="grid grid-3">
            ${SKINS.filter(s=>s.rarity==='Immortal').slice(0,6).map(s => `
              <div class="card">
                <div style="height:120px; background: radial-gradient(ellipse at center, ${RARITY_COLORS[s.rarity]}30, transparent), var(--bg3); display:flex; align-items:center; justify-content:center; font-size:48px; position:relative;">
                  ${s.icon}
                  <div style="position:absolute; top:8px; left:8px; background:${RARITY_COLORS[s.rarity]}; color:#fff; font-family:JetBrains Mono; font-size:9px; padding:3px 6px; border-radius:4px;">${s.rarity}</div>
                </div>
                <div class="card-body">
                  <div style="font-weight:700; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.name}</div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <span style="font-family:JetBrains Mono; font-weight:700; color:var(--accent);">$${s.price.toFixed(2)}</span>
                    <button class="btn btn-secondary" style="padding:6px 12px; font-size:11px;">Купить</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <div class="card">
            <div class="card-header"><div class="card-title">💎 ПОПОЛНИТЬ CR</div></div>
            <div class="card-body" style="display:flex; flex-direction:column; gap:10px;">
              ${[
                { cr:500, price:'$5', bonus:'' },
                { cr:1200, price:'$10', bonus:'+200 BONUS' },
                { cr:2500, price:'$20', bonus:'+500 BONUS 🔥' },
                { cr:6500, price:'$50', bonus:'+1500 BONUS' },
              ].map(p => `
                <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px;">
                  <div><div style="font-family:Rajdhani; font-weight:700;">${p.cr} CR</div><div style="font-size:10px; color:var(--accent);">${p.bonus}</div></div>
                  <button class="btn btn-secondary" style="padding:8px 14px;">${p.price}</button>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="card" style="margin-top:16px;">
            <div class="card-header"><div class="card-title">📈 МАРКЕТПЛЕЙС</div></div>
            <div class="card-body">
              <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">
                • Комиссия 10% (5% сжигается)<br>
                • Escrow 3 дня без 2FA<br>
                • ML защита от скама<br>
                • График цен как в Steam<br>
                • Трейды с хеш-чейн логом
              </div>
              <button class="btn btn-secondary" style="width:100%; margin-top:12px;">Открыть маркетплейс</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
}
