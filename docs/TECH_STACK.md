# KS3 — Технический стек и обоснование

## Выбор движка: Unreal Engine 5.3+

### Почему не Unity, не Godot?

**Критерии выбора для тактического шутера 5×5:**

| Критерий | UE5 | Unity | Godot 4 |
|---|---|---|---|
| 128-tick networking | ✅ Replication Graph, Server Rewind из коробки | ❌ Нужно писать самому (Netcode for GameObjects слабый) | ❌ Ограничен |
| Графика (Lumen, Nanite) | ✅ AAA уровень, как в CS2 Source2 | ⚠️ HDRP хорош, но менее оптимизирован | ❌ Не дотягивает |
| Античит интеграция | ✅ EAC SDK, BattlEye | ✅ | ❌ Сложно |
| Маркетплейс ассетов | ✅ Quixel, Fab | ✅ | ❌ |
| Консоли | ✅ PS5/Xbox из коробки | ✅ | ❌ Нет |
| Команда 1 человек | ⚠️ Сложнее, но Blueprints ускоряют | ✅ Легче | ✅ Самый легкий |
| Производительность FPS | ✅ Лучшая для шутеров | ⚠️ GC spikes | ❌ |

**Итог:** UE5 — единственный вариант для конкурента CS2/Valorant. Godot подходит для прототипа, но не для релиза. Unity после Runtime Fee — рискован.

**Версия:** UE5.3.2 (стабильная, Lumen улучшен, нет багов 5.4 с Nanite foliage)

### Языки и архитектура

- **Gameplay:** C++ (80%) + Blueprints (20% для быстрого прототипа UI, анимаций)
- **UI:** UMG + Common UI + MVVM. Для веб-прототипа — TypeScript + React (как в этом репо)
- **Shaders:** HLSL + Material Graph
- **Бэкенд:** 
  - **API:** Node.js + Fastify + TypeScript, или Go (для маркетплейса — высокая нагрузка)
  - **БД:** PostgreSQL (юзеры, инвентарь), Redis (матчмейкинг очереди, сессии), S3 (скины, демки)
  - **Auth:** Steam OAuth + собственный JWT
- **Сетевой код:**
  - Client-Server authoritative
  - **Tickrate:** 128 Hz server, 128 Hz client, 20 Hz для неважных акторов (Replication Graph)
  - **Lag Compensation:** Server Rewind (как в UE5 Lyra) — храним 1 сек истории хитбоксов, перематываем при выстреле
  - **Anti-cheat:** EAC + серверная валидация: скорость, патроны, экономика
  - **Voice:** Vivox или Steam Voice

### Структура проекта UE5 (для будущего)

```
/KS3
  /Content
    /Weapons/Data/DA_AK_R (Data Asset)
    /Maps/de_dustline
    /Characters/Spectrum/Meshes
    /UI/WBP_MainMenu
  /Source
    /KS3Core (C++: KS3Character, KS3Weapon, KS3GameMode)
    /KS3Online (Matchmaking, AntiCheat)
  /Plugins
    /Marketplace (свой плагин для трейдов)
```

### Веб-прототип (текущий репозиторий)

Для быстрой демонстрации в Arena (без UE5) делаем веб-версию на:

- **Vite + TypeScript + Three.js** — 3D фон главного меню
- **No framework** или легкий Preact для UI — чтобы быстро грузилось в preview
- **State:** Zustand-подобный store на vanilla
- **Стили:** CSS Modules + Tailwind-like utility, glassmorphism

Почему веб: Arena preview работает только с портами, UE5 не запустить. Веб-прототип покажет всю логику меню, кейсов, инвентаря, HUD.

### Бэкенд для кейсов и маркетплейса

**API Design:**

```
POST /api/cases/open { caseId, userId } -> { item, rarity, transactionId }
GET /api/inventory/:userId -> items[]
POST /api/market/list { itemId, price } -> listingId
POST /api/market/buy { listingId } -> escrow
```

**Защита от фрода:**
- Все шансы дропа — на сервере, клиент только анимация
- Pity system: сервер хранит счетчик неудач
- Трейды: 2FA, 7 дней холд для новых девайсов, blockchain-лог (Postgres + hash chain, не крипта, а аудит)
- Rate limit: 10 открытий/мин

**CI/CD:**
- GitHub Actions: lint, test, build UE5 (self-hosted runner с GPU), build web
- CD: SteamPipe для игры, Vercel для веба
- Автотесты: Gauntlet для UE5 (стрельба ботов), Playwright для веба

### Производительность цели

- **PC Min:** GTX 1060, 60 FPS @ 1080p Low
- **PC Recommended:** RTX 3060, 144 FPS @ 1080p High, 240 FPS @ 1080p Low (для киберспорта)
- **Настройки:** DLSS/FSR, Reflex, Lumen on/off
- **Сеть:** <50ms пинг, <1% packet loss, 128-tick

### Риски и митигация

- **UE5 сложный для соло:** Использовать Lyra Starter Game как базу (Epic дает бесплатно тактический шутер шаблон)
- **Читы:** На старте EAC, позже свой ML
- **Контент:** Procedural weapons в Blender (Geometry Nodes) для быстрого создания скинов

---

### Ссылки

- UE5 Networking docs: https://dev.epicgames.com/documentation/en-us/unreal-engine/networking-overview-for-unreal-engine
- Multiplayer Compendium: https://cedric-neukirchen.net/docs/category/multiplayer-network-compendium/ [search result 4]
- UE5 FPS tutorial: https://www.udemy.com/course/unreal-engine-5-cpp-multiplayer-shooter/ [search result 2]
