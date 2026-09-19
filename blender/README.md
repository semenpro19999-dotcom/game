# Blender Project — KS3

## Структура

```
/models/weapons/
  AK_R/
    AK_R_high.blend (500k tris, bevel, boolean)
    AK_R_low.blend (12k tris, UV, LODs)
    AK_R_bake.blend (normal, AO bake)
/models/characters/
  Spectrum/
    base.blend (25k tris, Rigify)
/maps/
  de_dustline/
    blockout.blend (BSP, тайминги)
    art.blend (modular kit)
/exports/FBX/ — для UE5
/textures/ — baked maps
```

## Чеклист экспорта в UE5

- Apply Transforms
- Check Normals
- No N-gons
- UV 0-1 + 2nd UV lightmap
- LODs _LOD0/1/2
- UCX_ collision
- FBX 7.4, Smoothing Face

См. /docs/BLENDER_PIPELINE.md
