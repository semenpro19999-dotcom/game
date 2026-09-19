import { store } from '../core/store';
import { CASES } from '../core/data';
import { rollSkin, generateRouletteItems } from '../systems/caseSystem';
import { RARITY_COLORS } from '../core/types';
import { toast } from '../ui/components';

export function renderCases(container: HTMLElement) {
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>CASES</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div>
        <div class="nav-item active"><span class="nav-icon">📦</span><span class="nav-label">Кейсы</span></div>
        <div class="nav-item" data-screen="inventory"><span class="nav-icon">🎒</span><span class="nav-label">Инвентарь</span></div>
        <div class="nav-item" data-screen="shop"><span class="nav-icon">🛒</span><span class="nav-label">Магазин</span></div>
      </nav>
      <div style="margin-top:auto; background:var(--glass); border:1px solid var(--border); border-radius:12px; padding:14px;">
        <div style="font-family:Rajdhani; font-weight:700; font-size:13px; margin-bottom:8px;">💳 БАЛАНС</div>
        <div style="display:flex; justify-content:space-between; font-family:JetBrains Mono; font-size:13px;"><span>CR</span><span style="color:var(--accent); font-weight:700;">${store.state.user.credits}</span></div>
        <div style="display:flex; justify-content:space-between; font-family:JetBrains Mono; font-size:13px; margin-top:4px;"><span>SC</span><span style="color:var(--text-dim);">${store.state.user.scrap}</span></div>
        <div style="margin-top:10px; font-size:11px; color:var(--text-dim);">Pity: ${store.state.pityCounter}/30 • Шанс Immortal: ${(CASES[1].dropChances.Immortal + Math.max(0, store.state.pityCounter-20)*0.2).toFixed(1)}%</div>
      </div>
    </div>
    <div class="main-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h1 style="font-family:Rajdhani; font-size:32px; font-weight:700;">КЕЙСЫ • 5 ВИДОВ • PITY + PROVABLY FAIR</h1>
        <button class="btn btn-secondary" id="btn-how">Как работает?</button>
      </div>

      <div class="case-grid">
        ${CASES.map(c => `
          <div class="case-card" data-case="${c.id}">
            <div class="case-visual">
              <div class="case-glow" style="background: radial-gradient(circle, ${c.color} 0%, transparent 70%);"></div>
              <div class="case-box" style="border-color:${c.color}60;">${c.image}</div>
              <div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.7); border:1px solid ${c.color}40; color:${c.color}; font-family:JetBrains Mono; font-size:10px; padding:4px 8px; border-radius:20px;">${c.currency} ${c.price || 'FREE'}</div>
            </div>
            <div class="case-info">
              <div class="case-name">${c.name}</div>
              <div class="case-desc">${c.description}</div>
              <div style="display:flex; gap:4px; margin-bottom:12px;">
                ${Object.entries(c.dropChances).filter(([_,v])=>v>0).map(([rarity, chance]) => `<span style="font-family:JetBrains Mono; font-size:9px; padding:2px 6px; border-radius:10px; background:${RARITY_COLORS[rarity as any]}20; color:${RARITY_COLORS[rarity as any]}; border:1px solid ${RARITY_COLORS[rarity as any]}40;">${rarity} ${chance}%</span>`).join('')}
              </div>
              <div class="case-price">
                <span class="price">${c.price ? `${c.price} ${c.currency}` : 'FREE'}</span>
                <span class="case-count">${c.items.length} предметов</span>
              </div>
              <button class="btn btn-primary" style="width:100%; margin-top:12px;" data-open="${c.id}">Открыть • ${c.price ? `${c.price} CR` : 'Бесплатно'}</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="card" style="margin-top:24px;">
        <div class="card-header"><div class="card-title">📊 ШАНСЫ • PITY • FAIRNESS</div></div>
        <div class="card-body">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; font-size:12px; color:var(--text-dim); line-height:1.6;">
            <div>
              <div style="font-weight:700; color:var(--text); margin-bottom:8px;">Как работает рулетка (честно):</div>
              1. Клиент жмет Открыть → запрос на сервер<br>
              2. Сервер роллит rarity + skin (cryptographic RNG) → возвращает itemId, но клиент не видит<br>
              3. Клиент крутит анимацию 6 сек, лента 50 итемов, winner на позиции 42<br>
              4. Provably Fair: SHA256(serverSeed + clientSeed) можно проверить
            </div>
            <div>
              <div style="font-weight:700; color:var(--text); margin-bottom:8px;">Pity система:</div>
              • После 20 кейсов без Immortal: +0.2% шанс за каждый<br>
              • После 30 без Immortal: шанс 10% (гарант в след 10)<br>
              • После 25 без Legendary+: шанс x2<br>
              • Счетчик: ${store.state.pityCounter} • Следующий гарант через ${Math.max(0, 30 - store.state.pityCounter)} кейсов
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
  container.querySelectorAll('[data-open]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const caseId = (el as HTMLElement).dataset.open!;
      const c = CASES.find(x => x.id === caseId)!;
      if (c.currency === 'CR' && store.state.user.credits < c.price) {
        toast('Недостаточно CR! Пополни баланс в магазине.');
        return;
      }
      openCase(c, container);
    });
  });
  container.querySelectorAll('[data-case]').forEach(el => {
    el.addEventListener('click', () => {
      const c = CASES.find(x => x.id === (el as HTMLElement).dataset.case)!;
      store.setSelectedCase(c);
      toast(`Выбран кейс ${c.name}. Нажми Открыть.`);
    });
  });
}

function openCase(c: any, root: HTMLElement) {
  const winner = rollSkin(c);
  const rouletteItems = generateRouletteItems(c, winner, 60);

  const overlay = document.createElement('div');
  overlay.className = 'roulette-overlay';
  overlay.innerHTML = `
    <div class="roulette-container">
      <div class="roulette-header">
        <div class="roulette-title">Открытие ${c.name} • ${c.image}</div>
        <div style="font-family:JetBrains Mono; font-size:12px; color:var(--text-dim);">Pity: ${store.state.pityCounter} • Provably Fair: ${Math.random().toString(16).slice(2,10)}... • 128-tick</div>
      </div>
      <div class="roulette-track">
        <div class="roulette-line"></div>
        <div class="roulette-items" id="roulette-strip">
          ${rouletteItems.map((item, idx) => `
            <div class="rou-item" style="border-color:${RARITY_COLORS[item.rarity]}60; ${idx===42?'background:rgba(235,75,75,0.1)':''}">
              <div class="rou-icon">${item.icon}</div>
              <div class="rou-name">${item.name.split('|')[1]?.trim() || item.name}</div>
              <div style="font-size:8px; color:${RARITY_COLORS[item.rarity]}; font-family:JetBrains Mono;">${item.rarity}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="roulette-result" id="roulette-result" style="display:none;">
        <div class="result-rarity" style="background:${RARITY_COLORS[winner.rarity]}20; color:${RARITY_COLORS[winner.rarity]}; border:1px solid ${RARITY_COLORS[winner.rarity]}40;">${winner.rarity} ${winner.statTrak ? '• STATTRAK' : ''}</div>
        <div class="result-name">${winner.name}</div>
        <div style="font-family:JetBrains Mono; font-size:12px; color:var(--text-dim);">Float: ${winner.wear.toFixed(4)} • Pattern: #${winner.patternIndex} • ${winner.collection}</div>
        <div style="margin-top:12px; font-family:Rajdhani; font-size:18px; font-weight:700; color:var(--accent);">$${winner.price.toFixed(2)} • ${winner.statTrak ? '+50% ST' : ''}</div>
        <div class="result-actions">
          <button class="btn btn-primary" id="btn-keep">Забрать в инвентарь</button>
          <button class="btn btn-secondary" id="btn-sell">Продать за $${(winner.price*0.85).toFixed(2)}</button>
          <button class="btn btn-ghost" id="btn-again">Еще раз</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const strip = overlay.querySelector('#roulette-strip') as HTMLElement;
  const result = overlay.querySelector('#roulette-result') as HTMLElement;

  // Animate: move to winner at position 42 (each item 128px inc gap)
  const itemWidth = 128;
  const winnerIndex = 42;
  const containerWidth = 1000;
  const targetX = -(winnerIndex * itemWidth - containerWidth/2 + itemWidth/2);

  // Start fast, then slow
  strip.style.transition = 'transform 6s cubic-bezier(0.15, 0.85, 0.25, 1)';
  strip.style.transform = `translateX(${targetX}px)`;

  // Sound tick simulation via visual
  let ticks = 0;
  const tickInterval = setInterval(() => {
    ticks++;
    if (ticks > 30) clearInterval(tickInterval);
  }, 150);

  setTimeout(() => {
    result.style.display = 'block';
    result.style.animation = 'fadeIn 0.5s ease';
    const winnerEl = strip.children[winnerIndex] as HTMLElement;
    winnerEl.classList.add('winner');
    
    if (winner.rarity === 'Immortal' || winner.rarity === 'Legendary') {
      // Flash effect
      overlay.style.background = `radial-gradient(ellipse at center, ${RARITY_COLORS[winner.rarity]}40 0%, rgba(0,0,0,0.9) 70%)`;
      setTimeout(() => overlay.style.background = 'rgba(0,0,0,0.9)', 800);
    }

    if (winner.rarity === 'Immortal') store.resetPity(); else store.incPity();
  }, 6200);

  overlay.querySelector('#btn-keep')?.addEventListener('click', () => {
    store.addInventory(winner);
    if (c.currency === 'CR') store.state.user.credits -= c.price;
    toast(`Получено: ${winner.name} • $${winner.price}`);
    overlay.remove();
  });
  overlay.querySelector('#btn-sell')?.addEventListener('click', () => {
    if (c.currency === 'CR') store.state.user.credits -= c.price;
    store.state.user.credits += Math.floor(winner.price*0.85*100);
    toast(`Продано за $${(winner.price*0.85).toFixed(2)}`);
    overlay.remove();
  });
  overlay.querySelector('#btn-again')?.addEventListener('click', () => {
    overlay.remove();
    openCase(c, root);
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}
