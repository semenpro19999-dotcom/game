import { store } from '../core/store';

export function renderFriends(container: HTMLElement) {
  container.innerHTML = `
    <div class="sidebar"><div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>FRIENDS</span></div></div><nav class="nav"><div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div><div class="nav-item active"><span class="nav-icon">👥</span><span class="nav-label">Друзья • 3 онлайн</span></div></nav></div>
    <div class="main-content">
      <h1 style="font-family:Rajdhani; font-size:28px; font-weight:700; margin-bottom:20px;">ДРУЗЬЯ • 12 • 3 ОНЛАЙН</h1>
      <div class="grid grid-3">
        ${[
          { name:'NeonRider', status:'В игре • de_dustline', rank:'Diamond', online:true },
          { name:'ClutchKing', status:'В лобби', rank:'Gold II', online:true },
          { name:'AimLab', status:'Тренировка', rank:'Platinum', online:true },
          { name:'FractureMain', status:'Оффлайн 2ч', rank:'Silver', online:false },
        ].map(f => `<div class="card"><div class="card-body" style="display:flex; gap:12px; align-items:center;"><div style="width:48px; height:48px; border-radius:50%; background:${f.online ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'var(--bg3)'}; display:flex; align-items:center; justify-content:center; font-weight:700;">${f.name[0]}</div><div><div style="font-weight:600;">${f.name}</div><div style="font-size:11px; color:${f.online ? 'var(--success)' : 'var(--text-dim)'};">${f.status} • ${f.rank}</div></div><div style="margin-left:auto; width:8px; height:8px; background:${f.online ? 'var(--success)' : 'var(--text-muted)'}; border-radius:50%;"></div></div></div>`).join('')}
      </div>
    </div>
  `;
  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
}

export function renderTraining(container: HTMLElement) {
  container.innerHTML = `
    <div class="sidebar"><div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>TRAIN</span></div></div><nav class="nav"><div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div><div class="nav-item active"><span class="nav-icon">🎯</span><span class="nav-label">Обучение</span></div></nav></div>
    <div class="main-content">
      <h1 style="font-family:Rajdhani; font-size:32px; font-weight:700; margin-bottom:8px;">ОБУЧЕНИЕ • ИИ-ТРЕНЕР SPECTR</h1>
      <p style="color:var(--text-dim); margin-bottom:24px;">Aim Lab внутри игры, prefire карты, гранаты с траекторией, анализ демок локально.</p>
      <div class="grid grid-3">
        ${[
          { title:'Aim Trainer', desc:'15 мин • Тренировка спрея, хедшотов, flicks. Твоя слабая зона: 30м+', icon:'🎯', color:'var(--accent)' },
          { title:'Grenade Lineups', desc:'de_dustline • 24 смока, 18 флешек. Траектория в реальном времени', icon:'💥', color:'var(--accent-2)' },
          { title:'Recoil Control', desc:'AK-R pattern • 7 пуль на изучение, затем рандом. Твой прогресс 68%', icon:'📈', color:'var(--mythic)' },
          { title:'Prefire Map', desc:'Углы de_neon • 32 позиции. Учись пикать правильно', icon:'👁️', color:'var(--success)' },
          { title:'Economy Quiz', desc:'Тест на экономику • Когда форс, когда сейв', icon:'💰', color:'var(--warning)' },
          { title:'1v1 Arena', desc:'Дуэли с ботами • 128-tick, instant HS', icon:'⚔️', color:'var(--immortal)' },
        ].map(c => `<div class="card" style="cursor:pointer;"><div class="card-body"><div style="font-size:32px; margin-bottom:12px;">${c.icon}</div><div style="font-weight:700; margin-bottom:4px;">${c.title}</div><div style="font-size:12px; color:var(--text-dim); line-height:1.4; margin-bottom:12px;">${c.desc}</div><button class="btn btn-secondary" style="width:100%; padding:8px; font-size:12px;">Начать</button></div></div>`).join('')}
      </div>
      <div class="card" style="margin-top:24px;">
        <div class="card-header"><div class="card-title">📊 ТВОЙ ПРОГРЕСС • НЕДЕЛЯ</div></div>
        <div class="card-body">
          <div style="display:grid; grid-template-columns: repeat(4,1fr); gap:16px; text-align:center;">
            <div><div style="font-family:Rajdhani; font-size:24px; font-weight:700; color:var(--accent);">4.2h</div><div style="font-size:11px; color:var(--text-dim);">Тренировок</div></div>
            <div><div style="font-family:Rajdhani; font-size:24px; font-weight:700; color:var(--success);">+3.2%</div><div style="font-size:11px; color:var(--text-dim);">Точность HS</div></div>
            <div><div style="font-family:Rajdhani; font-size:24px; font-weight:700; color:var(--warning);">12</div><div style="font-size:11px; color:var(--text-dim);">Новых смоков</div></div>
            <div><div style="font-family:Rajdhani; font-size:24px; font-weight:700;">Gold III</div><div style="font-size:11px; color:var(--text-dim);">Ранг не изменился</div></div>
          </div>
        </div>
      </div>
    </div>
  `;
  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
}
