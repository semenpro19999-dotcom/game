import { store } from '../core/store';

export function renderMainMenu(container: HTMLElement) {
  const { user } = store.state;
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand">
        <div class="brand-mark">K3</div>
        <div class="brand-text">KS3 <span>TACTICAL</span></div>
      </div>
      <nav class="nav">
        <div class="nav-item active" data-screen="menu"><span class="nav-icon">▶</span><span class="nav-label">Играть</span></div>
        <div class="nav-item" data-screen="play"><span class="nav-icon">🎮</span><span class="nav-label">Матчмейкинг</span><span class="nav-badge">128T</span></div>
        <div class="nav-item" data-screen="inventory"><span class="nav-icon">🎒</span><span class="nav-label">Инвентарь</span><span class="nav-badge">${store.state.inventory.length}</span></div>
        <div class="nav-item" data-screen="cases"><span class="nav-icon">📦</span><span class="nav-label">Кейсы</span></div>
        <div class="nav-item" data-screen="shop"><span class="nav-icon">🛒</span><span class="nav-label">Магазин</span></div>
        <div class="nav-item" data-screen="profile"><span class="nav-icon">👤</span><span class="nav-label">Профиль</span></div>
        <div class="nav-item" data-screen="friends"><span class="nav-icon">👥</span><span class="nav-label">Друзья</span><span class="nav-badge">3</span></div>
        <div class="nav-item" data-screen="training"><span class="nav-icon">🎯</span><span class="nav-label">Обучение</span></div>
        <div class="nav-item" data-screen="settings"><span class="nav-icon">⚙️</span><span class="nav-label">Настройки</span></div>
      </nav>
      <div class="sidebar-profile">
        <div class="avatar">${user.avatar}</div>
        <div class="profile-info">
          <div class="profile-name">${user.name}</div>
          <div class="profile-rank">${user.rank} • ${user.mmr} MMR</div>
          <div class="profile-level"><div class="profile-level-fill"></div></div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="hero fade-in">
        <div class="hero-content">
          <div style="display:inline-flex; gap:8px; margin-bottom:16px;">
            <span style="background:rgba(0,217,255,0.15); border:1px solid rgba(0,217,255,0.3); color:#00D9FF; padding:4px 10px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">SEASON 1 • NEON DAWN</span>
            <span style="background:rgba(255,77,0,0.15); border:1px solid rgba(255,77,0,0.3); color:#FF4D00; padding:4px 10px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">128-TICK LIVE</span>
          </div>
          <h1 class="hero-title">ТАКТИЧЕСКИЙ<br><span>ШУТЕР БУДУЩЕГО</span></h1>
          <p class="hero-subtitle">Духовный наследник CS2 на Unreal Engine 5. Динамическая погода, разрушаемые укрытия, Morph Zones и честная экономика скинов. Без Pay-to-Win.</p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-large" id="btn-play-now">▶ Играть 5×5</button>
            <button class="btn btn-secondary" id="btn-training">Обучение с ИИ</button>
            <button class="btn btn-ghost" id="btn-hud-demo">HUD Demo</button>
          </div>
          <div style="display:flex; gap:24px; margin-top:24px; font-family:JetBrains Mono; font-size:12px; color:var(--text-dim);">
            <div><span style="color:var(--text); font-weight:700;">12,482</span> онлайн</div>
            <div><span style="color:var(--text); font-weight:700;">1.2M</span> матчей сегодня</div>
            <div><span style="color:var(--success);">●</span> Серверы CIS 12ms</div>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-top:20px;">
        <div>
          <h3 style="font-family:Rajdhani; font-weight:700; font-size:18px; margin-bottom:16px; letter-spacing:0.5px;">🔥 ЧТО НОВОГО В KS3</h3>
          <div class="grid grid-2">
            <div class="card">
              <div class="card-body">
                <div style="font-size:24px; margin-bottom:8px;">🌧️</div>
                <div style="font-weight:700; margin-bottom:4px;">Динамическая погода</div>
                <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">Дождь глушит шаги на 10%, ветер сносит смоки на 2м, туман режет видимость до 30м. Влияет на тактику.</div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div style="font-size:24px; margin-bottom:8px;">🧱</div>
                <div style="font-weight:700; margin-bottom:4px;">Разрушаемые укрытия</div>
                <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">12 точек на de_dustline. Деревянные ящики 80HP, пробиваются. Респавн каждый раунд.</div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div style="font-size:24px; margin-bottom:8px;">🎭</div>
                <div style="font-weight:700; margin-bottom:4px;">4 Специализации</div>
                <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">Breacher, Scout, Anchor, Support. Пассивные бонусы, без ультов. Баланс как в CS.</div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div style="font-size:24px; margin-bottom:8px;">🌀</div>
                <div style="font-weight:700; margin-bottom:4px;">Morph Zones</div>
                <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">Геометрия карты меняется каждый раунд. 3 варианта на зону. Реиграбельность x3.</div>
              </div>
            </div>
          </div>

          <h3 style="font-family:Rajdhani; font-weight:700; font-size:18px; margin:28px 0 16px;">🗺️ КАРТЫ MVP</h3>
          <div class="grid grid-3">
            ${[
              { id:'de_dustline', name:'de_dustline', desc:'Нефтяная станция, песчаная буря, 2 плента', img:'🏜️' },
              { id:'de_neon', name:'de_neon', desc:'Киберпанк Токио, дождь, неон, вертикаль', img:'🌃' },
              { id:'cs_ark', name:'cs_ark', desc:'Контейнеровоз, шторм, заложники', img:'🚢' },
            ].map(m => `
              <div class="card">
                <div style="height:120px; background:radial-gradient(ellipse at center, rgba(0,217,255,0.15), transparent), var(--bg3); display:flex; align-items:center; justify-content:center; font-size:48px;">${m.img}</div>
                <div class="card-body">
                  <div style="font-family:Rajdhani; font-weight:700;">${m.name}</div>
                  <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">${m.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="card">
            <div class="card-header"><div class="card-title">⚡ БЫСТРЫЙ МАТЧ</div></div>
            <div class="card-body">
              <div style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn btn-primary" data-quick="classic">Classic 5×5 • de_dustline</button>
                <button class="btn btn-secondary" data-quick="wingman">Wingman 2×2 • de_neon</button>
                <button class="btn btn-secondary" data-quick="dm">Deathmatch • Aim Lab</button>
                <div style="margin-top:12px; padding:12px; background:var(--bg); border-radius:8px; border:1px solid var(--border);">
                  <div style="font-family:JetBrains Mono; font-size:11px; color:var(--text-dim); margin-bottom:6px;">ТВОЯ СПЕЦИАЛИЗАЦИЯ</div>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${['Breacher','Scout','Anchor','Support'].map(s => `<span style="padding:4px 8px; border-radius:12px; font-size:11px; font-family:Rajdhani; font-weight:700; background:${s===user.specialization ? 'var(--accent)' : 'var(--glass)'}; color:${s===user.specialization ? '#000' : 'var(--text-dim)'}; border:1px solid ${s===user.specialization ? 'var(--accent)' : 'var(--border)'}; cursor:pointer;" data-spec="${s}">${s}</span>`).join('')}
                  </div>
                  <div style="font-size:11px; color:var(--text-dim); margin-top:8px; line-height:1.4;">
                    ${user.specialization === 'Breacher' ? '💥 +15% скорость планта, видишь HP укрытий' : user.specialization === 'Scout' ? '👁️ Тише шаги на 25%, следы врагов 3 сек' : user.specialization === 'Anchor' ? '🛡️ +20% дефьюз, -15% урон от гранат на пленте' : '🎒 2 флешки, дроп гранат, +$200 ассист'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card" style="margin-top:16px;">
            <div class="card-header"><div class="card-title">📦 ПОСЛЕДНИЙ ДРОП</div></div>
            <div class="card-body" style="text-align:center;">
              <div style="font-size:48px; margin-bottom:8px;">🎯</div>
              <div style="font-weight:700;">AK-R | Neon Rider</div>
              <div style="font-family:JetBrains Mono; font-size:11px; color:var(--mythic); margin-top:4px;">MYTHIC • $28.50</div>
              <button class="btn btn-secondary" style="width:100%; margin-top:12px;">Открыть еще кейс</button>
            </div>
          </div>

          <div class="card" style="margin-top:16px;">
            <div class="card-header"><div class="card-title">🤖 ИИ-ТРЕНЕР SPECTR</div></div>
            <div class="card-body">
              <div style="font-size:12px; color:var(--text-dim); line-height:1.5; margin-bottom:12px;">"Ты 70% раундов умираешь с флешкой в руке. Тренировка: бросок флешки + пикание. Я создал для тебя карту."</div>
              <div style="display:flex; gap:8px;">
                <div style="flex:1; height:4px; background:var(--bg3); border-radius:2px; overflow:hidden;"><div style="width:42%; height:100%; background:var(--warning);"></div></div>
                <span style="font-family:JetBrains Mono; font-size:10px;">42% прогресс</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // events
  container.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const screen = (el as HTMLElement).dataset.screen!;
      if (screen === 'menu') return;
      store.setScreen(screen as any);
    });
  });
  container.querySelector('#btn-play-now')?.addEventListener('click', () => store.setScreen('play'));
  container.querySelector('#btn-training')?.addEventListener('click', () => store.setScreen('training'));
  container.querySelector('#btn-hud-demo')?.addEventListener('click', () => store.setScreen('hud'));
  container.querySelectorAll('[data-quick]').forEach(el => {
    el.addEventListener('click', () => store.setScreen('play'));
  });
  container.querySelectorAll('[data-spec]').forEach(el => {
    el.addEventListener('click', () => {
      const spec = (el as HTMLElement).dataset.spec as any;
      store.state.user.specialization = spec;
      renderMainMenu(container);
    });
  });
}
