# KS3 — Art Direction & 2D/3D Asset Guide

## 1. Художественный стиль: Stylized Realism

**Определение:** Реалистичные пропорции и PBR, но с повышенной читаемостью, чистыми силуэтами, акцентными неонами. Не фотореализм как в Tarkov, не мультяшность как в Valorant — середина как в The Finals + CS2.

**Ключевые слова:** Тактический, чистый, техно-милитари, неон-нуар, читаемый, модульный.

### Палитра

- **Base:** 
  - Concrete: #8A8D93
  - Sand: #C2B280
  - Steel: #4A4E69
  - Night: #1A1A2E
- **Team:**
  - SPECTRUM (CT): #00D9FF (cyan) + #E0F7FA
  - FRACTURE (T): #FF4D00 (orange) + #FFCCBC
- **Rarity:** См. CASE_SYSTEM.md
- **UI:** Background #0F0F12, Glass rgba(255,255,255,0.06), Border rgba(255,255,255,0.12), Text #EAEAEA

**Правило 60-30-10:** 60% база десатурированная, 30% вторичный (дерево, металл), 10% акцент (неон команды, редкость).

### Освещение

- **Lumen GI:** Динамический, но запеченные лайтмапы для киберспорта (стабильный FPS)
- **Volumetric Fog:** Влияет на геймплей, цвет по погоде
- **Practical lights:** Неоновые вывески на de_neon, прожектора на de_dustline
- **Character lighting:** Rim light 20% для отделения от фона (как в Valorant, но слабее)

### Материалы

- **Оружие:** 3 слоя:
  1. Base metal (PBR)
  2. Skin overlay (albedo + normal + roughness mask, tiling 1x)
  3. Wear (lerp между clean и scratched, по curvature + AO)
- **Персонажи:** 2 материала — ткань (high roughness) и броня (low roughness, high metallic). Скины — только смена albedo, не модели (для хитбокса).
- **Окружение:** Trim sheets для оптимизации, декали для грязи.

---

## 2. 2D Графика — список ассетов

### Иконки оружия (32x32, 64x64, 128x128, SVG)
- K-45, S-19, D-50, R-8, P-90T
- M-9X, UMP-45X, P90-K
- AK-R, M4-Spectr, FAMAS-K, Galil-K, SG-553K
- AWP-K, SCAR-K, SSG-08K
- Nova-K, XM-1014K, M249-K, Negev-K
- Knife, Grenades (6), C4
- Стиль: Минималистичный силуэт, 2px stroke, цвет по команде

### Скины — карточки (512x512)
- Фон: градиент по редкости + паттерн (holo, foil, metallic)
- Оружие: рендер 3/4, 30deg, тень
- Редкость: полоса внизу + иконка
- Эффекты: 
  - Common: matte
  - Legendary: holographic foil (shift)
  - Immortal: animated gold, particles (canvas)

### Кейсы (512x768)
- 3D box, голограмма, лента с скинами внутри (видно через щель)
- Анимация: hover tilt, glow
- Типы: Recruit (серый), Spectrum (синий неон), Fracture (оранжевый), Season (анимированный)

### UI Элементы
- Кнопки: Primary (cyan), Secondary (glass), Danger (orange), 8px radius, 2px border
- Фреймы: Glassmorphism, backdrop-blur 12px, border 1px rgba(255,255,255,0.1)
- Иконки навигации: Play, Inventory, Cases, Shop, Profile, Friends, Settings, Training — line icons 24px
- Баннеры: 1920x400, для ивентов, с 3D персонажами
- Лоадинг-скрины: 1920x1080, арт карты + советы + лор

### Ранги и значки
- 12 рангов: иконки от Bronze (камень) до Legend (кристалл с короной), 128x128
- Аватары: 64x64, круглые, рамка по рангу
- Эмблемы команд: 256x256, кастомные, загрузка

### Генеративные промпты (для Midjourney / Stable Diffusion)

```
PROMPT for weapon skin concept:
"tactical rifle skin, stylized realism, cyan and black geometric pattern, PBR material, wear and scratches, CS2 skin style, ArtStation trending, 8k, --ar 16:9 --style raw"

PROMPT for character:
"SPECTRUM operator, British SAS, futuristic tactical gear, cyan neon accents, full body, neutral pose, game character design, Unreal Engine 5 render, ArtStation --ar 2:3"

PROMPT for case:
"futuristic loot case, holographic, cyan glow, sci-fi military crate, glass and metal, volumetric light, Behance --ar 3:4"

PROMPT for map loading screen:
"abandoned oil station desert, tactical shooter map, wide angle, volumetric dust, The Finals art style, high detail, 4k --ar 16:9"
```

