# KS3 — Sound Design

## 1. Философия звука

- **Читаемость > Реализм:** Как в CS2 — каждый звук информирует
- **3D позиционирование:** HRTF, occlusion, reverb zones
- **Динамический микс:** При стрельбе — дакинг шагов, при флешке — low-pass

## 2. Категории

### Оружие

| Звук | Слоев | Особенности |
|---|---|---|
| Shoot | 4 (close, distant, tail, mechanical) | Каждый выстрел — рандом из 3 вариаций, pitch ±5% |
| Reload | 3 (mag out, mag in, bolt) | Foley, слышно на 10м |
| Dry fire | 1 | Клик |
| Inspect | 2 | Металл, ткань |
| Silencer | Отдельный set, тише, нет tail |

- **Дистанция:** Close 0-20m, Distant 20-100m, Far >100m (только tail)
- **Occlusion:** За стеной — low-pass 800Hz, -10dB
- **Reference:** CS2, Valorant, R6 Siege — чистые, без реверба в close

### Шаги

- **Материалы:** Concrete, Metal, Wood, Sand, Water, Ladder — по 5 вариаций каждый
- **Скорость:** Walk (тихо, 60% громкости), Run (100%), Crouch (30%), Shift-walk (10% — только для Scout)
- **Вертикаль:** Звук сверху/снизу отличается (EQ)
- **Динамическая погода:** Rain +10dB mask, шаги тише

### Гранаты

- Flash: pin + throw + bounce + explosion (high freq)
- Smoke: шипение 18 сек, pop
- Molotov: break + fire loop (3D)
- HE: explosion с 3 слоями (close, distant, debris)
- Echo: sci-fi pulse

### Персонажи

- **Радиокоманды:** Как в CS2 — 20 команд, голос SPECTRUM британский, FRACTURE — восточноевропейский, 2 варианта пола
- **Дыхание:** При low HP — тяжелое
- **Death:** 3 варианта + ragdoll thud
- **Callouts:** Авто-коллаут при пинге (A, B, Mid)

### UI

- **Menu:** Hover — soft tick, Click — mechanical clack, Open case — tick-tick-tick + reveal по редкости
- **HUD:** Kill — hitmarker (headshot — высокий питч), Money — coin, Timer — tick в последние 10 сек
- **Music:** Главное меню — lo-fi tactical ambient (80 BPM, minor), лобби — напряженный drone, MVP — триумфальный stinger

## 3. Техника

- **Engine:** Wwise или FMOD (для UE5 — Wwise лучше, для прототипа — Web Audio API)
- **Форматы:** WAV 48kHz 16-bit, OGG Vorbis для релиза, сжатие
- **Attenuation:** Logarithmic, 0-50m для шагов, 0-1000m для AWP
- **Reverb Zones:** Внутри — small room, улица — none, туннель — large
- **Mix:** Master, SFX, Voice, Music, UI — отдельные шины, ducking

## 4. Список ассетов (MVP)

- Weapons: 10 guns x 5 sounds = 50
- Steps: 6 materials x 5 variations x 3 speeds = 90
- Grenades: 5 x 4 = 20
- Voice: 20 radio x 2 factions x 2 genders = 80
- UI: 20
- Music: 5 tracks (menu, lobby, tension, victory, defeat)
- Total: ~265 файлов

## 5. Open Source референсы

- Freesound.org: search "gunshot", "footstep concrete"
- Soniss GDC packs (free)
- Mixamo? No, for sound — BBC Sound Effects (free for non-commercial)

## 6. Реализация в веб-прототипе

- Web Audio API, Howler.js
- Preload, sprite для выстрелов
- Positional audio с Three.js AudioListener

