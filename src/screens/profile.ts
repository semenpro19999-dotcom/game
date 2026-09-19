import { store } from '../core/store';

export function renderProfile(container: HTMLElement) {
  const u = store.state.user;
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>PROFILE</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div>
        <div class="nav-item active"><span class="nav-icon">👤</span><span class="nav-label">Профиль</span></div>
        <div class="nav-item" data-screen="inventory"><span class="nav-icon">🎒</span><span class="nav-label">Инвентарь</span></div>
        <div class="nav-item" data-screen="settings"><span class="nav-icon">⚙️</span><span class="nav-label">Настройки</span></div>
      </nav>
    </div>
    <div class="main-content">
      <div style="display:flex; gap:24px; align-items:center; margin-bottom:32px;">
        <div style="width:96px; height:96px; border-radius:50%; background:linear-gradient(135deg, var(--accent), var(--accent-2)); display:flex; align-items:center; justify-content:center; font-family:Rajdhani; font-size:40px; font-weight:700;">${u.avatar}</div>
        <div>
          <div style="font-family:Rajdhani; font-size:32px; font-weight:700;">${u.name} <span style="color:var(--text-dim); font-weight:500; font-size:20px;">#${u.id.slice(-4)}</span></div>
          <div style="display:flex; gap:12px; margin-top:8px; align-items:center;">
            <span style="background:rgba(0,217,255,0.15); border:1px solid rgba(0,217,255,0.3); color:var(--accent); padding:4px 10px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">${u.rank} • ${u.mmr} MMR</span>
            <span style="background:var(--glass); border:1px solid var(--border); padding:4px 10px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">LVL ${u.level} • ${u.xp}% XP</span>
            <span style="background:var(--glass); border:1px solid var(--border); padding:4px 10px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">🎯 ${u.specialization}</span>
          </div>
          <div style="margin-top:12px; width:320px; height:6px; background:var(--bg3); border-radius:3px; overflow:hidden;"><div style="width:${u.xp}%; height:100%; background:linear-gradient(90deg, var(--accent), var(--accent-2));"></div></div>
        </div>
        <div style="margin-left:auto; display:flex; gap:12px;">
          <button class="btn btn-secondary">Редактировать</button>
          <button class="btn btn-primary">Поделиться</button>
        </div>
      </div>

      <div class="stats-grid">
        ${[
          { label:'K/D', value:u.stats.kd.toFixed(2) },
          { label:'HS %', value:u.stats.hsPercent+'%' },
          { label:'Побед', value:u.stats.wins },
          { label:'Матчей', value:u.stats.matches },
          { label:'Убийств', value:u.stats.kills },
          { label:'Смертей', value:u.stats.deaths },
          { label:'Винрейт', value:((u.stats.wins/u.stats.matches)*100).toFixed(1)+'%' },
          { label:'CR', value:u.credits },
        ].map(s => `<div class="stat-card"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
        <div class="card">
          <div class="card-header"><div class="card-title">🏆 ДОСТИЖЕНИЯ • 12/48</div></div>
          <div class="card-body" style="display:grid; grid-template-columns: repeat(4,1fr); gap:12px;">
            ${Array.from({length:8}).map((_,i) => `<div style="aspect-ratio:1; background:var(--bg2); border:1px solid ${i<3 ? 'var(--accent)' : 'var(--border)'}; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; ${i<3?'box-shadow:0 0 20px rgba(0,217,255,0.2)':''}"><div style="font-size:24px;">${['🎯','💥','🛡️','🔥','👑','⚡','🎖️','💎'][i]}</div><div style="font-size:9px; font-family:JetBrains Mono; color:var(--text-dim); text-align:center;">${['First Blood','Ace','Clutch 1v3','Ninja Defuse','Immortal','10k Kills','Veteran','Collector'][i]}</div></div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📜 ИСТОРИЯ МАТЧЕЙ</div></div>
          <div class="card-body" style="display:flex; flex-direction:column; gap:8px;">
            ${[
              { map:'de_dustline', result:'Победа', score:'13:8', kda:'21/12/4' },
              { map:'de_neon', result:'Поражение', score:'11:13', kda:'18/15/2' },
              { map:'de_dustline', result:'Победа', score:'13:5', kda:'24/9/5' },
              { map:'cs_ark', result:'Победа', score:'13:10', kda:'19/14/3' },
            ].map(m => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:10px 14px;">
                <div><div style="font-weight:600; font-size:13px;">${m.map}</div><div style="font-size:11px; color:var(--text-dim);">${m.score} • ${m.kda}</div></div>
                <span style="padding:4px 8px; border-radius:12px; font-size:10px; font-family:Rajdhani; font-weight:700; background:${m.result==='Победа' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color:${m.result==='Победа' ? '#10B981' : '#EF4444'}; border:1px solid ${m.result==='Победа' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'};">${m.result}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:20px;">
        <div class="card-header"><div class="card-title">🤖 ИИ-ТРЕНЕР SPECTR • АНАЛИЗ ДЕМОК</div></div>
        <div class="card-body">
          <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:16px;">
            <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
              <div style="font-weight:700; font-size:13px; margin-bottom:6px;">🔴 Слабые места</div>
              <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">• 70% смертей с флешкой в руке<br>• 45% промахов на дистанции >30м<br>• Экономика: форс в 3 раунде 80%</div>
            </div>
            <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
              <div style="font-weight:700; font-size:13px; margin-bottom:6px;">🟢 Сильные стороны</div>
              <div style="font-size:12px; color:var(--text-dim); line-height:1.5;">• 42% HS, выше среднего<br>• Clutch 1v2: 35% винрейт<br>• Быстрый дефьюз: avg 4.2s</div>
            </div>
            <div style="background:linear-gradient(135deg, rgba(0,217,255,0.1), rgba(255,77,0,0.1)); border:1px solid var(--accent); border-radius:8px; padding:14px;">
              <div style="font-weight:700; font-size:13px; margin-bottom:6px;">🎯 Тренировка на сегодня</div>
              <div style="font-size:12px; color:var(--text-dim); line-height:1.5; margin-bottom:10px;">Aim Lab: 15 мин • Флешки de_dustline • Экономика тест</div>
              <button class="btn btn-primary" style="width:100%; padding:8px; font-size:12px;">Начать тренировку</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
}
