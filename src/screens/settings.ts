import { store } from '../core/store';

export function renderSettings(container: HTMLElement) {
  const s = store.state.settings;
  container.innerHTML = `
    <div class="sidebar">
      <div class="brand"><div class="brand-mark">K3</div><div class="brand-text">KS3 <span>SETTINGS</span></div></div>
      <nav class="nav">
        <div class="nav-item" data-screen="menu"><span class="nav-icon">◀</span><span class="nav-label">Назад</span></div>
        <div class="nav-item active"><span class="nav-icon">⚙️</span><span class="nav-label">Настройки</span></div>
      </nav>
    </div>
    <div class="main-content">
      <h1 style="font-family:Rajdhani; font-size:32px; font-weight:700; margin-bottom:24px;">НАСТРОЙКИ</h1>
      <div class="settings-grid">
        <div class="settings-nav">
          <div class="settings-nav-item active" data-tab="graphics">🖥️ Графика</div>
          <div class="settings-nav-item" data-tab="sound">🔊 Звук</div>
          <div class="settings-nav-item" data-tab="controls">🎮 Управление</div>
          <div class="settings-nav-item" data-tab="crosshair">🎯 Прицел</div>
          <div class="settings-nav-item" data-tab="account">👤 Аккаунт</div>
        </div>
        <div class="settings-panel" id="settings-panel">
          <!-- Graphics -->
          <div data-panel="graphics">
            <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">ГРАФИКА • UE5 LUMEN • 128-TICK</h3>
            ${[
              { label:'Качество', desc:'Low/Medium/High/Ultra, влияет на Lumen, тени', value:s.graphics.quality },
              { label:'Разрешение', desc:'1920x1080 • Рекомендуется для 144Hz', value:s.graphics.resolution },
              { label:'V-Sync', desc:'Откл для мин задержки, вкл для без разрывов', value: s.graphics.vsync ? 'Вкл' : 'Откл' },
              { label:'Lumen GI', desc:'Глобальное освещение, -15% FPS', value: s.graphics.lumen ? 'Вкл' : 'Откл' },
              { label:'DLSS/FSR', desc:'Апскейл, +40% FPS на RTX', value: s.graphics.dlss ? 'DLSS Quality' : 'Откл' },
            ].map(row => `
              <div class="setting-row">
                <div><div class="setting-label">${row.label}</div><div class="setting-desc">${row.desc}</div></div>
                <div class="setting-control"><span style="font-family:JetBrains Mono; font-size:12px; background:var(--bg2); border:1px solid var(--border); padding:6px 12px; border-radius:6px;">${row.value}</span></div>
              </div>
            `).join('')}
            <div style="margin-top:16px; padding:12px; background:rgba(0,217,255,0.1); border:1px solid rgba(0,217,255,0.2); border-radius:8px; font-size:12px; color:var(--text-dim);">
              💡 Для киберспорта: Low, 1280x960 stretched, Lumen Off, DLSS Off, Reflex On+Boost → 400+ FPS на RTX 3060
            </div>
          </div>

          <div data-panel="sound" style="display:none;">
            <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">ЗВУК • HRTF • 3D AUDIO</h3>
            ${[
              { label:'Master', val:s.sound.master },
              { label:'SFX', val:s.sound.sfx },
              { label:'Voice', val:s.sound.voice },
              { label:'Music', val:s.sound.music },
            ].map(r => `
              <div class="setting-row">
                <div><div class="setting-label">${r.label}</div><div class="setting-desc">Громкость ${r.label}</div></div>
                <div class="setting-control">
                  <div class="slider"><div class="slider-fill" style="width:${r.val}%"></div><div class="slider-thumb" style="left:${r.val}%"></div></div>
                  <span style="font-family:JetBrains Mono; font-size:12px; min-width:32px;">${r.val}</span>
                </div>
              </div>
            `).join('')}
            <div class="setting-row"><div><div class="setting-label">HRTF</div><div class="setting-desc">3D звук, важно для вертикали</div></div><div class="setting-control"><span style="background:var(--success); color:#fff; padding:4px 10px; border-radius:12px; font-size:11px;">ВКЛ</span></div></div>
          </div>

          <div data-panel="controls" style="display:none;">
            <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">УПРАВЛЕНИЕ • SENSITIVITY</h3>
            <div class="setting-row"><div><div class="setting-label">Чувствительность</div><div class="setting-desc">2.1 @ 800 DPI = 45cm/360°</div></div><div class="setting-control"><div class="slider"><div class="slider-fill" style="width:52%"></div><div class="slider-thumb" style="left:52%"></div></div><span style="font-family:JetBrains Mono;">${s.controls.sensitivity}</span></div></div>
            <div class="setting-row"><div><div class="setting-label">DPI</div><div class="setting-desc">Мышь DPI</div></div><div class="setting-control"><span style="font-family:JetBrains Mono; background:var(--bg2); padding:6px 12px; border-radius:6px; border:1px solid var(--border);">800</span></div></div>
            <div style="margin-top:16px; font-size:12px; color:var(--text-dim);">
              Бинды: WAD S, Shift Walk, Ctrl Crouch, Space Jump, Mouse1 Shoot, Mouse2 Scope, Q Last Weapon, R Reload, G Drop, E Use, F Inspect
            </div>
          </div>

          <div data-panel="crosshair" style="display:none;">
            <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">ПРИЦЕЛ • CROSSHAIR</h3>
            <div style="display:flex; gap:24px;">
              <div class="crosshair-preview" id="cross-preview">
                <div class="crosshair-dot" style="background:${s.controls.crosshair.color}; display:${s.controls.crosshair.dot ? 'block' : 'none'};"></div>
                <div class="crosshair-line h" style="background:${s.controls.crosshair.color}; width:${s.controls.crosshair.size*2}px; height:${s.controls.crosshair.thickness}px; left:50%; top:50%; transform:translate(-50%,-50%) translateX(-${s.controls.crosshair.size + s.controls.crosshair.gap}px);"></div>
                <div class="crosshair-line h" style="background:${s.controls.crosshair.color}; width:${s.controls.crosshair.size*2}px; height:${s.controls.crosshair.thickness}px; left:50%; top:50%; transform:translate(-50%,-50%) translateX(${s.controls.crosshair.size + s.controls.crosshair.gap}px);"></div>
                <div class="crosshair-line v" style="background:${s.controls.crosshair.color}; height:${s.controls.crosshair.size*2}px; width:${s.controls.crosshair.thickness}px; left:50%; top:50%; transform:translate(-50%,-50%) translateY(-${s.controls.crosshair.size + s.controls.crosshair.gap}px);"></div>
                <div class="crosshair-line v" style="background:${s.controls.crosshair.color}; height:${s.controls.crosshair.size*2}px; width:${s.controls.crosshair.thickness}px; left:50%; top:50%; transform:translate(-50%,-50%) translateY(${s.controls.crosshair.size + s.controls.crosshair.gap}px);"></div>
              </div>
              <div style="flex:1;">
                <div class="setting-row"><div><div class="setting-label">Цвет</div></div><div class="setting-control"><input type="color" value="${s.controls.crosshair.color}" style="width:40px; height:32px; border-radius:6px; border:1px solid var(--border); background:var(--bg2);"></div></div>
                <div class="setting-row"><div><div class="setting-label">Размер</div></div><div class="setting-control"><div class="slider"><div class="slider-fill" style="width:${s.controls.crosshair.size*10}%"></div><div class="slider-thumb" style="left:${s.controls.crosshair.size*10}%"></div></div></div></div>
                <div class="setting-row"><div><div class="setting-label">Толщина</div></div><div class="setting-control"><div class="slider"><div class="slider-fill" style="width:${s.controls.crosshair.thickness*30}%"></div><div class="slider-thumb" style="left:${s.controls.crosshair.thickness*30}%"></div></div></div></div>
                <div class="setting-row"><div><div class="setting-label">Зазор</div></div><div class="setting-control"><div class="slider"><div class="slider-fill" style="width:${(s.controls.crosshair.gap+5)*10}%"></div><div class="slider-thumb" style="left:${(s.controls.crosshair.gap+5)*10}%"></div></div></div></div>
                <div style="margin-top:12px; display:flex; gap:8px;">
                  <button class="btn btn-secondary" style="padding:8px 12px; font-size:11px;">Импорт код</button>
                  <button class="btn btn-secondary" style="padding:8px 12px; font-size:11px;">Экспорт</button>
                  <button class="btn btn-ghost" style="padding:8px 12px; font-size:11px;">Сбросить</button>
                </div>
              </div>
            </div>
            <div style="margin-top:16px; background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:12px; font-family:JetBrains Mono; font-size:11px; color:var(--text-dim);">
              Код прицела: CSGO-O4J8D-7Y2A3-X5Z9Q-2W8E1-V6T4R • Скопируй для друзей
            </div>
          </div>

          <div data-panel="account" style="display:none;">
            <h3 style="font-family:Rajdhani; font-weight:700; margin-bottom:16px;">АККАУНТ • БЕЗОПАСНОСТЬ</h3>
            <div class="setting-row"><div><div class="setting-label">Steam Связан</div><div class="setting-desc">Spectr_7 • Level 42 • 1200 часов CS2</div></div><div class="setting-control"><span style="background:var(--success); color:#fff; padding:4px 10px; border-radius:12px; font-size:11px;">● Связан</span></div></div>
            <div class="setting-row"><div><div class="setting-label">2FA</div><div class="setting-desc">Обязательно для трейдов >$100</div></div><div class="setting-control"><span style="background:var(--success); color:#fff; padding:4px 10px; border-radius:12px; font-size:11px;">Вкл • Authenticator</span></div></div>
            <div class="setting-row"><div><div class="setting-label">Античит</div><div class="setting-desc">EAC + ML анализ</div></div><div class="setting-control"><span style="background:var(--success); color:#fff; padding:4px 10px; border-radius:12px; font-size:11px;">Активен</span></div></div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.settings-nav-item').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.settings-nav-item').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      const tab = (el as HTMLElement).dataset.tab;
      container.querySelectorAll('[data-panel]').forEach(p => {
        (p as HTMLElement).style.display = (p as HTMLElement).dataset.panel === tab ? 'block' : 'none';
      });
    });
  });
  container.querySelectorAll('[data-screen]').forEach(el => el.addEventListener('click', () => store.setScreen((el as HTMLElement).dataset.screen as any)));
}
