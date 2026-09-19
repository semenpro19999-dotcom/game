import { store } from '../core/store';
import { RARITY_COLORS } from '../core/types';
import { rarityBadge } from '../ui/components';

export function renderInventory(container: HTMLElement) {
  const inv = store.state.inventory;
  const filter = (container as any)._invFilter || 'All';
  const filtered = filter === 'All' ? inv : inv.filter(i => i.rarity === filter || i.type === filter || i.weaponId === filter);

  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>INV</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div>
        <div class="nav-item active"><span class="nav-icon">🎒</span><span class="nav-label">Инвентарь • ${inv.length}</span></div>
        <div class="nav-item" data-screen="cases"><span class="nav-icon">📦</span><span class="nav-label">Кейсы</span></div>
        <div class="nav-item" data-screen="shop"><span class="nav-icon">🛒</span><span class="nav-label">Маркет</span></div>
      </nav>
      <div style="margin-top:20px; background:var(--glass); border:1px solid var(--border); border-radius:12px; padding:14px;">
        <div style="font-family:Rajdhani; font-weight:700; font-size:13px; margin-bottom:8px;">💰 СТОИМОСТЬ</div>
        <div style="font-family:JetBrains Mono; font-size:20px; font-weight:700; color:var(--accent);">$${inv.reduce((a,b)=>a+b.price,0).toFixed(2)}</div>
        <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">24 предмета • 3 Immortal</div>
        <div style="display:flex; gap:6px; margin-top:10px;">
          <button class="btn btn-secondary" style="flex:1; padding:8px; font-size:11px;">Продать все</button>
          <button class="btn btn-ghost" style="flex:1; padding:8px; font-size:11px;">Сорт</button>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h1 style="font-family:Rajdhani; font-size:28px; font-weight:700;">ИНВЕНТАРЬ • ${filtered.length} ПРЕДМЕТОВ</h1>
        <div style="display:flex; gap:8px; align-items:center;">
          <span style="font-family:JetBrains Mono; font-size:11px; color:var(--text-dim);">PITY: ${store.state.pityCounter}/30 до гаранта</span>
          <div style="width:80px; height:4px; background:var(--bg3); border-radius:2px; overflow:hidden;"><div style="width:${Math.min(100, store.state.pityCounter/30*100)}%; height:100%; background:var(--immortal);"></div></div>
        </div>
      </div>

      <div class="inv-filters">
        ${['All','Immortal','Legendary','Mythic','Rare','Rifle','Pistol','Knife'].map(f => `
          <button class="filter-btn ${filter===f?'active':''}" data-filter="${f}">${f}</button>
        `).join('')}
      </div>

      <div class="inv-grid">
        ${filtered.map(item => `
          <div class="inv-item" data-id="${item.instanceId}">
            <div class="inv-item-rare" style="background:${RARITY_COLORS[item.rarity]}"></div>
            <div class="inv-item-thumb">
              <div class="icon">${item.icon}</div>
              ${item.statTrak ? `<div style="position:absolute; top:8px; left:8px; background:var(--accent-2); color:#fff; font-family:JetBrains Mono; font-size:8px; padding:2px 4px; border-radius:4px;">ST</div>` : ''}
              <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.7); font-family:JetBrains Mono; font-size:9px; padding:2px 4px; border-radius:4px;">${item.wear.toFixed(3)}</div>
            </div>
            <div class="inv-item-info">
              <div class="inv-item-name">${item.name}</div>
              <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:center;">
                ${rarityBadge(item.rarity)}
                <span style="font-family:JetBrains Mono; font-size:11px; color:var(--accent); font-weight:700;">$${item.price.toFixed(2)}</span>
              </div>
              <div class="inv-item-meta"><span>${item.collection}</span><span>#${item.patternIndex}</span></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:32px; display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
        <div class="card">
          <div class="card-header"><div class="card-title">🔧 КРАФТ • TRADE-UP</div></div>
          <div class="card-body">
            <div style="font-size:12px; color:var(--text-dim); margin-bottom:12px;">10 скинов одной редкости → 1 выше. 10% StatTrak. Сжигает скины, контролирует инфляцию.</div>
            <div style="display:flex; gap:6px; margin-bottom:12px;">
              ${inv.slice(0,5).map(i => `<div style="width:48px; height:48px; background:var(--bg3); border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">${i.icon}</div>`).join('')}
              <div style="width:48px; height:48px; border:1px dashed var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">+5</div>
            </div>
            <button class="btn btn-secondary" style="width:100%;">Контракт обмена • 10 → 1</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📊 СТАТИСТИКА КОЛЛЕКЦИИ</div></div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns: repeat(3,1fr); gap:12px; text-align:center;">
              ${[
                { label:'Common', count: inv.filter(i=>i.rarity==='Common').length, color:RARITY_COLORS.Common },
                { label:'Rare', count: inv.filter(i=>i.rarity==='Rare').length, color:RARITY_COLORS.Rare },
                { label:'Immortal', count: inv.filter(i=>i.rarity==='Immortal').length, color:RARITY_COLORS.Immortal },
              ].map(s => `<div><div style="font-family:Rajdhani; font-size:20px; font-weight:700; color:${s.color};">${s.count}</div><div style="font-size:10px; color:var(--text-dim); text-transform:uppercase;">${s.label}</div></div>`).join('')}
            </div>
            <div style="margin-top:16px; height:6px; background:var(--bg3); border-radius:3px; display:flex; overflow:hidden;">
              ${['Common','Uncommon','Rare','Mythic','Legendary','Immortal'].map(r => {
                const cnt = inv.filter(i=>i.rarity===r).length;
                const pct = inv.length ? cnt/inv.length*100 : 0;
                return `<div style="width:${pct}%; background:${RARITY_COLORS[r as any]}; height:100%;"></div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      (container as any)._invFilter = (el as HTMLElement).dataset.filter;
      renderInventory(container);
    });
  });
  container.querySelectorAll('[data-screen]').forEach(el => {
    el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any));
  });
}
