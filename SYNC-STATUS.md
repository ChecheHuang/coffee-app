# Sync Status

> Init: 2026-04-19 | Last update: 2026-04-19 (apply add-schedule-edit 全完成：PRD §5.10.2 + Pencil stB82 + edit.tsx + _layout + index 移除 Alert)

## Pages

| Item | PRD | Pencil | Code | 最後驗證 | 錨點 | 備註 |
|------|-----|--------|------|----------|------|------|
| Home | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.1](PRD.md) | n8paz / app/(tabs)/index.tsx |
| Drinks | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.2](PRD.md) | tqxm1 / hvmWi / app/(tabs)/drinks.tsx（含 search 子狀態）|
| drink/[id] | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.3](PRD.md) | k3cwl / app/drink/[id].tsx（保存按鈕已接 recipe/edit）|
| Brew Progress | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.4](PRD.md) | YzpCG / app/brew-progress.tsx |
| Recipes | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.5](PRD.md) | EXtUo / app/(tabs)/recipes.tsx |
| Stats | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.6](PRD.md) | eXyCa / app/(tabs)/stats.tsx |
| Achievements | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.7](PRD.md) | hFXph / app/achievements.tsx |
| Settings | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.8](PRD.md) | app/(tabs)/settings.tsx 家庭成員管理列 → /family |
| Profile | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.13](PRD.md) | 82q1j / app/profile.tsx |
| Family Members | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.14](PRD.md) | IUr5z/LrpQy / app/family/index.tsx + edit.tsx |
| Onboarding | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.9](PRD.md) | Code 已拆 4 檔對齊 Pencil 7cvXQ/hCVEB/l7CVp/suJ8Y |
| Schedule | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.10](PRD.md) | app/schedule/index.tsx；card 點擊已接 /schedule/edit |
| Schedule/New | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.10.1](PRD.md) | Pencil 4QddG；app/schedule/new.tsx；_layout modal presentation |
| Schedule/Edit | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.10.2](PRD.md) | Pencil stB82；app/schedule/edit.tsx；預填 + updateSchedule + removeSchedule |
| recipe/[id] | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.11](PRD.md) | PRD §5.11 已補 Recipe Detail 規格 |
| Recipe Edit | ✓ | ✓ | ✓ | 2026-04-19 | [PRD §5.12](PRD.md) | PRD §5.12 已補 Recipe Edit 規格；支援 `?drinkId=` 預填模式 |

## Components

| Item | PRD | Pencil | Code | 最後驗證 | Pencil 節點 | 備註 |
|------|-----|--------|------|----------|-------------|------|
| Button/Primary | ✓ | ✓ | ✓ | 2026-04-19 | yYJZs | components/Button.tsx variant="primary" |
| Button/Secondary | ✓ | ✓ | ✓ | 2026-04-19 | 3oECs | components/Button.tsx variant="secondary" |
| Button/Ghost | ✓ | ✓ | ✓ | 2026-04-19 | K9ngK | components/Button.tsx variant="ghost" |
| Button/Brew (CTA) | ✓ | ✓ | ✓ | 2026-04-19 | 9oxw1 | components/Button.tsx variant="brew" |
| Card | ✓ | ✓ | ✓ | 2026-04-19 | 22rms | components/Card.tsx 已抽出 |
| Slider | ✓ | ✓ | ✓ | 2026-04-19 | cpvQr | Pencil reusables 已新增 cpvQr, components/Slider.tsx |
| TabBar | ✓ | ✓ | ✓ | 2026-04-19 | xVrMI | components/TabBar.tsx 已抽出 |
| Toggle | ⚠ | ✓ | ⚠ | 2026-04-19 | L6re7 / 3d4vG | PRD 缺獨立規格, Pencil 有 On/Off 兩態 |
| Pill | ⚠ | ✓ | ⚠ | 2026-04-19 | Cxr82 / c1lrg | PRD 缺獨立規格, Pencil 有 Active/Inactive |
| ProgressBar | ⚠ | ✓ | ⚠ | 2026-04-19 | fCzqT | PRD 缺獨立規格 |
| Badge | ⚠ | ✓ | ⚠ | 2026-04-19 | GCkLw | PRD 缺獨立規格 |
| Avatar | ⚠ | ✓ | ⚠ | 2026-04-19 | PHoUG / uRiO0 | PRD 缺獨立規格；Pencil 含 44 與 Large 160x160 兩變體 |
| AvatarPicker | ✓ | ✓ | ✓ | 2026-04-19 | 0rUQQ | components/AvatarPicker.tsx（Modal + 6 預設頭像 Grid） |
| MemberCard | ✓ | ✓ | ✓ | 2026-04-19 | wLpnz | components/MemberCard.tsx |
| IconButton | ⚠ | ✓ | ⚠ | 2026-04-19 | ZLuh7 | PRD 缺獨立規格 |
| SettingsRow | ⚠ | ✓ | ⚠ | 2026-04-19 | Y0c8g | PRD 缺獨立規格 |
| SectionHeader | ⚠ | ✓ | ⚠ | 2026-04-19 | l4DO6 | PRD 缺獨立規格 |

## Design Tokens

| Token | PRD | DESIGN-PROMPT | Tailwind | Pencil | 最後驗證 | 備註 |
|-------|-----|---------------|----------|--------|----------|------|
| bg-primary (#1A1A1C) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| bg-card (#242426) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| bg-expanded (#2A2A2C) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| gold (#C9A962) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| gold-deep (#8B7845) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| text-primary (#F5F5F0) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| text-secondary (#6E6E70) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| text-tertiary (#4A4A4C) | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | DESIGN-PROMPT 與 Pencil 未驗證使用 |
| border (#3A3A3C) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| border-divider (#2A2A2C) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| success (#6E9E6E) | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | DESIGN-PROMPT 與 Pencil 未驗證使用 |
| warning (#FF9800) | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | 同上 |
| error (#E53935) | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | 同上 |
| radius-card (20px) | ✓ | ✓ | ✓ | ✓ | 2026-04-19 | |
| radius-pill (34px) | ✓ | ✓ | ✓ | ⚠ | 2026-04-19 | Pencil TabBar 未驗證 cornerRadius |
| radius-sm/md/lg/xl/full | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | tailwind.config.ts 已補齊 sm/md/lg/xl/full |
| spacing-xs..2xl | ✓ | ⚠ | ✓ | ⚠ | 2026-04-19 | tailwind.config.ts 已 extend spacing (xs..2xl, content-padding, section-gap) |
| font-display (Cormorant Garamond) | ✓ | ✓ | ✓ | ⚠ | 2026-04-19 | Pencil 未驗證實際使用 |
| font-body (Inter) | ✓ | ✓ | ✓ | ⚠ | 2026-04-19 | 同上 |
