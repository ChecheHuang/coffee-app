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
