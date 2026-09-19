# KS3 — Tactical Shooter 5×5

**Духовный наследник Counter-Strike 2 на Unreal Engine 5 + веб-прототип**

> 🎯 **Статус:** MVP веб-прототип готов • UE5 в разработке • Документация полная

## 🚀 Быстрый старт (веб-прототип)

```bash
npm install
npm run dev
# Открой http://localhost:5173 — LIVE PREVIEW в Arena: https://5173-xxxx.e2b.app
```

Веб-прототип включает:
- ✅ Главное меню с анимированным 3D фоном (Three.js)
- ✅ Навигация: Играть, Инвентарь, Кейсы, Магазин, Профиль, Друзья, Настройки, Обучение
- ✅ Матчмейкинг: режимы, карты, регионы, таймер поиска
- ✅ HUD: HP, броня, патроны, деньги, радар, киллфид, таймер, специализации, погода
- ✅ Инвентарь: сетка скинов, фильтры, крафт, статистика
- ✅ Кейсы: 5 видов, рулетка с замедлением, редкости, pity, provably fair
- ✅ Магазин, профиль с ИИ-тренером, настройки графики/звука/прицела
- ✅ После матча: статистика, MVP, XP, дроп

## 📚 Документация

| Документ | Описание |
|---|---|
| [GDD.md](docs/GDD.md) | Полный дизайн-документ: геймплей, механики, карты, оружие, экономика |
| [TECH_STACK.md](docs/TECH_STACK.md) | Почему UE5, сеть 128-tick, бэкенд, CI/CD |
| [CASE_SYSTEM.md](docs/CASE_SYSTEM.md) | Кейсы, редкости, шансы, pity, маркетплейс, крафт |
| [ART_DIRECTION.md](docs/ART_DIRECTION.md) | Художественный стиль, палитра, 2D/3D ассеты, промпты |
| [BLENDER_PIPELINE.md](docs/BLENDER_PIPELINE.md) | Пошаговый пайплайн моделирования оружия, персонажей, карт |
| [SOUND_DESIGN.md](docs/SOUND_DESIGN.md) | Звуки выстрелов, шагов, войс, музыка |
| [REFERENCES.md](docs/REFERENCES.md) | Референсы ArtStation, Behance, туториалы, open-source |
| [ROADMAP.md](docs/ROADMAP.md) | Roadmap MVP→Alpha→Beta→Release, приоритеты P0/P1/P2, риски |

## 🎮 Уникальные фичи KS3 vs CS2

1. **🌧️ Динамическая погода** — дождь глушит шаги -10%, ветер сносит смоки 2м, туман 30м видимость
2. **🧱 Разрушаемые укрытия** — 12 точек на карте, 80HP, респавн каждый раунд
3. **🎭 Специализации** — 4 роли (Breacher, Scout, Anchor, Support) с пассивными бонусами, без ультов
4. **🌀 Morph Zones** — геометрия карты меняется каждый раунд (3 варианта на зону)
5. **👁️ Echo Replay** — при смерти видишь 3 сек глазами убийцы + траектория пуль
6. **🤖 ИИ-тренер Spectr** — анализирует демки локально, дает советы, создает тренировки

## 🗺️ Карты

- **de_dustline** — нефтяная станция, песчаная буря, духовный наследник Dust2
- **de_neon** — киберпанк Токио, дождь, неон, вертикаль
- **cs_ark** — контейнеровоз, шторм, заложники

## 🔧 Техстек

- **Движок:** Unreal Engine 5.3+ (Lyra Starter Game как база) — обоснование в TECH_STACK.md
- **Веб-прототип:** Vite + TypeScript + Three.js (этот репозиторий)
- **Бэкенд:** Node.js/Fastify + PostgreSQL + Redis + S3
- **Сеть:** 128-tick, Server Rewind, Replication Graph, EAC + ML античит
- **3D:** Blender 4.1+, Node Wrangler, TexTools, Rigify, Substance Painter

## 📦 Структура проекта

