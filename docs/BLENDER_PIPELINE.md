# KS3 — Blender Production Pipeline

## 1. Установка и настройка

### Скачать Blender
- **Версия:** 4.1+ LTS (стабильная, Geometry Nodes, EEVEE Next)
- **Сайт:** https://www.blender.org/download/
- **Путь:** /blender/ в репо — portable версия или инструкция

### Обязательные аддоны (включить в Preferences → Add-ons)

| Аддон | Зачем | Где взять |
|---|---|---|
| **Node Wrangler** | Быстрые ноды материалов (Ctrl+T) | Встроен |
| **Bool Tool** | Boolean для hard surface | Встроен |
| **LoopTools** | Loop, relax для ретопо | Встроен |
| **BlenderKit** | Бесплатные модели, материалы, HDRIs | blenderkit.com, встроен |
| **TexTools** | UV checker, texel density, bake | https://github.com/SavMartin/TexTools-Blender |
| **Auto-Rig Pro** | Ригинг персонажей | https://www.lucky3d.fr/auto-rig-pro/ ($40) или Rigify (бесплатно) |
| **Hard Ops / BoxCutter** | Hard surface моделинг оружия | https://hardops-manual.readthedocs.io/ (платный, но есть free) |
| **Retopoflow** | Ретопология | https://www.retopoflow.com/ |
| **Rigify** | Бесплатный риг | Встроен |

### Настройка проекта

```
/blender/
  /models/weapons/AK_R/
    AK_R_high.blend
    AK_R_low.blend
    AK_R_bake.blend
  /models/characters/Spectrum/
  /textures/ (substance exports, baked)
  /rigs/
  /animations/
  /maps/de_dustline/
    de_dustline_blockout.blend
    de_dustline_art.blend
  /exports/FBX/
  /exports/GLTF/
  README.md (этот файл)
```

- **Units:** Metric, Unit Scale 0.01 (1 unit = 1 cm для UE5), или 1.0 = 1m для удобства, но при экспорте scale 100
- **Color Management:** Filmic, Look Medium High Contrast
- **Render:** Cycles для бейка, EEVEE для превью

---

## 2. Моделинг оружия — пошагово (на примере AK-R)

### Шаг 1: Референсы
- Собрать 10+ фото AK-47: side, top, front, details
- Импорт в Blender: Add → Image → Reference, выставить в ортографию Front/Side
- PureRef — собрать доску референсов

### Шаг 2: Blockout (Low Poly Proxy)
- Cube → пропорции: длина 88cm, высота 20cm
- Отдельные меши: receiver, barrel, handguard, magazine, stock, grip
- Модификаторы Mirror где симметрия
- Цель: <2k tris, проверить силуэт

### Шаг 3: High Poly
- Для каждой детали:
  - Bevel (3 segments, 0.02m) для фасок
  - Subdivision Surface (2 levels) для органики
  - Boolean для отверстий, вырезов (Bool Tool)
  - HardOps для вставок, chamfer
- Добавить мелкие детали: винты, заклепки, серийные номера (Decal Machine или моделинг)
- Итог: 500k-2M tris, без ngons, все quads

### Шаг 4: Low Poly (Game Ready)
- **Retopo:** 
  - Для hard surface — вручную: snap to high poly, low poly с поддержкой bevel (2 loops для hard edge)
  - Использовать Retopoflow или просто duplicate high → decimate → ручная чистка
- **Оптимизация:** 
  - AK-R low: 12k tris
  - Удалить невидимые полигоны (внутри)
  - Швы там где hard edge (mark sharp + edge split)
- **UV:** 
  - TexTools: UV → Rectify, Align
  - Развертка: seams по hard edges, hidden areas
  - Pack: 2k texture, 4px padding, texel density 10.24 px/cm (для 2k на 1m)
  - Overlapping для симметричных деталей (mirror)
  - 2nd UV для lightmap (UE5 требует, но можно auto generate)

### Шаг 5: Bake
- В Blender или Marmoset Toolbag:
  - High → Low: Normal (tangent space), AO, Curvature, Position, Thickness
  - Cage: 0.02m extrusion
  - Разрешение 2k, 8x AA, 16 samples
- Проверить normal map на артефакты (сглаживание)

### Шаг 6: Текстурирование
- **В Substance Painter (рекомендуется):**
  - Import low FBX + bake maps
  - PBR: Base Color, Roughness, Metallic, Normal, Height
  - Слои: 
    1. Base metal (steel, polymer)
    2. Skin overlay (если скин — отдельный слой с mask)
    3. Wear: edge wear (curvature), scratches, dust (AO), fingerprints
    4. Decals: лого, серийник
  - Экспорт: Unreal Engine 5 packed (Roughness in G, Metallic in B, AO in R)
- **В Blender (бесплатно):**
  - Shader nodes: Principled BSDF, image textures
  - Procedural wear: Pointiness + ColorRamp

### Шаг 7: Rig & Export
- Оружие: Armature с 1 bone (root) + 2 bones (magazine, bolt) для анимации
- Weight paint: все вертексы к root, magazine к mag bone
- Экспорт FBX:
  - Apply Transform, Smoothing: Face, Tangent Space, Only Deform Bones
  - Scale: 1.0 (если в Blender 1 unit = 1 cm, то 1.0)
  - Path Mode: Copy, Embed Textures

---

## 3. Персонажи

