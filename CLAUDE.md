<!-- SPECTRA:START v1.0.1 -->

# Spectra Instructions

This project uses Spectra for Spec-Driven Development(SDD). Specs live in `openspec/specs/`, change proposals in `openspec/changes/`.

## Use `/spectra:*` skills when:

- A discussion needs structure before coding → `/spectra:discuss`
- User wants to plan, propose, or design a change → `/spectra:propose`
- Tasks are ready to implement → `/spectra:apply`
- There's an in-progress change to continue → `/spectra:ingest`
- User asks about specs or how something works → `/spectra:ask`
- Implementation is done → `/spectra:archive`

## Workflow

discuss? → propose → apply ⇄ ingest → archive

- `discuss` is optional — skip if requirements are clear
- Requirements change mid-work? Plan mode → `ingest` → resume `apply`

## Parked Changes

Changes can be parked（暫存）— temporarily moved out of `openspec/changes/`. Parked changes won't appear in `spectra list` but can be found with `spectra list --parked`. To restore: `spectra unpark <name>`. The `/spectra:apply` and `/spectra:ingest` skills handle parked changes automatically.

<!-- SPECTRA:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrewMaster Pro — a smart coffee machine companion app by AlphaCore. IoT/smart home appliance control for an espresso machine.

## Development Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS simulator
npm run web        # Run web version
```

No test runner or linter is currently configured.

## Tech Stack

- **Expo 54** + React Native 0.81.5 (New Architecture enabled)
- **React 19** with TypeScript 5.9 (strict mode)
- **Expo Router 6** — file-based routing under `app/`
- **NativeWind 4.2** + TailwindCSS 3.4 for styling
- **Zustand 5** for state management (scaffolded, not yet in use)
- **React Native Reanimated 4** + Gesture Handler 2 for animations/interactions
- **Lucide React Native** for icons (strokeWidth 1.5)
- **Fonts:** Cormorant Garamond (display/serif), Inter (body/sans-serif)

## Architecture

### Routing

File-based routing via Expo Router. Tab screens live in `app/(tabs)/`, modals at root level, dynamic routes like `app/drink/[id].tsx`.

### Path Aliases (tsconfig)

```
@/*            → ./src/*
@/components/* → ./components/*  (note: top-level components/ dir)
@/constants/*  → ./src/constants/*
@/utils/*      → ./src/utils/*
@/stores/*     → ./src/stores/*
@/hooks/*      → ./src/hooks/*
```

### Key Directories

- `app/` — Expo Router screens and layouts
- `app/(tabs)/` — Tab screens: Home, Drinks, Recipes, Stats, Settings
- `src/types/` — Centralized TypeScript interfaces
- `src/constants/` — Design tokens (`theme.ts`) and preset data (`drinks.ts`)
- `src/utils/cn.ts` — `cn()` helper (clsx + tailwind-merge)
- `components/` — Shared components (top-level, not under src/)

### Design Files

- `DESIGN-PROMPT.md` — Comprehensive design specification with screen blueprints and measurements
- `PRD.md` — Product requirements document
- `coffee-app-pencil.pen` — Pencil design file (access via Pencil MCP tools only, NOT Read/Grep)
- `openspec/config.yaml` — OpenSpec workflow configuration

## Code Conventions

- **Types:** Use interfaces with readonly fields. Union types instead of enums (e.g., `"espresso" | "milk" | "specialty"`). All types centralized in `src/types/`.
- **Styling:** NativeWind className utilities with design token names: `bg-bg-primary`, `text-text-secondary`, `border-border`. Use `cn()` from `@/utils/cn` for conditional classes.
- **Screen pattern:** `SafeAreaView` + `ScrollView` wrapper with `className="flex-1 bg-bg-primary"`.
- **Animations:** Reanimated 4 (withTiming, withSpring, etc.) and Animated.* entering/exiting props.
- **Commit messages:** Traditional Chinese (繁體中文) with conventional commit prefixes (e.g., `feat(scope): 描述`).

## Design System (Dark Luxury Theme)

| Token | Value |
|-------|-------|
| bg-primary | `#1A1A1C` |
| bg-card | `#242426` |
| Gold accent | `#C9A962` |
| Text primary | `#F5F5F0` |
| Text secondary | `#6E6E70` |
| Card radius | 20px |
| Content padding | 28px horizontal |
| Section gap | 40px |

Full tokens in `src/constants/theme.ts` and `tailwind.config.ts`.

## Artifact Consistency Rules

本專案有三個核心產物必須保持一致：

| 產物 | 角色 | 檔案 |
|------|------|------|
| **PRD** | 功能定義與資料模型（單一真相來源） | `PRD.md` |
| **設計稿** | 視覺設計與佈局規格 | `DESIGN-PROMPT.md` + `coffee-app-pencil.pen` |
| **程式碼** | 實作 | `app/`、`components/`、`src/` |

### 修改程式碼時

- **涉及 UI 變更**：確認 Pencil 設計稿中有對應的設計，若無則提醒使用者先更新設計
- **涉及新頁面或元件**：確認 PRD 和設計稿都有定義該頁面/元件
- **涉及 Design Token**（顏色、間距、圓角、字型）：同步檢查以下四處是否一致
  - `PRD.md`（Design System 章節）
  - `DESIGN-PROMPT.md`（Style Guide Speed Lookup）
  - `tailwind.config.ts`（runtime tokens）
  - `coffee-app-pencil.pen`（設計時變數，透過 Pencil MCP 存取）
- **涉及資料模型變更**：確認 `src/types/` 的 TypeScript 型別與 PRD 定義的資料模型一致

### 修改 PRD 時

- 提醒使用者同步更新 `DESIGN-PROMPT.md` 和 Pencil 設計稿
- 若涉及資料模型變更，提醒同步更新 `src/types/`

### 修改設計稿時

- 提醒使用者同步更新對應的程式碼實作
- 若涉及新增 Design Token，提醒同步更新 `tailwind.config.ts`

### 一致性檢查工具

- `/design-compare` — 比對 Pencil 設計稿與實際頁面的結構化屬性差異
- `/consistency-check` — 全面審計 PRD ↔ 設計稿 ↔ 程式碼的四項一致性
- OpenSpec 流程（`/opsx:propose`、`/opsx:apply`、`/opsx:archive`）內建一致性檢查步驟