```
/docs/ — вся документация
/src/ — веб-прототип
  /core/ — типы, данные, store
  /systems/ — кейсы, экономика
  /engine/ — Three.js фон
  /screens/ — UI экраны
  /ui/ — компоненты
/blender/ — пайплайн 3D
  /models/weapons/ — AK-R, M4, AWP...
  /models/characters/ — SPECTRUM, FRACTURE
  /maps/ — de_dustline, de_neon, cs_ark
  /exports/ — FBX/glTF для UE5
/assets/2d/ — иконки, скины, кейсы
/public/ — текстуры, модели, звуки
```

## 🎨 Арт

- Стиль: Stylized Realism 70/30 (The Finals + CS2 + Valorant)
- Палитра: десатурированная база + неон команды #00D9FF / #FF4D00
- Материалы: PBR 3 слоя для скинов
- Референсы: ArtStation CS2 high poly [1-5], Behance tactical UI

## 📈 Roadmap

- **MVP (8 недель):** 1 карта blockout, 3 оружия, стрельба, бомба, 128-tick, главное меню
- **Alpha (12 недель):** 3 карты art, 10 оружий, погода, разрушаемость, ранги, кейсы бэкенд
- **Beta (16 недель):** Все режимы, маркетплейс, оптимизация 240 FPS, консоли
- **Release (8 недель):** Полиш, античит ML, Season 1

Подробно в ROADMAP.md

## 🛠️ Blender — быстрый старт

1. Скачай Blender 4.1+ с blender.org
2. Включи аддоны: Node Wrangler, Bool Tool, LoopTools, TexTools, Rigify
3. Папки: /blender/models/weapons/AK_R/ — см. BLENDER_PIPELINE.md
4. Пайплайн: Blockout → High Poly → Low Poly → UV → Bake → Substance → Rig → Export FBX

## 🎁 Кейсы

- 5 видов: Recruit (free), Spectrum, Fracture, Season, Workshop
- Редкости: Common 50%, Uncommon 25%, Rare 12%, Mythic 7%, Legendary 4.5%, Immortal 1.5%
- Pity: после 30 без Immortal — гарант 10%
- Provably Fair: SHA256(serverSeed+clientSeed)
- Маркетплейс с escrow, 2FA, ML анти-скам

См. CASE_SYSTEM.md и живой прототип в /cases

## 🔊 Звук

- Wwise, HRTF, occlusion, reverb zones
- 265 файлов MVP: выстрелы (4 слоя), шаги (6 материалов), гранаты, войс, UI, музыка

## 📄 Лицензия

MIT — для веб-прототипа. UE5 проект — проприетарный, ассеты CC0 для прототипа.

---

**Сделано в Arena.ai • 1 агент = продакшн-команда • 2026**

> "KS3 — это CS2, если бы его делали в 2026 с нуля на UE5, с честными кейсами и ИИ-тренером."

### Скриншоты архитектуры (ASCII)

```
Главное меню:
┌──────────────┬─────────────────────────────┐
│ K3 KS3       │ Hero: 3D ангар, неон, Lumen │
│ ▶ Играть     │ [Играть 5×5] [Обучение]     │
│ 🎮 Матчмейк  │ Что нового: погода, разруш  │
│ 🎒 Инвентарь │ Карты: dustline, neon, ark  │
│ 📦 Кейсы     │ Быстрый матч + специализац  │
│ 🛒 Магазин   │ ИИ-тренер Spectr            │
│ 👤 Профиль   │                             │
└──────────────┴─────────────────────────────┘

HUD:
┌─Radar─┐  Timer 13  Score 7:5  Killfeed
│ ●     │  01:42  SPECTRUM vs FRACTURE
└───────┘
        Crosshair • • •
HP 100 Armor 100   Ammo 30/90   Money $4200

Кейс рулетка:
┌─────────────────────────────────────┐
│ Открытие Spectrum Case • Pity 12    │
│ ────►|◄──── лента 50 итемов         │
│ [Common][Rare][Mythic][Immortal★]   │
│ Результат: AK-R | Neon Rider Mythic │
│ [Забрать] [Продать] [Еще]           │
└─────────────────────────────────────┘
```