### Base Mesh
- Сделать или взять CC0 base (Human Generator addon, или MakeHuman)
- 25k tris, quads, loop для деформации (колени, локти)

### Sculpt (опционально)
- Multires → sculpt wrinkles, muscles
- Bake normal с high to low

### Rigging
- **Rigify:** 
  - Add → Armature → Human (Meta-Rig)
  - Подогнать кости под меш, Generate Rig
  - Weight Paint auto + ручная правка (особенно плечи, бедра)
- **Auto-Rig Pro:** Быстрее, лучше для игр, есть game export

### Skin Variations
- 1 base mesh, 2 материала (body, gear)
- Скины — смена текстур, не меша (для хитбокса)
- Отдельные меши для шлема, бронежилета (можно скрывать)

### Viewmodel Hands
- Отдельный меш только руки + оружие
- Rig: 30 bones per hand, IK для пальцев
- Анимации: см. ниже

---

## 4. Анимации

### Список (для оружия и персонажа)

**Viewmodel (1st person):**
- idle_1, idle_2, idle_3 (вариации, 5 сек каждая)
- walk, run, sprint (сway)
- draw, holster
- shoot_1, shoot_2, shoot_3 (recoil variations)
- reload_empty, reload_half
- inspect_1, inspect_2 (крутилка)
- melee (нож)
- plant, defuse (для C4)

**3rd person:**
- idle, walk (4 dir), run, crouch_idle, crouch_walk
- jump_start, jump_loop, jump_end
- death_1..5 (ragdoll + anim)
- hit_reaction (flinch)
- plant, defuse, reload (для наблюдателей)

### Создание в Blender
- 60 FPS, 30 FPS для экспорта (UE5)
- Dope Sheet → Action Editor, NLA для слоев
- Root motion: для 3rd person — перемещение root bone, для viewmodel — нет
- Экспорт: FBX, Bake Animation, NLA Strips, All Actions

### Ретаргет в UE5
- IK Rig + IK Retargeter для разных скелетов

---

## 5. Карты — de_dustline пример

### Этап 1: Blockout
- Новый файл, units 1m
- BSP: Cube → размеры: Long 40m, Mid 20m, A site 15x15m
- Тест: поставить 2 капсулы (игрока), проверить тайминги: T spawn → Long A = 12 сек, CT spawn → A = 8 сек
- Choke points: 2 входа на плент минимум, 1 main + 1 flank
- Высота: потолки 4m, укрытия 1.5m (можно присесть), 1m (половина)
- Экспорт в UE5 как FBX для грейбокс теста (или сразу в UE5 с BSP)

### Этап 2: Modular Kit
- Создать kit: wall_4x4, wall_2x4, floor_4x4, trim, pillar, stairs
- Trim sheet: 1 текстура 2k с 4-5 материалами (бетон, металл, краска)
- Моделинг: low poly, bevel, UV с trim
- Экспорт в UE5, собрать level с instances (HISM)

### Этап 3: Art Pass
- Пропсы: ящики, бочки, машины — отдельные меши, LODs
- Разрушаемые: отдельный меш с fractured (Cell Fracture addon)
- Lighting: в UE5, не в Blender (Lumen)
- Decals: грязь, трещины — в UE5 decal actor

### Этап 4: Оптимизация
- LODs: LOD0 100%, LOD1 50%, LOD2 25%, LOD3 10% (Decimate)
- Collision: UCX_ prefix, convex hull, simple box для ящиков
- Lightmap UV: 2nd channel, pack
- HLOD в UE5

### Этап 5: Skybox & Fog
- Skybox: HDRI + volumetric clouds (в UE5)
- Fog: ExponentialHeightFog + Volumetric Fog

---

## 6. Рендеры и превью

### Для UI (скины, оружие)
- **Сцена:** Studio HDRI (Poly Haven), 3 point light, backdrop
- **Камера:** Ortho, 45°, focal 50mm, оружие по центру
- **Настройки:** Cycles, 256 samples, transparent film, 1024x1024
- **Пост:** Compositor → Glare, Color Balance
- **Turntable:** Анимация 360° за 120 кадров, 24 FPS, рендер в PNG sequence, собрать в MP4/WebM

### Для магазина (кейсы)
- Кейс на столе, volumetric light изнутри, частицы (particle system)
- 2 камеры: closeup + wide

---

## 7. Экспорт чеклист

- [ ] Apply All Transforms (Ctrl+A)
- [ ] Check Normals (Shift+N)
- [ ] No N-gons (Triangulate for export)
- [ ] UVs in 0-1, no overlap except mirrored
- [ ] 2nd UV for lightmap (if needed)
- [ ] LODs named _LOD0, _LOD1
- [ ] Collision UCX_*
- [ ] Scale correct (1m = 100 units in UE5)
- [ ] FBX version 7.4, Smoothing Groups on
- [ ] Test import in UE5, check materials, scale, pivot

---

## 8. Папки и нейминг

- **Нейминг:** `W_AK_R`, `SK_Spectrum_Body`, `SM_Dustline_Wall_4x4`, `A_Walk_Fwd`
- **Текстуры:** `T_AK_R_Albedo`, `T_AK_R_Normal`, `T_AK_R_ORM` (Occlusion Roughness Metallic packed)
- **Материалы:** `M_WeaponMaster`, `MI_AK_R_Default`

---

*Этот пайплайн покрывает MVP: 5 оружия, 2 персонажа, 1 карта. На 1 человека — 2-3 месяца фултайм.*
