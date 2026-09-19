import { store } from '../core/store';
import { GameMode, MapName } from '../core/types';

export function renderMatchmaking(container: HTMLElement) {
  const mm = store.state.matchmaking;
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>TACTICAL</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад в меню</span></div>
        <div class="nav-item active"><span class="nav-icon">🎮</span><span class="nav-label">Матчмейкинг</span></div>
      </nav>
      <div class="sidebar-profile"><div class="avatar">${store.state.user.avatar}</div><div class="profile-info"><div class="profile-name">${store.state.user.name}</div><div class="profile-rank">Поиск • ${mm.region}</div></div></div>
    </div>
    <div class="main-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h1 style="font-family:Rajdhani; font-size:32px; font-weight:700;">МАТЧМЕЙКИНГ</h1>
        <div style="display:flex; gap:8px;">
          <span style="background:var(--glass); border:1px solid var(--border); padding:6px 12px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">128-TICK</span>
          <span style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); color:#10B981; padding:6px 12px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">● 12ms CIS</span>
        </div>
      </div>

      <div class="mm-container">
        <div class="mm-section">
          <div class="mm-section-title">🎯 Режим игры</div>
          <div class="mode-grid">
            ${[
              { id:'Classic', name:'Classic 5×5', desc:'MR12 • Бомба • Экономика • Ранкед', players:'10' },
              { id:'Wingman', name:'Wingman 2×2', desc:'MR8 • 1 плент • Быстро', players:'4' },
              { id:'Deathmatch', name:'Deathmatch', desc:'12 игроков • Респавн • Аим', players:'12' },
              { id:'ArmsRace', name:'Arms Race', desc:'Убил = новое оружие', players:'12' },
              { id:'Coop', name:'Co-op vs AI', desc:'5 волн • Боссы • Лут', players:'5' },
              { id:'Custom', name:'Custom', desc:'Workshop • Читы • Свои правила', players:'2-12' },
            ].map(m => `
              <div class="mode-card ${mm.mode===m.id ? 'selected' : ''}" data-mode="${m.id}">
                <h4>${m.name} <span style="font-family:JetBrains Mono; font-size:10px; color:var(--text-dim);">${m.players}</span></h4>
                <p>${m.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mm-section">
          <div class="mm-section-title">🗺️ Карта • Погода • Morph</div>
          <div class="map-grid">
            ${[
              { id:'de_dustline', name:'de_dustline', weather:['Clear','Sandstorm'], morph:'Mid Doors: 3 варианта' },
              { id:'de_neon', name:'de_neon', weather:['Rain','Fog'], morph:'A Short: ящики/машина' },
              { id:'cs_ark', name:'cs_ark', weather:['Storm','Clear'], morph:'Корабль: двери' },
            ].map(map => `
              <div class="map-card ${mm.map===map.id ? 'selected' : ''}" data-map="${map.id}">
                <div class="map-thumb">${map.id === 'de_dustline' ? '🏜️' : map.id === 'de_neon' ? '🌃' : '🚢'}<br>${map.id}</div>
                <div class="map-name">${map.name}</div>
                <div style="padding:0 12px 10px; font-size:10px; color:var(--text-dim); line-height:1.3;">
                  🌦️ ${map.weather.join('/')} <br>🌀 ${map.morph}
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap;">
            <div><label style="font-family:JetBrains Mono; font-size:11px; color:var(--text-dim);">РЕГИОН</label><br>
              <select id="region-select" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:8px 12px; border-radius:8px; margin-top:4px; font-family:JetBrains Mono;">
                <option ${mm.region==='CIS'?'selected':''}>CIS</option><option ${mm.region==='EU'?'selected':''}>EU</option><option ${mm.region==='NA'?'selected':''}>NA</option><option ${mm.region==='Asia'?'selected':''}>Asia</option>
              </select>
            </div>
            <div><label style="font-family:JetBrains Mono; font-size:11px; color:var(--text-dim);">ПОГОДА</label><br>
              <select id="weather-select" style="background:var(--bg2); border:1px solid var(--border); color:var(--text); padding:8px 12px; border-radius:8px; margin-top:4px; font-family:JetBrains Mono;">
                <option>Clear</option><option>Rain</option><option>Storm</option><option>Fog</option><option>Sandstorm</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mm-section">
          <div class="mm-section-title">👥 Лобби • Специализации</div>
          <div style="display:flex; gap:12px; margin-bottom:16px;">
            <div style="flex:1; background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px; display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, var(--accent), var(--accent-2)); display:flex; align-items:center; justify-content:center; font-weight:700;">S7</div>
              <div><div style="font-weight:600; font-size:13px;">${store.state.user.name}</div><div style="font-size:11px; color:var(--accent);">${store.state.user.specialization} • ${store.state.user.rank}</div></div>
              <div style="margin-left:auto; width:8px; height:8px; background:var(--success); border-radius:50%;"></div>
            </div>
            ${[1,2,3,4].map(() => `<div style="flex:1; background:var(--bg); border:1px dashed var(--border); border-radius:8px; padding:12px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-family:JetBrains Mono; font-size:11px;">+ Пригласить</div>`).join('')}
          </div>
          <div style="display:flex; gap:8px; font-size:11px; color:var(--text-dim); font-family:JetBrains Mono;">
            <span>💡 Совет: Берите разные специализации для баланса. Breacher + Anchor на пленте = +35% эффективности.</span>
          </div>
        </div>

        ${mm.active ? `
          <div class="searching">
            <div class="searching-spinner"></div>
            <div>
              <div style="font-family:Rajdhani; font-weight:700; font-size:16px;">ПОИСК МАТЧА • ${mm.mode} • ${mm.map}</div>
              <div style="font-family:JetBrains Mono; font-size:12px; color:var(--text-dim); margin-top:2px;">Ищем 10 игроков • Средний MMR 1842 • Таймер ${Math.floor(mm.timer/60)}:${String(mm.timer%60).padStart(2,'0')} • Pity: ${store.state.pityCounter}</div>
            </div>
            <button class="btn btn-danger" id="btn-cancel" style="margin-left:auto;">Отмена</button>
          </div>
        ` : `
          <div style="display:flex; gap:12px; margin-top:20px;">
            <button class="btn btn-primary btn-large" id="btn-start-search" style="flex:1;">▶ Начать поиск • 128-TICK</button>
            <button class="btn btn-secondary" id="btn-training-mm">Тренировка</button>
          </div>
        `}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-mode]').forEach(el => {
    el.addEventListener('click', () => {
      store.setMatchmaking({ mode: (el as HTMLElement).dataset.mode as GameMode });
    });
  });
  container.querySelectorAll('[data-map]').forEach(el => {
    el.addEventListener('click', () => {
      store.setMatchmaking({ map: (el as HTMLElement).dataset.map as MapName });
    });
  });
  container.querySelector('#region-select')?.addEventListener('change', (e) => {
    store.setMatchmaking({ region: (e.target as HTMLSelectElement).value });
  });
  container.querySelector('[data-screen="menu"]')?.addEventListener('click', () => store.setScreen('menu'));
  container.querySelector('#btn-start-search')?.addEventListener('click', () => {
    store.setMatchmaking({ active: true, timer: 0 });
    const interval = setInterval(() => {
      store.setMatchmaking({ timer: store.state.matchmaking.timer + 1 });
      if (store.state.matchmaking.timer > 8) {
        clearInterval(interval);
        store.setMatchmaking({ active: false });
        store.setScreen('hud');
      }
    }, 1000);
    (container as any)._mmInterval = interval;
  });
  container.querySelector('#btn-cancel')?.addEventListener('click', () => {
    clearInterval((container as any)._mmInterval);
    store.setMatchmaking({ active: false, timer: 0 });
  });
}
