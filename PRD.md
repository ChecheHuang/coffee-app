# BrewMaster Pro — 智能咖啡機操控 App 產品規格文件

> **版本：** v1.0
> **日期：** 2026-04-14
> **品牌：** AlphaCore
> **文件類型：** 產品需求文件 (PRD)

---

## 目錄

1. [產品概述](#1-產品概述)
2. [目標用戶與使用場景](#2-目標用戶與使用場景)
3. [功能規格](#3-功能規格)
4. [頁面架構與導航](#4-頁面架構與導航)
5. [各頁面 UI 規格](#5-各頁面-ui-規格)
6. [設計系統](#6-設計系統)
7. [互動效果與動畫規範](#7-互動效果與動畫規範)
8. [技術架構](#8-技術架構)
9. [資料模型](#9-資料模型)
10. [未來擴展規劃](#10-未來擴展規劃)

---

## 1. 產品概述

### 1.1 產品定位

BrewMaster Pro 是 AlphaCore 自有品牌義式全自動咖啡機的專屬操控 App，提供遠端沖煮控制、個人化配方管理、排程預約、設備維護、沖煮數據統計、AI 飲品推薦及成就系統等功能。

### 1.2 核心價值主張

- **便利性**：遠端操控，起床即享咖啡
- **個人化**：每位家庭成員擁有專屬配方與偏好
- **智能化**：AI 根據情境推薦最適飲品
- **趣味性**：成就系統讓每天喝咖啡成為探索之旅
- **安心感**：設備狀態即時掌握，維護提醒不遺漏

### 1.3 目標平台

| 平台 | 最低版本 |
|------|---------|
| iOS | 15.0+ |
| Android | 12 (API 31)+ |

### 1.4 連線方式

- **藍牙 BLE 5.0**：近距離直連配對
- **WiFi**：遠端操控（咖啡機需連接家用 WiFi）

---

## 2. 目標用戶與使用場景

### 2.1 用戶畫像

| 角色 | 描述 | 核心需求 |
|------|------|---------|
| 咖啡愛好者 | 追求口感，喜歡調整參數 | 細緻的沖煮參數控制、配方保存 |
| 忙碌上班族 | 時間有限，追求效率 | 排程預約、一鍵沖煮、AI 推薦 |
| 家庭用戶 | 多人共用一台機器 | 多用戶檔案、各自偏好 |
| 新手入門 | 剛開始接觸咖啡 | 引導式體驗、預設配方、成就引導 |

### 2.2 關鍵使用場景

1. **早晨起床**：鬧鐘連動排程，走到廚房時咖啡已備好
2. **午後提神**：AI 根據時段推薦拿鐵或卡布奇諾
3. **週末探索**：嘗試社群分享的新配方，解鎖品味探索徽章
4. **設備保養**：收到除垢提醒，跟著 App 引導完成清潔

---

## 3. 功能規格

### 3.1 沖煮控制（核心）

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 飲品選單 | 預設 12+ 種義式飲品（Espresso、Americano、Latte、Cappuccino、Flat White、Macchiato、Mocha、Hot Water、Hot Milk 等） | P0 |
| 一鍵沖煮 | 首頁大按鈕，沖煮上次/最愛飲品 | P0 |
| 參數調整 | 溫度（85-96°C）、濃度（5段）、杯量（25-350ml）、奶泡量（0-100%）、研磨度（5段） | P0 |
| 沖煮進度 | 即時顯示沖煮階段（研磨→預浸泡→萃取→奶泡→完成） | P0 |
| 遠端沖煮 | 透過 WiFi 遠端啟動沖煮 | P0 |
| 杯數選擇 | 單杯 / 雙杯 | P1 |

### 3.2 個人化配方

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 建立配方 | 自訂名稱、圖示、所有沖煮參數 | P0 |
| 收藏配方 | 最愛配方快速存取 | P0 |
| 配方分類 | 依飲品類型、時段、心情分類 | P1 |
| 快速微調 | 沖煮前可臨時微調參數，不影響原配方 | P1 |
| 配方匯出/匯入 | 透過 QR Code 或連結分享給朋友 | P2 |

### 3.3 排程預約

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 單次預約 | 設定指定時間自動沖煮 | P0 |
| 重複排程 | 週一至週日各自設定時間與飲品 | P0 |
| 排程管理 | 查看/編輯/刪除/暫停排程 | P0 |
| 預約提醒 | 沖煮前 5 分鐘推播提醒（請先放杯子） | P1 |
| 多用戶排程 | 每位成員各自的排程不衝突 | P1 |

### 3.4 維護與清潔

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 設備狀態總覽 | 水箱水位、咖啡豆餘量、渣盒狀態、除垢狀態 | P0 |
| 除垢提醒 | 根據使用次數/時間智能提醒 | P0 |
| 引導式清潔 | 步驟式動畫引導清潔流程 | P0 |
| 耗材更換紀錄 | 濾水器、密封圈等更換時間記錄 | P1 |
| 故障診斷 | 常見問題自助排除指南 | P2 |

### 3.5 沖煮紀錄與統計

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 沖煮歷史 | 時間軸顯示每次沖煮紀錄 | P0 |
| 用量統計 | 日/週/月沖煮杯數、咖啡因攝取估算 | P0 |
| 偏好分析 | 最常喝的飲品、偏好時段、參數趨勢 | P1 |
| 資料視覺化 | 圓餅圖、折線圖等圖表呈現 | P1 |

### 3.6 AI 飲品推薦

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 情境推薦 | 根據時間、天氣、歷史偏好推薦飲品 | P1 |
| 心情選擇 | 選擇當前心情，推薦適合的飲品與參數 | P1 |
| 每日探索 | 每天推薦一款「今日嘗鮮」配方 | P2 |
| 推薦理由 | 展示為何推薦此飲品的簡短說明 | P2 |

### 3.7 成就系統

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 咖啡等級 | 新手→愛好者→鑑賞家→大師→傳奇，依累積沖煮數升級 | P1 |
| 品味徽章 | 嘗試不同飲品/參數組合解鎖（如「奶泡達人」「黑咖啡純粹主義者」） | P1 |
| 里程碑 | 第 1 杯、第 100 杯、連續 30 天等 | P1 |
| 成就展示 | 個人檔案頁展示已獲得徽章 | P2 |

### 3.8 多用戶系統

| 功能 | 說明 | 優先級 |
|------|------|--------|
| 用戶切換 | 主畫面快速切換當前用戶 | P0 |
| 獨立檔案 | 每位用戶擁有獨立的配方、排程、統計、成就 | P0 |
| 用戶管理 | 新增/編輯/刪除家庭成員（最多 6 人） | P0 |
| 頭像與暱稱 | 自訂頭像與顯示名稱 | P1 |

---

## 4. 頁面架構與導航

### 4.1 導航結構：底部 Tab Bar（5 個 Tab）

```
┌─────────────────────────────────────┐
│              App 內容區              │
├─────────────────────────────────────┤
│  🏠 首頁  ☕ 飲品  📋 配方  📊 統計  ⚙️ 設定  │
└─────────────────────────────────────┘
```

### 4.2 頁面地圖

```
App
├── 🏠 首頁 (Home)
│   ├── 一鍵沖煮按鈕
│   ├── 用戶切換選單
│   ├── AI 推薦卡片
│   ├── 機器狀態摘要
│   ├── 排程提醒卡片
│   └── 最近沖煮紀錄
│
├── ☕ 飲品 (Drinks)
│   ├── 飲品分類列表
│   ├── 飲品詳情頁
│   │   ├── 參數調整面板
│   │   ├── 沖煮按鈕
│   │   └── 加入配方
│   └── 沖煮進度頁（Modal）
│       ├── 階段動畫
│       └── 完成互動
│
├── 📋 配方 (Recipes)
│   ├── 我的配方列表
│   ├── 收藏配方
│   ├── 新增/編輯配方頁
│   └── 配方詳情頁
│
├── 📊 統計 (Stats)
│   ├── 總覽儀表板
│   ├── 沖煮歷史時間軸
│   ├── 偏好分析圖表
│   ├── 咖啡因追蹤
│   └── 成就與徽章頁
│       ├── 等級進度
│       ├── 徽章牆
│       └── 里程碑列表
│
├── ⚙️ 設定 (Settings)
│   ├── 用戶管理
│   │   ├── 個人檔案編輯
│   │   └── 家庭成員管理
│   ├── 咖啡機管理
│   │   ├── 配對設定
│   │   ├── WiFi 設定
│   │   └── 韌體更新
│   ├── 排程管理
│   │   ├── 排程列表
│   │   └── 新增/編輯排程
│   ├── 維護中心
│   │   ├── 設備狀態詳情
│   │   ├── 引導式清潔
│   │   └── 耗材紀錄
│   ├── 通知設定
│   └── 關於 / 幫助
│
└── 全域
    ├── Onboarding 引導頁（首次開啟）
    ├── 咖啡機配對流程
    └── 推播通知
```

---

## 5. 各頁面 UI 規格

### 5.1 首頁 (Home)

```
┌─────────────────────────────────────┐
│ Status Bar                          │
├─────────────────────────────────────┤
│                                     │
│  👤 Bennett ▼        🔔  ⚙️         │
│                                     │
│  Good Morning ☀️                    │
│  來杯咖啡開始美好的一天              │
│                                     │
│       ┌─────────────────┐           │
│       │                 │           │
│       │   ☕ 一鍵沖煮    │  ← 大型圓形按鈕
│       │   上次：Latte    │    帶呼吸光暈動畫
│       │                 │           │
│       └─────────────────┘           │
│                                     │
│  ── AI 為你推薦 ──────────────────  │
│  ┌──────────┐ ┌──────────┐         │
│  │ 🌤️ 午後  │ │ 💪 提神   │  ← 水平滑動卡片
│  │ 冰拿鐵   │ │ 雙份濃縮  │         │
│  │ 適合今天  │ │ 咖啡因↑   │         │
│  └──────────┘ └──────────┘         │
│                                     │
│  ── 機器狀態 ──────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 💧 水箱 78%  🫘 咖啡豆 45%  │   │
│  │ 🗑️ 渣盒 3/12  ✨ 除垢 OK   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 最近沖煮 ──────────────────────  │
│  │ 09:15  Espresso  ★★★★☆       │
│  │ 昨天   Latte     ★★★★★       │
│                                     │
├─────────────────────────────────────┤
│  🏠    ☕    📋    📊    ⚙️          │
└─────────────────────────────────────┘
```

**關鍵元素：**
- **用戶切換**：左上角頭像+名稱，點擊展開下拉選單
- **一鍵沖煮**：頁面中央，120x120pt 圓形按鈕，帶金色呼吸光暈
- **AI 推薦**：水平滑動卡片，帶情境圖示和推薦理由
- **機器狀態**：四宮格卡片，低水量/低豆量時變為警告色
- **時段問候**：根據時間自動切換（早安/午安/晚安）

### 5.2 飲品頁 (Drinks)

```
┌─────────────────────────────────────┐
│ 飲品                         🔍     │
├─────────────────────────────────────┤
│                                     │
│ [全部] [濃縮] [牛奶] [特調] [冰飲]  │  ← 分類 Tab
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │   ☕      │  │   🥛      │        │
│  │ Espresso │  │  Latte   │  ← 2x Grid
│  │ 經典濃縮  │  │ 經典拿鐵  │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │   🤎      │  │   🧋      │        │
│  │Cappuccino│  │Flat White│        │
│  │ 卡布奇諾  │  │ 澳白咖啡  │        │
│  └──────────┘  └──────────┘        │
│  ...                                │
│                                     │
├─────────────────────────────────────┤
│  🏠    ☕    📋    📊    ⚙️          │
└─────────────────────────────────────┘
```

### 5.3 飲品詳情 / 參數調整頁

```
┌─────────────────────────────────────┐
│ ←  Espresso                  ❤️     │
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────┐            │
│         │   ☕         │            │
│         │   咖啡杯     │  ← 3D 風格插圖
│         │   動態呈現    │    隨參數變化
│         └─────────────┘            │
│                                     │
│  ── 沖煮參數 ─────────────────────  │
│                                     │
│  溫度        ◯━━━━━━━●━━━  92°C    │  ← 圓形滑桿
│  濃度        ◯━━━━━━━━●━  ████░    │    5 段視覺指示
│  杯量        ◯━━━●━━━━━━  40ml     │
│  研磨度      ◯━━━━●━━━━━  中細      │
│  奶泡量      ◯━━━━━━━━━●  N/A      │  ← 無奶飲品灰色
│                                     │
│  ── 進階選項 ─────────────────────  │
│  預浸泡      [開啟]  3 秒           │
│  杯數        [單杯 ◉] [雙杯 ○]     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       ☕ 開始沖煮             │   │  ← 漸層金色大按鈕
│  └─────────────────────────────┘   │
│  [保存為配方]                       │
│                                     │
└─────────────────────────────────────┘
```

**互動重點：**
- 調整溫度/濃度時，咖啡杯插圖顏色深淺即時變化
- 滑桿帶有觸覺回饋（Haptic Feedback）
- 奶泡量調整時杯中奶泡高度動態變化

### 5.4 沖煮進度頁（Full-screen Modal）

```
┌─────────────────────────────────────┐
│                              ✕      │
│                                     │
│                                     │
│         ┌─────────────┐            │
│         │             │            │
│         │  ☕ 動態     │  ← Lottie 動畫
│         │  沖煮動畫    │    對應當前階段
│         │             │            │
│         └─────────────┘            │
│                                     │
│        正在為您沖煮...               │
│        Espresso · 92°C              │
│                                     │
│   研磨 ──● 預浸 ── 萃取 ── 完成     │  ← 步驟進度條
│          ↑ 當前階段                  │
│                                     │
│       ━━━━━━━━━━━━░░░░  65%        │  ← 整體進度
│                                     │
│       預計剩餘 45 秒                 │
│                                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         取消沖煮              │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**沖煮完成時：**
- 粒子慶祝動畫
- 顯示評分（1-5 星）
- 「再來一杯」按鈕

### 5.5 配方頁 (Recipes)

```
┌─────────────────────────────────────┐
│ 我的配方                      ＋     │
├─────────────────────────────────────┤
│                                     │
│ [全部] [收藏 ❤️] [最近使用]          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ☕ 早安濃縮           ❤️ ⋯  │   │
│  │ Espresso · 93°C · 濃度4    │   │
│  │ 上次使用：今天 09:15       │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🥛 午後拿鐵           ❤️ ⋯  │   │
│  │ Latte · 90°C · 奶泡80%    │   │
│  │ 上次使用：昨天 14:30       │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🍫 週末摩卡           ♡ ⋯  │   │
│  │ Mocha · 88°C · 巧克力醬    │   │
│  │ 上次使用：3 天前           │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🏠    ☕    📋    📊    ⚙️          │
└─────────────────────────────────────┘
```

### 5.6 統計頁 (Stats)

```
┌─────────────────────────────────────┐
│ 統計                                │
├─────────────────────────────────────┤
│                                     │
│  本週沖煮                           │
│  ┌────────────────────────────┐    │
│  │  ▓ 18 杯                   │    │
│  │  ▓▓▓▓░░░                   │ ← 柱狀圖
│  │  一 二 三 四 五 六 日       │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 18杯 │ │ 234mg│ │ Latte│  ← 數據卡
│  │ 本週  │ │咖啡因│ │ 最愛  │       │
│  └──────┘ └──────┘ └──────┘       │
│                                     │
│  ── 飲品偏好 ─────────────────────  │
│  ┌────────────────────────────┐    │
│  │    ╭──╮                    │    │
│  │   ╱拿鐵╲  濃縮  美式      │ ← 圓餅圖
│  │   ╲ 45% ╱  30%  15%      │    │
│  │    ╰──╯    其他 10%       │    │
│  └────────────────────────────┘    │
│                                     │
│  ── 成就 ── [查看全部 →]           │
│  🏅 Lv.3 鑑賞家  ━━━━━━━░ 72%     │
│  🎖️ 奶泡達人  🎖️ 早鳥族           │
│                                     │
├─────────────────────────────────────┤
│  🏠    ☕    📋    📊    ⚙️          │
└─────────────────────────────────────┘
```

### 5.7 成就與徽章頁

```
┌─────────────────────────────────────┐
│ ←  成就                             │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🏅 Lv.3 鑑賞家              │   │
│  │  ━━━━━━━━━━━━━━░░░  72%     │   │
│  │  還差 28 杯升級為「大師」    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 已獲得徽章 (8/24) ───────────  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │ 🎖️ │ │ 🎖️ │ │ 🎖️ │ │ 🎖️ │     │
│  │奶泡 │ │早鳥 │ │百杯 │ │純粹 │     │
│  │達人 │ │ 族  │ │俱樂 │ │主義 │     │
│  └────┘ └────┘ └────┘ └────┘     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │ 🎖️ │ │ 🎖️ │ │ 🎖️ │ │ 🎖️ │     │
│  │週末 │ │探索 │ │連續 │ │分享 │     │
│  │咖啡 │ │ 家  │ │7天 │ │ 者  │     │
│  └────┘ └────┘ └────┘ └────┘     │
│                                     │
│  ── 里程碑 ──────────────────────  │
│  ✅ 第 1 杯咖啡        2026-01-15  │
│  ✅ 累計 100 杯         2026-03-22  │
│  ⬜ 累計 500 杯         ---         │
│  ⬜ 連續 30 天          ---         │
│                                     │
└─────────────────────────────────────┘
```

### 5.8 設定頁 (Settings)

```
┌─────────────────────────────────────┐
│ 設定                                │
├─────────────────────────────────────┤
│                                     │
│  ── 用戶 ────────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 👤 Bennett            →     │   │
│  │ 👥 家庭成員管理        →     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 咖啡機 ──────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 📡 BrewMaster Pro     已連線 │   │
│  │ 📶 WiFi 設定           →     │   │
│  │ 🔄 韌體更新       最新版 ✓   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 排程 ────────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ ⏰ 排程管理             →     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 維護 ────────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 🔧 維護中心             →     │   │
│  │ 🧹 引導式清潔           →     │   │
│  │ 📦 耗材紀錄             →     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ── 其他 ────────────────────────  │
│  ┌─────────────────────────────┐   │
│  │ 🔔 通知設定             →     │   │
│  │ ❓ 幫助與回饋           →     │   │
│  │ ℹ️  關於               →     │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🏠    ☕    📋    📊    ⚙️          │
└─────────────────────────────────────┘
```

### 5.9 Onboarding 引導頁

```
第 1 頁：歡迎
┌──────────────────────┐
│                      │
│    ☕ BrewMaster Pro  │
│                      │
│   您的專屬咖啡管家    │
│                      │
│      ● ○ ○ ○        │
│    [開始體驗 →]      │
└──────────────────────┘

第 2 頁：配對咖啡機
第 3 頁：建立個人檔案（暱稱、頭像、口味偏好）
第 4 頁：選擇第一杯咖啡
```

---

## 6. 設計系統

### 6.1 色彩系統

#### 主色調（深色質感主題）

| 名稱 | 色碼 | 用途 |
|------|------|------|
| **Background Primary** | `#1A1A1C` | 主背景色 |
| **Card Surface** | `#242426` | 卡片/區塊背景 |
| **Expanded Surface** | `#2A2A2C` | 輸入框/次要區塊/分隔線 |
| **Gold Primary** | `#C9A962` | 主要強調色、按鈕、重要標題 |
| **Gold Deep** | `#8B7845` | 漸層深色端 |
| **Gold Gradient** | `#C9A962 → #8B7845` | 主要按鈕漸層（135°） |
| **Warm White** | `#F5F5F0` | 主要文字（暖白，非純白） |
| **Text Secondary** | `#6E6E70` | 次要文字、標籤 |
| **Text Tertiary** | `#4A4A4C` | 禁用文字、輔助提示 |
| **Border Primary** | `#3A3A3C` | 卡片邊框、分隔線 |
| **Border Divider** | `#2A2A2C` | 區塊內分隔線 |

#### 語意色彩

| 名稱 | 色碼 | 用途 |
|------|------|------|
| **Success / Sage Green** | `#6E9E6E` | 沖煮完成、狀態正常、已連線 |
| **Warning** | `#FF9800` | 低水量、需要清潔 |
| **Error** | `#E53935` | 錯誤、渣盒已滿 |

#### 飲品色彩（用於飲品卡片識別）

| 飲品類型 | 色碼 | 描述 |
|---------|------|------|
| Espresso | `#3E2723` | 深咖啡色 |
| Americano | `#5D4037` | 美式咖啡色 |
| Latte | `#8B7355` | 拿鐵色 |
| Cappuccino | `#7B6B5E` | 卡布奇諾色 |
| Mocha | `#4E342E` | 摩卡巧克力色 |

### 6.2 字型系統

| 層級 | 字型 | 大小 | 字重 | 用途 |
|------|------|------|------|------|
| Display | Cormorant Garamond | 42px | Regular (400) | 頁面大標題（首頁問候、飲品、統計等） |
| H1 | Cormorant Garamond | 28-32px | Medium (500) | 區塊標題 |
| H2 | Cormorant Garamond | 20px | Medium (500) | 卡片標題、飲品名 |
| H3 | Cormorant Garamond | 18px | Medium (500) | 列表項標題 |
| Number | Cormorant Garamond | 42-52px | Light (300) | 大數字展示（排程時間、統計數字） |
| Body | Inter | 14-16px | Medium (500) | UI 按鈕、標籤 |
| Body Small | Inter | 12-13px | Regular (400) | 次要說明、副標 |
| Caption | Inter | 10-11px | Medium (500) | 小標籤、Tab 文字、Section Header |
| Section Label | Inter | 11px | Medium (500) | 區段分隔標題（letterSpacing: 3, uppercase） |

### 6.3 間距系統

基於 4px 為基本單位：

| Token | 值 | 用途 |
|-------|-----|------|
| `spacing-xs` | 4px | 圖示與文字間距 |
| `spacing-sm` | 8px | 緊湊元素間距 |
| `spacing-md` | 16px | 標準元素間距 |
| `spacing-lg` | 24px | 區塊間距 |
| `spacing-xl` | 32px | 頁面區域間距 |
| `spacing-2xl` | 48px | 主要區塊分隔 |

### 6.4 圓角系統

| Token | 值 | 用途 |
|-------|-----|------|
| `radius-sm` | 4px | 進度條、小色塊 |
| `radius-md` | 16px | 列表項、小型按鈕 |
| `radius-lg` | 20px | 卡片、按鈕、Pill Tab（標準圓角） |
| `radius-xl` | 24-26px | 分類 Tab、Tab Bar 內項目 |
| `radius-pill` | 34px | Tab Bar 外框（Pill 造型） |
| `radius-full` | 9999px | 圓形按鈕、頭像、圖示按鈕 |

### 6.5 層次系統（無陰影設計）

本設計採用 **邊框 + 色彩分層** 取代傳統陰影，營造精緻質感：

| 方式 | 值 | 用途 |
|------|-----|------|
| 卡片邊框 | `1px solid #3A3A3C` | 卡片與背景的層次區分 |
| 區塊內分隔線 | `1px solid #2A2A2C` | 設定列表項之間的分隔 |
| 色彩層次 | `#1A1A1C` → `#242426` → `#2A2A2C` | 背景 → 卡片 → 內嵌元素 |
| 金色光暈 | `radial-gradient #C9A96230 → transparent` | 一鍵沖煮按鈕呼吸光暈（非 box-shadow） |

### 6.6 元件規範

#### 按鈕

| 類型 | 背景 | 文字 | 高度 | 圓角 |
|------|------|------|------|------|
| Primary | Gold Gradient (`#C9A962 → #8B7845`) | `#1A1A1C` | 52px | 20px |
| Secondary | `transparent` + 1px border `#C9A962` | `#C9A962` | 48px | 20px |
| Ghost | `transparent` | `#C9A962` | 44px | 20px |
| Brew (CTA) | Gold Gradient (`#C9A962 → #8B7845`) | `#1A1A1C` | 56px | 20px |
| Cancel | `transparent` + 1px border `#3A3A3C` | `#6E6E70` | 48px | 20px |

#### 卡片

- 背景：`#242426`
- 圓角：20px
- 內距：20px
- 邊框：`1px solid #3A3A3C`
- 無陰影

#### 滑桿 (Slider)

- 軌道背景：`#2A2A2C`
- 已填充：Gold Gradient (`#C9A962 → #8B7845`)
- 把手：24x24 圓形，`#C9A962`，border 2px `#1A1A1C`
- 拖動時把手放大至 28x28

#### Tab Bar（Pill 膠囊造型）

- 容器：padding `[12, 21, 21, 21]`（含 Safe Area）
- Pill 外框：`#242426`，border `1px #3A3A3C`，radius 34px，height 62px，padding 4px
- 5 個 Tab：首頁(house) / 飲品(coffee) / 配方(book-open) / 統計(chart-bar) / 設定(settings)
- Tab Item：fill_container，radius 26px，vertical layout，gap 4px
  - Icon：Lucide 22px
  - Label：Inter 10px medium 500，uppercase
- Active 狀態：fill `#C9A962`，icon + label 色 `#1A1A1C`
- Inactive 狀態：transparent，icon + label 色 `#6E6E70`

---

## 7. 互動效果與動畫規範

### 7.1 動畫引擎

使用 **React Native Reanimated 3** 作為主要動畫引擎，搭配 **Lottie** 處理複雜向量動畫。

### 7.2 頁面轉場

| 場景 | 動畫類型 | 時長 | 曲線 |
|------|---------|------|------|
| Tab 切換 | Crossfade + 輕微上移 | 250ms | `Easing.out(Easing.cubic)` |
| Push 進入子頁 | 從右滑入 + 前頁輕微左移 | 300ms | `Easing.bezier(0.25, 0.1, 0.25, 1)` |
| Modal 彈出 | 從底部滑入 + 背景模糊 | 350ms | Spring (damping: 20, stiffness: 200) |
| Modal 關閉 | 向下滑出 | 250ms | `Easing.in(Easing.cubic)` |

### 7.3 首頁動畫

| 元素 | 動畫 | 說明 |
|------|------|------|
| 一鍵沖煮按鈕 | 呼吸光暈 (Pulse Glow) | 金色光暈以 3 秒循環緩慢擴散/收縮，opacity 0.2↔0.5 |
| 一鍵沖煮按鈕 | 按下縮放 | Press: scale 0.95, Release: scale 1.0 + 彈性回彈 |
| AI 推薦卡片 | 滑入動畫 | 首次載入時依序從右側滑入，間隔 100ms |
| 機器狀態 | 數值跳動 | 百分比從 0 跳動到實際值，300ms |
| 問候語 | 淡入 | 頁面載入時 opacity 0→1，200ms |

### 7.4 沖煮流程動畫

| 階段 | 動畫 | 說明 |
|------|------|------|
| 研磨中 | Lottie: 齒輪旋轉 + 咖啡豆落下 | 循環播放 |
| 預浸泡 | Lottie: 水滴滲透 | 緩慢滴水效果 |
| 萃取中 | Lottie: 咖啡液流出 | 棕色液體從濾嘴流入杯中 |
| 打奶泡 | Lottie: 牛奶旋轉泡沫 | 僅奶類飲品顯示 |
| 完成 | 粒子慶祝 | 金色粒子從中心向外爆發，1.5 秒 |
| 進度條 | 漸進填充 | 跟隨實際進度平滑移動，帶微光效果 |

### 7.5 參數調整動畫

| 元素 | 動畫 | 說明 |
|------|------|------|
| 滑桿拖動 | 把手放大 + 數值氣泡 | 拖動時把手放大，上方浮現數值 |
| 咖啡杯插圖 | 顏色/液面即時變化 | 調整濃度→顏色深淺；杯量→液面高低；奶泡→泡沫層厚度 |
| 參數值文字 | 數字翻滾 | 值變化時數字上下翻滾切換 |
| 觸覺回饋 | Haptic Impact | 滑桿每到一個刻度觸發 Light Impact |

### 7.6 列表與卡片動畫

| 場景 | 動畫 | 說明 |
|------|------|------|
| 列表載入 | Staggered fade-in | 卡片依序淡入 + 上移 8px，間隔 50ms |
| 下拉刷新 | 自訂咖啡杯旋轉 | 咖啡杯圖示旋轉替代默認 spinner |
| 卡片按壓 | Scale + 明度 | Press: scale 0.97 + 明度微降 |
| 滑動刪除 | 左滑露出操作按鈕 | Swipeable 帶 Spring 回彈 |
| 收藏動作 | 心形彈跳 | ♡→❤️ 帶 scale overshoot (1.0→1.3→1.0) |

### 7.7 成就解鎖動畫

| 場景 | 動畫 | 說明 |
|------|------|------|
| 徽章解鎖 | 光暈爆發 + 旋轉入場 | 徽章從小到大旋轉出現，背後金色光暈 |
| 等級提升 | 全螢幕慶祝 | Lottie 煙火 + 等級數字放大 + 震動回饋 |
| 進度條增長 | 平滑填充 | 帶微光掃過效果 |

### 7.8 微互動

| 場景 | 動畫 |
|------|------|
| Tab Bar 切換 | 選中圖示輕微彈跳 (scale 1.0→1.15→1.0) |
| Toggle 開關 | 滑動 + 顏色過渡 250ms |
| Toast 通知 | 從頂部滑入 + 自動滑出 |
| Skeleton 載入 | 閃光掃過效果 (Shimmer) |
| 按鈕 Loading | 文字淡出 → Spinner 淡入 |

---

## 8. 技術架構

### 8.1 技術選型總覽

| 類別 | 技術 | 版本 | 說明 |
|------|------|------|------|
| **平台** | Expo | SDK 52+ | 基於 Expo 管理的 React Native 工作流，支援 Expo Go 手機即時預覽 |
| **框架** | React Native | 0.76+ | 跨平台行動應用框架（由 Expo 管理） |
| **語言** | TypeScript | 5.x | 型別安全 |
| **路由** | Expo Router | v4 | 基於檔案的路由系統，整合 React Navigation |
| **樣式方案** | NativeWind (TailwindCSS) | v4 | Tailwind 的 React Native 實作 |
| **動畫** | React Native Reanimated | v3 | 高效能原生動畫 |
| **手勢** | React Native Gesture Handler | v2 | 原生手勢處理 |
| **向量動畫** | Lottie React Native | latest | 沖煮流程等複雜動畫 |
| **圖表** | Victory Native | latest | 統計圖表 |
| **圖示** | Lucide React Native | latest | 圖示庫（1.5px stroke） |
| **狀態管理** | Zustand | v5 | 輕量級狀態管理 |
| **本地儲存** | expo-secure-store / MMKV | latest | 本地儲存（Expo 相容） |
| **藍牙** | expo-ble (或 react-native-ble-plx + prebuild) | latest | BLE 藍牙連線（未來） |
| **推播** | expo-notifications | latest | 推播通知（未來） |

### 8.2 專案結構

```
coffee-app/
├── app/                           # Expo Router 檔案式路由
│   ├── _layout.tsx                # Root Layout（字型載入、Provider）
│   ├── (tabs)/                    # Tab Bar 群組
│   │   ├── _layout.tsx            # Tab Navigator 設定
│   │   ├── index.tsx              # 首頁 (Home)
│   │   ├── drinks.tsx             # 飲品列表 (Drinks)
│   │   ├── recipes.tsx            # 配方 (Recipes)
│   │   ├── stats.tsx              # 統計 (Stats)
│   │   └── settings.tsx           # 設定 (Settings)
│   ├── drink/
│   │   └── [id].tsx               # 飲品詳情 (Drink Detail)
│   ├── brew-progress.tsx          # 沖煮進度 (Modal)
│   ├── schedule.tsx               # 排程管理
│   ├── achievements.tsx           # 成就與徽章
│   └── onboarding.tsx             # 引導頁
│
├── src/
│   ├── components/                # 共用元件
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Avatar.tsx
│   │   └── layout/
│   │       ├── SafeArea.tsx
│   │       ├── TabBar.tsx
│   │       └── Header.tsx
│   │
│   ├── features/                  # 各頁面專屬元件
│   │   ├── home/
│   │   │   ├── BrewButton.tsx
│   │   │   ├── AiRecommendCard.tsx
│   │   │   ├── MachineStatus.tsx
│   │   │   └── RecentBrews.tsx
│   │   ├── drinks/
│   │   │   ├── DrinkCard.tsx
│   │   │   ├── ParameterSlider.tsx
│   │   │   ├── CoffeeCupVisual.tsx
│   │   │   └── BrewAnimation.tsx
│   │   ├── recipes/
│   │   │   └── RecipeCard.tsx
│   │   ├── stats/
│   │   │   ├── BrewChart.tsx
│   │   │   ├── PreferenceChart.tsx
│   │   │   └── BadgeGrid.tsx
│   │   └── settings/
│   │       ├── ScheduleCard.tsx
│   │       └── MaintenanceGuide.tsx
│   │
│   ├── stores/                    # Zustand 狀態管理
│   │   ├── useUserStore.ts
│   │   ├── useBrewStore.ts
│   │   ├── useRecipeStore.ts
│   │   ├── useScheduleStore.ts
│   │   ├── useMachineStore.ts
│   │   └── useAchievementStore.ts
│   │
│   ├── hooks/                     # 自訂 Hooks
│   │   ├── useBrewAnimation.ts
│   │   ├── useHaptic.ts
│   │   ├── useGreeting.ts
│   │   └── useAiRecommend.ts
│   │
│   ├── constants/                 # 常數定義
│   │   ├── drinks.ts
│   │   ├── achievements.ts
│   │   ├── theme.ts
│   │   └── animations.ts
│   │
│   ├── types/                     # TypeScript 型別定義
│   │   ├── drink.ts
│   │   ├── recipe.ts
│   │   ├── user.ts
│   │   ├── machine.ts
│   │   ├── schedule.ts
│   │   └── achievement.ts
│   │
│   └── utils/                     # 工具函式
│       ├── cn.ts
│       ├── format.ts
│       └── caffeine.ts
│
├── assets/                        # 靜態資源
│   ├── lottie/
│   ├── images/
│   └── fonts/
│       ├── CormorantGaramond-*.ttf
│       └── Inter-*.ttf
│
├── tailwind.config.ts
├── app.json
├── tsconfig.json
├── package.json
└── global.css                     # NativeWind 全域樣式
```

### 8.3 關鍵技術決策

#### 狀態管理：Zustand

```typescript
// 範例：沖煮狀態 Store
interface BrewState {
  readonly currentBrew: BrewSession | null
  readonly brewHistory: ReadonlyArray<BrewRecord>
  readonly isBrewing: boolean

  startBrew: (params: BrewParams) => void
  cancelBrew: () => void
  completeBrew: (rating: number) => void
}
```

- 使用 `useShallow` 優化 re-render
- 搭配 MMKV 做持久化（配方、用戶設定）
- 各 Store 職責分離，避免單一巨大 Store

#### 樣式方案：NativeWind v4

```tsx
// 範例：使用 NativeWind + cn 工具
import { cn } from '@/utils/cn'

const BrewButton = ({ isActive }: { isActive: boolean }) => (
  <Pressable
    className={cn(
      "w-[120px] h-[120px] rounded-full items-center justify-center",
      isActive ? "bg-gold-primary" : "bg-surface"
    )}
  >
    <Text className="text-bg-primary font-bold text-lg">沖煮</Text>
  </Pressable>
)
```

#### 動畫策略分層

| 層級 | 引擎 | 適用場景 |
|------|------|---------|
| 微互動 | Reanimated `withSpring` / `withTiming` | 按鈕縮放、滑桿、Tab 切換 |
| 頁面轉場 | React Navigation + Reanimated | Stack/Tab 切換動畫 |
| 複雜動畫 | Lottie | 沖煮流程、成就解鎖 |
| 粒子效果 | Reanimated + Canvas (Skia) | 沖煮完成慶祝 |

### 8.4 NativeWind 主題設定

```typescript
// tailwind.config.ts
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0D0D14",
        "bg-secondary": "#1A1A2E",
        "bg-tertiary": "#252540",
        "surface": "#2D2D4A",
        "gold-primary": "#C8A96E",
        "gold-light": "#E8D5A8",
        "warm-white": "#F5F0E8",
        "cool-gray": "#8B8B9E",
        "muted-gray": "#5A5A72",
        "success": "#4CAF50",
        "warning": "#FF9800",
        "error": "#E53935",
        "info": "#42A5F5",
      },
      borderRadius: {
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
      },
      fontFamily: {
        "display": ["SF Pro Display", "Roboto", "sans-serif"],
        "body": ["SF Pro Text", "Roboto", "sans-serif"],
        "mono": ["SF Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
```

---

## 9. 資料模型

### 9.1 用戶 (User)

```typescript
interface User {
  readonly id: string
  readonly name: string
  readonly avatar: string           // 本地路徑或預設圖示 key
  readonly createdAt: string        // ISO 8601
  readonly preferences: UserPreferences
  readonly level: CoffeeLevel
  readonly achievements: ReadonlyArray<string>  // achievement IDs
}

interface UserPreferences {
  readonly defaultDrink: string     // drink ID
  readonly temperatureUnit: "celsius" | "fahrenheit"
  readonly notifications: NotificationSettings
}

type CoffeeLevel = "beginner" | "enthusiast" | "connoisseur" | "master" | "legend"
```

### 9.2 飲品 (Drink)

```typescript
interface Drink {
  readonly id: string
  readonly name: string
  readonly nameZh: string
  readonly category: DrinkCategory
  readonly icon: string
  readonly color: string
  readonly defaultParams: BrewParams
  readonly hasMilk: boolean
}

interface BrewParams {
  readonly temperature: number      // 85-96°C
  readonly strength: 1 | 2 | 3 | 4 | 5
  readonly volume: number           // 25-350ml
  readonly grindSize: 1 | 2 | 3 | 4 | 5
  readonly milkFoam: number         // 0-100 (%)
  readonly preInfusion: boolean
  readonly preInfusionTime: number  // 秒
  readonly cups: 1 | 2
}

type DrinkCategory = "espresso" | "milk" | "specialty" | "iced"
```

### 9.3 配方 (Recipe)

```typescript
interface Recipe {
  readonly id: string
  readonly userId: string
  readonly name: string
  readonly icon: string
  readonly baseDrinkId: string
  readonly params: BrewParams
  readonly isFavorite: boolean
  readonly createdAt: string
  readonly lastUsedAt: string | null
  readonly useCount: number
}
```

### 9.4 沖煮紀錄 (BrewRecord)

```typescript
interface BrewRecord {
  readonly id: string
  readonly userId: string
  readonly drinkId: string
  readonly recipeId: string | null
  readonly params: BrewParams
  readonly startedAt: string
  readonly completedAt: string | null
  readonly status: "completed" | "cancelled"
  readonly rating: number | null    // 1-5
  readonly caffeineEstimate: number // mg
}
```

### 9.5 排程 (Schedule)

```typescript
interface Schedule {
  readonly id: string
  readonly userId: string
  readonly name: string
  readonly recipeId: string
  readonly time: string             // "HH:mm"
  readonly repeatDays: ReadonlyArray<number>  // 0-6 (日-六)
  readonly isActive: boolean
  readonly notifyBefore: number     // 分鐘
}
```

### 9.6 咖啡機狀態 (MachineState)

```typescript
interface MachineState {
  readonly isConnected: boolean
  readonly connectionType: "ble" | "wifi" | null
  readonly waterLevel: number       // 0-100 (%)
  readonly beanLevel: number        // 0-100 (%)
  readonly wasteLevel: number       // 已使用次數 / 最大容量
  readonly wasteMax: number
  readonly descaleStatus: "ok" | "soon" | "needed"
  readonly lastDescaleDate: string | null
  readonly firmwareVersion: string
  readonly brewingState: BrewingState | null
}

interface BrewingState {
  readonly stage: "grinding" | "preinfusion" | "extracting" | "frothing" | "complete"
  readonly progress: number         // 0-100 (%)
  readonly estimatedRemaining: number // 秒
}
```

### 9.7 成就 (Achievement)

```typescript
interface Achievement {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly icon: string
  readonly category: "milestone" | "exploration" | "streak" | "skill"
  readonly condition: AchievementCondition
}

interface UserAchievement {
  readonly achievementId: string
  readonly unlockedAt: string
  readonly progress: number         // 0-100 (%)
}
```

---

## 10. 未來擴展規劃

### Phase 2（計劃中）
- 社群配方廣場：瀏覽/分享/評分用戶配方
- 咖啡豆管理：掃描識別豆種、推薦參數、庫存追蹤
- 語音助理整合：Siri / Google Assistant 語音沖煮
- Apple Watch / WearOS 快速沖煮

### Phase 3（遠期）
- 智慧家居整合：HomeKit / Google Home / Matter 協議
- 鬧鐘連動：系統鬧鐘觸發排程沖煮
- 咖啡豆電商：App 內直購推薦咖啡豆
- AI 風味描述：根據沖煮參數預測風味輪
- OTA 韌體更新：App 內推送機器韌體升級

---

## 附錄 A：飲品預設清單

| # | 飲品名稱 | 英文 | 分類 | 溫度 | 濃度 | 杯量 | 奶泡 |
|---|---------|------|------|------|------|------|------|
| 1 | 濃縮咖啡 | Espresso | espresso | 93°C | 5 | 30ml | 0% |
| 2 | 雙份濃縮 | Double Espresso | espresso | 93°C | 5 | 60ml | 0% |
| 3 | 美式咖啡 | Americano | espresso | 92°C | 3 | 200ml | 0% |
| 4 | 經典拿鐵 | Latte | milk | 90°C | 3 | 250ml | 70% |
| 5 | 卡布奇諾 | Cappuccino | milk | 90°C | 4 | 180ml | 100% |
| 6 | 澳白咖啡 | Flat White | milk | 91°C | 4 | 150ml | 40% |
| 7 | 瑪奇朵 | Macchiato | milk | 92°C | 5 | 80ml | 30% |
| 8 | 摩卡咖啡 | Mocha | specialty | 88°C | 3 | 250ml | 60% |
| 9 | 熱牛奶 | Hot Milk | milk | 65°C | 0 | 200ml | 50% |
| 10 | 熱水 | Hot Water | - | 95°C | 0 | 250ml | 0% |
| 11 | 長黑咖啡 | Long Black | espresso | 92°C | 4 | 150ml | 0% |
| 12 | 康寶藍 | Con Panna | specialty | 93°C | 5 | 40ml | 0% |

---

## 附錄 B：成就預設清單

| 類型 | 名稱 | 條件 |
|------|------|------|
| milestone | 第一杯咖啡 | 完成首次沖煮 |
| milestone | 百杯俱樂部 | 累計沖煮 100 杯 |
| milestone | 千杯傳奇 | 累計沖煮 1000 杯 |
| streak | 早鳥族 | 連續 7 天在 8:00 前沖煮 |
| streak | 咖啡不能停 | 連續 30 天每天沖煮 |
| exploration | 品味探索家 | 嘗試所有 12 種預設飲品 |
| exploration | 奶泡達人 | 沖煮 50 杯含奶泡飲品 |
| exploration | 黑咖啡純粹主義者 | 沖煮 100 杯不含牛奶飲品 |
| skill | 參數大師 | 建立 10 個自訂配方 |
| skill | 溫度敏感 | 在 5 種不同溫度下沖煮同一飲品 |
| skill | 週末咖啡師 | 連續 4 個週末嘗試不同飲品 |
| skill | 分享者 | 匯出 5 個配方給朋友 |

---

## 附錄 C：Windows 環境設定 Android 模擬器指南

### C.1 概述

在 Windows 上執行此 Expo 專案需要安裝 Android 模擬器。本附錄提供完整的設定步驟指引。

### C.2 前置需求

| 項目 | 需求 |
|------|------|
| 作業系統 | Windows 10/11 (64-bit) |
| 記憶體 | 至少 8GB RAM（建議 16GB） |
| 硬碟空間 | 至少 10GB 可用空間 |
| 虛擬化 | 需啟用 BIOS 虛擬化功能（Intel VT-x 或 AMD-V） |

### C.3 步驟一：安裝 Android Studio

#### 1. 下載 Android Studio

1. 前往官方網站：https://developer.android.com/studio
2. 點擊「Download Android Studio」
3. 接受條款並下載安裝程式（約 1GB）

#### 2. 執行安裝程式

1. 執行下載的 `.exe` 檔案
2. 在安裝精靈中選擇：
   - ✅ **Android Studio**
   - ✅ **Android Virtual Device**（必選，用於模擬器）
3. 選擇安裝路徑（建議使用預設路徑）：
   ```
   C:\Program Files\Android\Android Studio
   ```
4. 完成安裝並啟動 Android Studio

#### 3. 初次設定

1. 選擇 **Standard** 安裝類型
2. 選擇佈景主題（Light / Dark）
3. 確認安裝以下元件：
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
   - Intel x86 Emulator Accelerator (HAXM)（Intel CPU）或 Android Emulator Hypervisor Driver（AMD CPU）
4. 點擊 **Finish** 開始下載和安裝（約 3-5GB，需時 10-30 分鐘）

### C.4 步驟二：設定環境變數

#### 1. 確認 Android SDK 路徑

Android SDK 預設安裝在：
```
C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk
```

在 Android Studio 中確認路徑：
1. 開啟 Android Studio
2. 點擊 **File > Settings**（或按 `Ctrl + Alt + S`）
3. 導航至 **Appearance & Behavior > System Settings > Android SDK**
4. 複製 **Android SDK Location** 的路徑

#### 2. 設定系統環境變數

1. 開啟「系統內容」視窗：
   - 按 `Win + R`，輸入 `sysdm.cpl`，按 Enter
   - 或在檔案總管中右鍵「本機」→「內容」→「進階系統設定」

2. 點擊「環境變數」按鈕

3. 在「系統變數」區域，點擊「新增」，建立以下變數：

   **變數 1：ANDROID_HOME**
   ```
   變數名稱：ANDROID_HOME
   變數值：C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk
   ```

   **變數 2：ANDROID_SDK_ROOT**（部分工具需要）
   ```
   變數名稱：ANDROID_SDK_ROOT
   變數值：C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk
   ```

4. 編輯 **Path** 變數：
   - 在「系統變數」中找到 **Path**，點擊「編輯」
   - 點擊「新增」，加入以下三個路徑：
     ```
     C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk\platform-tools
     C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk\emulator
     C:\Users\[您的使用者名稱]\AppData\Local\Android\Sdk\tools\bin
     ```

5. 點擊「確定」儲存所有變更

#### 3. 驗證環境變數設定

1. **重新開啟終端機**（重要：環境變數需要重啟終端才會生效）
2. 執行以下命令驗證：
   ```bash
   adb --version
   ```
   應該會顯示類似：
   ```
   Android Debug Bridge version 1.0.41
   ```

### C.5 步驟三：建立 Android 虛擬裝置 (AVD)

#### 1. 開啟 AVD Manager

1. 啟動 Android Studio
2. 在歡迎畫面點擊「More Actions」→「Virtual Device Manager」
3. 或在專案中點擊工具列的 📱 圖示

#### 2. 建立新的虛擬裝置

1. 點擊「Create Device」按鈕

2. **選擇硬體**：
   - 分類：**Phone**
   - 推薦機型：
     - **Pixel 7 Pro**（解析度 1440 x 3120，適合測試高階手機）
     - **Pixel 5**（解析度 1080 x 2340，中階手機）
   - 點擊「Next」

3. **選擇系統映像**：
   - 切換到 **Recommended** 標籤
   - 選擇最新的 **Android API 34** (UpsideDownCake) 或 **API 33** (Tiramisu)
   - Release Name 選擇帶有 Google APIs 的版本（支援 Google Play）
   - 如果未下載，點擊 **Download** 旁邊的下載連結（約 1-2GB）
   - 下載完成後點擊「Next」

4. **驗證設定**：
   - AVD Name：可自訂名稱，例如 `Pixel_7_Pro_API_34`
   - 確認以下設定：
     - Startup orientation：**Portrait**
     - Graphics：**Hardware - GLES 2.0**（效能較好）
     - RAM：建議 **2048 MB** 以上
     - Internal Storage：**6000 MB** 以上
   - 點擊「Show Advanced Settings」可調整：
     - Boot option：**Cold boot**（每次重新啟動）或 **Quick boot**（快速啟動，推薦）
   - 點擊「Finish」完成建立

### C.6 步驟四：啟動模擬器並執行 Expo 專案

#### 1. 啟動模擬器

**方法 1：從 Android Studio 啟動**
1. 在 Virtual Device Manager 中，找到您建立的 AVD
2. 點擊 ▶️ 播放按鈕
3. 等待模擬器啟動（首次啟動需要 1-2 分鐘）

**方法 2：從命令列啟動**
```bash
# 列出所有可用的模擬器
emulator -list-avds

# 啟動指定的模擬器
emulator -avd Pixel_7_Pro_API_34
```

#### 2. 驗證 ADB 連線

模擬器啟動後，執行以下命令確認裝置已連線：
```bash
adb devices
```

應該會顯示：
```
List of devices attached
emulator-5554   device
```

#### 3. 執行 Expo 專案

在專案根目錄執行：

```bash
# 安裝相依套件（如果尚未安裝）
npm install

# 啟動 Expo 開發伺服器
npx expo start
```

#### 4. 在模擬器上開啟 App

Expo 開發伺服器啟動後，在終端機中：
1. 按 `a` 鍵自動在 Android 模擬器中開啟
2. 或在瀏覽器的 Expo Dev Tools 中點擊「Run on Android device/emulator」

首次執行時會自動在模擬器中安裝 Expo Go，然後載入您的 App。

### C.7 常見問題排解

#### 問題 1：模擬器啟動緩慢或卡頓

**解決方案：**
- 確認已啟用硬體加速（HAXM 或 Hypervisor Driver）
- 在 AVD 設定中調整 Graphics 為 **Hardware**
- 增加 AVD 的 RAM 配置
- 關閉其他佔用記憶體的應用程式

#### 問題 2：`adb: command not found`

**解決方案：**
- 確認環境變數 `Path` 已加入 `platform-tools` 路徑
- **重新啟動終端機**（環境變數變更需要重啟）
- 確認 Android SDK 已正確安裝

#### 問題 3：虛擬化未啟用

**錯誤訊息：**
```
Intel HAXM is required to run this AVD.
VT-x is disabled in BIOS.
```

**解決方案：**
1. 重新啟動電腦，進入 BIOS 設定（通常按 `F2`、`F10`、`Del` 或 `Esc`）
2. 找到 **Virtualization Technology**、**Intel VT-x** 或 **AMD-V** 選項
3. 設定為 **Enabled**
4. 儲存並重新啟動

#### 問題 4：Expo 無法偵測到模擬器

**解決方案：**
- 確認模擬器已完全啟動（可看到 Android 主畫面）
- 執行 `adb devices` 確認裝置已列出
- 重新啟動 Expo 開發伺服器（`Ctrl + C` 停止，然後重新執行 `npx expo start`）
- 在 Expo 終端機中按 `r` 重新載入

#### 問題 5：模擬器顯示「App keeps stopping」

**解決方案：**
- 檢查終端機中的錯誤訊息
- 確認 `package.json` 中的依賴已正確安裝
- 清除快取並重新安裝：
  ```bash
  npx expo start --clear
  ```

### C.8 效能優化建議

| 優化項目 | 建議設定 |
|---------|---------|
| **RAM 配置** | 2048-4096 MB（視電腦記憶體而定） |
| **圖形加速** | Hardware - GLES 2.0 |
| **開機模式** | Quick Boot（快速啟動） |
| **螢幕解析度** | 選擇較低解析度的機型（如 Pixel 5）以提升效能 |
| **關閉動畫** | 在模擬器的開發者選項中關閉視窗動畫 |

### C.9 參考資源

- Android Studio 官方文件：https://developer.android.com/studio/intro
- 管理 AVD：https://developer.android.com/studio/run/managing-avds
- Expo Android 開發設定：https://docs.expo.dev/workflow/android-studio-emulator/
- 環境變數設定指南：https://docs.expo.dev/get-started/set-up-your-environment/

---

> **文件維護**：此文件隨產品迭代持續更新，以最新版本為準。
