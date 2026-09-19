import { store } from '../core/store';

export function renderHUD(container: HTMLElement) {
  const hud = store.state.hud;
  container.innerHTML = `
    <div class="hud">
      <div class="hud-top">
        <div class="hud-radar">
          <div class="radar-grid"></div>
          <div class="radar-player"></div>
          <div style="position:absolute; top:40%; left:60%; width:6px; height:6px; background:#FF4D00; border-radius:50%;"></div>
          <div style="position:absolute; top:70%; left:30%; width:6px; height:6px; background:#00D9FF; border-radius:50%;"></div>
          <div style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); font-family:JetBrains Mono; font-size:8px; color:var(--text-dim);">de_dustline • Rain</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin:0 auto;">
          <div class="hud-timer">
            <div class="label">Раунд 13 • MR12</div>
            <div>${hud.timer}</div>
            <div style="font-size:10px; color:var(--text-dim); margin-top:4px;">💣 Planted A • Morph: Doors Closed</div>
          </div>
          <div class="hud-score">
            <div class="score-team spectrum">⬢ SPECTRUM ${hud.score.s}</div>
            <div style="color:var(--text-dim);">:</div>
            <div class="score-team fracture">${hud.score.f} FRACTURE ⬣</div>
          </div>
          <div style="display:flex; gap:6px; margin-top:8px;">
            ${['Breacher','Scout','Anchor','Support','Breacher'].map((spec,i) => `<div style="width:28px; height:28px; border-radius:50%; background:${i<2 ? 'var(--accent)' : 'var(--bg3)'}; border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px;" title="${spec}">${['💥','👁️','🛡️','🎒','💥'][i]}</div>`).join('')}
          </div>
        </div>
        <div class="killfeed">
          <div class="kill-item"><span style="color:var(--accent);">Spectr_7</span> <span>🎯</span> <span style="color:var(--accent-2);">Fracture_3</span> <span style="color:var(--text-dim);">AK-R</span></div>
          <div class="kill-item"><span style="color:var(--accent-2);">Fracture_1</span> <span>💥</span> <span style="color:var(--accent);">Spectr_2</span> <span style="color:var(--text-dim);">HE</span></div>
          <div class="kill-item"><span style="color:var(--accent);">Spectr_7</span> <span>🔪</span> <span style="color:var(--accent-2);">Fracture_2</span> <span style="color:var(--immortal);">[Immortal Knife]</span></div>
        </div>
      </div>

      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;">
        <div style="width:4px; height:4px; background:#00D9FF; border-radius:50%; box-shadow:0 0 10px #00D9FF;"></div>
        <div style="position:absolute; width:20px; height:2px; background:#00D9FF; left:-26px; top:1px; opacity:0.8;"></div>
        <div style="position:absolute; width:20px; height:2px; background:#00D9FF; left:10px; top:1px; opacity:0.8;"></div>
        <div style="position:absolute; width:2px; height:20px; background:#00D9FF; left:1px; top:-26px; opacity:0.8;"></div>
        <div style="position:absolute; width:2px; height:20px; background:#00D9FF; left:1px; top:10px; opacity:0.8;"></div>
      </div>

      <div class="hud-bottom">
        <div class="hud-player">
          <div class="hud-health">
            <div class="health-bar hp"><div class="label">HP • Breacher +10% vs nades</div><div class="value">${hud.hp}</div></div>
            <div class="health-bar armor"><div class="label">Armor • Weather Rain -10% steps</div><div class="value">${hud.armor}</div></div>
          </div>
          <div style="background:rgba(0,0,0,0.7); backdrop-filter:blur(12px); border:1px solid var(--border); border-radius:8px; padding:10px 14px; display:flex; gap:8px; align-items:center;">
            <span style="font-size:20px;">💣</span><span style="font-family:JetBrains Mono; font-size:12px;">C4 • 3.5s plant • 10s defuse</span>
          </div>
        </div>
        <div style="display:flex; gap:16px; align-items:flex-end;">
          <div style="display:flex; gap:6px;">
            ${['🔵','🔵','⚪','🟠','💥'].map(g => `<div style="width:36px; height:36px; background:rgba(0,0,0,0.7); border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px;">${g}</div>`).join('')}
          </div>
          <div class="hud-ammo">
            <div class="bullets">${hud.ammo} <span style="color:var(--text-dim); font-size:18px;">/ ${hud.reserve}</span></div>
            <div class="reserve">AK-R • 7.62mm • $2700 • 600 RPM • Recoil pattern</div>
            <div style="font-family:JetBrains Mono; font-size:10px; color:var(--success); margin-top:4px;">● 128-TICK • 12ms • No spread first bullet</div>
          </div>
          <div style="background:rgba(0,0,0,0.7); backdrop-filter:blur(12px); border:1px solid var(--border); border-radius:8px; padding:10px 14px;">
            <div style="font-family:JetBrains Mono; font-size:10px; color:var(--text-dim);">MONEY</div>
            <div style="font-family:Rajdhani; font-size:20px; font-weight:700; color:var(--success);">$${hud.money}</div>
            <div style="font-size:10px; color:var(--text-dim);">Loss bonus $1900</div>
          </div>
        </div>
      </div>

      <div style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:8px; pointer-events:auto;">
        <button class="btn btn-secondary" id="btn-hud-exit">Выйти в меню</button>
        <button class="btn btn-ghost" id="btn-hud-echo">Echo Replay (3s)</button>
        <button class="btn btn-ghost" id="btn-hud-spectr">ИИ-Тренер</button>
      </div>
    </div>
  `;

  container.querySelector('#btn-hud-exit')?.addEventListener('click', () => store.setScreen('menu'));
  container.querySelector('#btn-hud-echo')?.addEventListener('click', () => {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:30; flex-direction:column; gap:16px;`;
    el.innerHTML = `<div style="font-family:Rajdhani; font-size:24px; font-weight:700;">ECHO REPLAY • Последние 3 секунды</div><div style="width:640px; height:360px; background:var(--bg2); border:1px solid var(--border); border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:JetBrains Mono; color:var(--text-dim);">👁️ Глазами убийцы • Траектория пуль • Рентген • 0.8x slow-mo</div><button class="btn btn-primary" id="close-echo">Закрыть</button>`;
    container.appendChild(el);
    el.querySelector('#close-echo')?.addEventListener('click', () => el.remove());
  });
}

export function renderResult(container: HTMLElement) {
  container.innerHTML = `
    <div style="width:100%; height:100%; background: radial-gradient(ellipse at center, rgba(0,217,255,0.15), transparent 70%), var(--bg); display:flex; align-items:center; justify-content:center; padding:40px;">
      <div style="width:100%; max-width:800px; background:rgba(24,24,27,0.9); backdrop-filter:blur(24px); border:1px solid var(--border); border-radius:16px; overflow:hidden;">
        <div style="padding:32px; text-align:center; background: linear-gradient(135deg, rgba(0,217,255,0.1), rgba(255,77,0,0.1)); border-bottom:1px solid var(--border);">
          <div style="font-family:Rajdhani; font-size:48px; font-weight:700;">ПОБЕДА • 13:8</div>
          <div style="font-family:JetBrains Mono; font-size:12px; color:var(--text-dim); margin-top:8px;">de_dustline • Rain • Morph: Doors Closed • 128-tick • 34:22</div>
          <div style="margin-top:16px; display:inline-flex; gap:8px;">
            <span style="background:var(--accent); color:#000; padding:6px 14px; border-radius:20px; font-family:Rajdhani; font-weight:700;">MVP • Spectr_7 • 24/12/5</span>
            <span style="background:var(--glass); border:1px solid var(--border); padding:6px 14px; border-radius:20px; font-family:JetBrains Mono; font-size:11px;">+250 XP • +1 кейс</span>
          </div>
        </div>
        <div style="padding:24px;">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:20px;">
            <div>
              <div style="font-family:Rajdhani; font-weight:700; color:var(--accent); margin-bottom:12px;">⬢ SPECTRUM • 13</div>
              ${[
                { name:'Spectr_7', kda:'24/12/5', mvp:true, spec:'Breacher' },
                { name:'Spectr_2', kda:'18/14/7', mvp:false, spec:'Anchor' },
                { name:'Spectr_3', kda:'15/16/4', mvp:false, spec:'Scout' },
                { name:'Spectr_4', kda:'12/15/9', mvp:false, spec:'Support' },
                { name:'Spectr_5', kda:'10/13/6', mvp:false, spec:'Breacher' },
              ].map(p => `<div style="display:flex; justify-content:space-between; padding:8px 12px; background:${p.mvp ? 'rgba(0,217,255,0.1)' : 'var(--bg2)'}; border:1px solid ${p.mvp ? 'rgba(0,217,255,0.3)' : 'var(--border)'}; border-radius:8px; margin-bottom:6px;"><span style="font-weight:600; font-size:13px;">${p.mvp ? '👑 ' : ''}${p.name} <span style="font-size:10px; color:var(--text-dim);">${p.spec}</span></span><span style="font-family:JetBrains Mono; font-size:12px;">${p.kda}</span></div>`).join('')}
            </div>
            <div>
              <div style="font-family:Rajdhani; font-weight:700; color:var(--accent-2); margin-bottom:12px;">FRACTURE • 8 ⬣</div>
              ${[
                { name:'Fracture_1', kda:'19/18/2' },
                { name:'Fracture_2', kda:'16/17/3' },
                { name:'Fracture_3', kda:'14/19/1' },
                { name:'Fracture_4', kda:'11/16/4' },
                { name:'Fracture_5', kda:'9/18/2' },
              ].map(p => `<div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg2); border:1px solid var(--border); border-radius:8px; margin-bottom:6px;"><span style="font-weight:600; font-size:13px;">${p.name}</span><span style="font-family:JetBrains Mono; font-size:12px;">${p.kda}</span></div>`).join('')}
            </div>
          </div>
          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary" style="flex:1;" id="btn-continue">Продолжить • Открыть дроп</button>
            <button class="btn btn-secondary" id="btn-menu">В меню</button>
          </div>
        </div>
      </div>
    </div>
  `;
  container.querySelector('#btn-menu')?.addEventListener('click', () => store.setScreen('menu'));
  container.querySelector('#btn-continue')?.addEventListener('click', () => store.setScreen('cases'));
}
