import './style.css';
import { store } from './core/store';
import { Background3D } from './engine/threeBackground';
import { renderMainMenu } from './screens/mainMenu';
import { renderMatchmaking } from './screens/matchmaking';
import { renderInventory } from './screens/inventory';
import { renderCases } from './screens/cases';
import { renderShop } from './screens/shop';
import { renderProfile } from './screens/profile';
import { renderSettings } from './screens/settings';
import { renderHUD, renderResult } from './screens/hud';
import { renderFriends, renderTraining } from './screens/other';

const uiRoot = document.getElementById('ui-root')!;
const hudRoot = document.getElementById('hud-root')!;
const bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const loading = document.getElementById('loading-screen')!;

// Init 3D background
let bg: Background3D;
try {
  bg = new Background3D(bgCanvas);
} catch (e) {
  console.warn('Three.js failed, fallback to CSS', e);
  bgCanvas.style.display = 'none';
}

// Hide loading after 2s
setTimeout(() => {
  loading.classList.add('hidden');
}, 1800);

function render() {
  const screen = store.state.screen;
  uiRoot.innerHTML = '';
  hudRoot.innerHTML = '';
  hudRoot.classList.add('hidden');
  uiRoot.style.display = 'flex';

  switch(screen) {
    case 'menu': renderMainMenu(uiRoot); break;
    case 'play': renderMatchmaking(uiRoot); break;
    case 'inventory': renderInventory(uiRoot); break;
    case 'cases': renderCases(uiRoot); break;
    case 'shop': renderShop(uiRoot); break;
    case 'profile': renderProfile(uiRoot); break;
    case 'settings': renderSettings(uiRoot); break;
    case 'friends': renderFriends(uiRoot); break;
    case 'training': renderTraining(uiRoot); break;
    case 'hud': 
      uiRoot.style.display = 'none';
      hudRoot.classList.remove('hidden');
      renderHUD(hudRoot);
      break;
    case 'result':
      uiRoot.style.display = 'none';
      hudRoot.classList.remove('hidden');
      renderResult(hudRoot);
      break;
    default: renderMainMenu(uiRoot);
  }
}

store.subscribe(render);
render();

// Global shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (store.state.screen === 'hud' || store.state.screen === 'result') store.setScreen('menu');
  }
});

console.log('%cKS3 %cTACTICAL SHOOTER v1.0 • 128-TICK • UE5 • Built in Arena', 'background:#00D9FF; color:#000; padding:4px 8px; border-radius:4px; font-weight:700;', 'color:#9CA3AF;');
console.log('GDD: /docs/GDD.md • Tech: /docs/TECH_STACK.md • Cases: /docs/CASE_SYSTEM.md');