---

## 3. 3D Модели — список

### Оружие (High poly + Low poly + LODs)

| Оружие | Полигоны Low | Текстуры | Анимации |
|---|---|---|---|
| K-45 (Glock) | 8k tris | 2k PBR | idle, shoot, reload, inspect |
| AK-R | 12k tris | 2k + skin overlay | + bolt |
| M4-Spectr | 13k tris | 2k | + silencer toggle |
| AWP-K | 15k tris | 2k | bolt, scope |
| Knife | 6k tris | 2k | slash, stab, inspect spin |

- **UV:** 0-1, overlapping для симметрии, 2 UV channel для lightmap
- **PBR:** Albedo, Normal (OpenGL), Roughness, Metallic, AO, Emissive для неона
- **Экспорт:** FBX, 1 unit = 1 cm, pivot в рукояти, LOD0/1/2 (50%, 25%)

### Персонажи

- **Base mesh:** 25k tris, 4k textures
- **Rig:** HumanIK, 65 bones, twist bones для рук
- **Factions:** 2 base + 4 variations (шлем, без шлема, броня)
- **Viewmodel:** Только руки + оружие, 10k tris, отдельная анимация

### Карты (de_dustline пример)

- **Blockout:** BSP, 1x1m grid, тест геймплея
- **Art pass:** Modular kits: wall 4x4m, floor, trim, props
- **Props:** 50+ уникальных: ящики, бочки, машины, кондиционеры
- **Lighting:** Lumen, lightmass importance volume, reflection captures
- **Optimization:** HLOD, culling, occlusion

### Анимации

- **Персонаж 3rd person:** idle, walk (4 dir), run, crouch, jump, death (5), hit, plant, defuse
- **Viewmodel:** idle (3 variations), walk sway, run, shoot (recoil), reload (3), inspect (2), draw
- **FPS:** 60 fps, root motion для 3rd, без для viewmodel

---

## 4. Референсы (поиск)

**ArtStation:**
- CS2 weapon skins — Vasco Rodrigues high poly AK-47 [4](https://www.artstation.com/artwork/5vxG4J) — идеальный пайплайн low→high→bake
- CS2 fanart characters [2](https://www.artstation.com/artwork/DvYo9n)
- Vibez skin — пример стилизации [1](https://www.artstation.com/artwork/29bk9J)

**Behance/Dribbble:**
- Search "tactical shooter UI" — glassmorphism, minimal HUD
- "Valorant UI" — читаемость, иконки
- "The Finals art" — stylized realism, destruction

**Sketchfab:**
- "CS2 weapon" — бесплатные референсы для блокаута
- "Tactical character" — риггинг

**Poly Haven:**
- HDRI для освещения, текстуры бетона, металла

**YouTube Tutorials:**
- Blender Guru — PBR texturing
- Grant Abbitt — low poly to high poly
- CG Cookie — weapon modeling
- FlippedNormals — AK-47 in Blender [search result 3]

**Open Source Assets:**
- Freesound.org — выстрелы, шаги
- OpenGameArt — временные иконки
- Mixamo — базовые риги для прототипа

---

## 5. Пайплайн Blender → UE5

1. **Blockout:** Cube → пропорции (Blender, 1 unit = 1m)
2. **High Poly:** Subdivision + bevel + boolean (HardOps addon)
3. **Low Poly:** Retopo (Retopoflow addon) или decimate
4. **UV:** TexTools addon, 0-1, pack with 4px padding for 2k
5. **Bake:** High→Low normal, AO, curvature (in Blender or Marmoset)
6. **Texture:** Substance Painter (или Blender nodes) — PBR
7. **Rig:** Rigify для персонажей, simple bones для оружия
8. **Export:** FBX, Apply transforms, Smoothing: Face, Tangent
9. **Import UE5:** FBX Import, generate LODs, collision (UCX_ prefix)
10. **Material:** Master material M_WeaponMaster, instance per skin

---

## 6. Рендеры для UI

- **Turntable:** 360° рендер оружия, 60 кадров, 1024x1024, прозрачный фон, для магазина
- **Icon render:** Ортографическая камера, 45°, HDRI studio, для инвентаря
- **Case preview:** Кейс открывается, свет изнутри, частицы (в Blender или в UE5 Niagara)

Все рендеры — в /blender/exports/ и /public/ui/
