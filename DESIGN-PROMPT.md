# BrewMaster Pro — Pencil 設計指令文件

> **用途：** 搭配 Pencil MCP 工具，在 `.pen` 檔案中繪製高保真 Mobile App UI
> **Style Guide：** `mobile-03-elegantluxury_light`
> **參考規格：** `PRD.md`
> **目標檔案：** `coffee-app-pencil`

---

## 通用設計規則

### 裝置與畫布

- **螢幕寬度：** 402px（iPhone 標準）
- **最小螢幕高度：** 874px
- **Status Bar 高度：** 62px
- **Tab Bar 區域高度：** 約 95px（含 safe area）

### Style Guide 速查

| 屬性 | 值 |
|------|-----|
| Page Background | `#1A1A1C` |
| Card Surface | `#242426` |
| Expanded Surface | `#2A2A2C` |
| Text Primary | `#F5F5F0` (warm off-white) |
| Text Secondary | `#6E6E70` |
| Text Tertiary | `#4A4A4C` |
| Gold Primary | `#C9A962` |
| Gold Deep | `#8B7845` |
| Sage Green | `#6E9E6E` |
| Border Primary | `#3A3A3C` |
| Border Divider | `#2A2A2C` |
| Error/Warning | `#E53935` / `#FF9800` |
| Card Radius | 20px |
| Tab Bar Pill Radius | 34px |
| Content Padding | 28px horizontal |
| Section Gap | 40px |
| Display Font | Cormorant Garamond |
| Body Font | Inter |
| Icon Set | Lucide (1.5px stroke) |

### 通用底部 Tab Bar（所有主頁面共用）

5 個 Tab：首頁 / 飲品 / 配方 / 統計 / 設定

```
結構：
- tabBarContainer: frame, fill_container width, padding [12, 21, 21, 21]
  - tabBarPill: frame, horizontal, fill_container width, height 62px, radius 34px
    border: 1px #3A3A3C, fill: #242426, padding [4, 4], gap: 0
    - tabItem × 5: frame, vertical, fill_container, fill_container height
      radius 26px, gap 4px, center aligned
      - icon: lucide icon, 22px
      - label: Inter 10px, medium 500, uppercase

Tab 列表：
1. house (首頁) — icon: house
2. coffee (飲品) — icon: coffee
3. book-open (配方) — icon: book-open
4. chart-bar (統計) — icon: chart-bar
5. settings (設定) — icon: settings

Active 狀態：fill #C9A962, icon + label 色 #1A1A1C
Inactive 狀態：transparent, icon + label 色 #6E6E70
```

---

## Screen 1: 首頁 (Home)

**Active Tab:** 首頁
**頁面描述：** App 的核心入口頁，包含用戶問候、一鍵沖煮大按鈕、AI 推薦、機器狀態、最近沖煮紀錄。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 用戶頭像 + 名稱 (可切換) | 通知鈴鐺
  Primary content: 問候語 + 一鍵沖煮圓形大按鈕
  Secondary content: AI 推薦卡片列 → 機器狀態卡 → 最近沖煮列表
  Primary action: 一鍵沖煮按鈕 (頁面中央偏上)
  Scroll behavior: 整體垂直捲動
Bottom Bar: Pill Tab Bar (首頁 active)
```

### 設計指令

#### 1.1 Status Bar
- 標準 62px 高度，#1A1A1C 背景

#### 1.2 Content Wrapper
- frame, vertical, fill_container width, padding [0, 28, 28, 28], gap 32px
- fill: #1A1A1C

#### 1.3 Header Row
- frame, horizontal, fill_container width, justify space-between, align center
- 左側：
  - 頭像圓形 frame 44x44px, radius 22px, fill #242426, border 1px #C9A962
    - 內含 user icon 22px #C9A962
  - 名稱文字 "Bennett" — Cormorant Garamond 20px medium 500 #F5F5F0
  - 下拉箭頭 chevron-down 14px #6E6E70
- 右側：
  - 通知按鈕 frame 44x44px, radius 22px, fill #242426, border 1px #3A3A3C
    - bell icon 20px #6E6E70
    - 紅點 badge: ellipse 8px #E53935, 右上角

#### 1.4 Greeting Section
- frame, vertical, gap 8px
- 問候文字 "Good Morning ☀️" — Cormorant Garamond 42px normal 400 #F5F5F0
- 副標 "來杯咖啡開始美好的一天" — Inter 14px normal 400 #6E6E70

#### 1.5 Brew Button (核心 CTA)
- 居中放置
- 外圈光暈: ellipse 160x160px, fill radial gradient #C9A96230 → transparent, 用於表現呼吸光暈
- 按鈕本體: ellipse 120x120px, fill linear-gradient 135° #C9A962 → #8B7845
  border: 2px #C9A962
- 按鈕內容 (垂直居中):
  - coffee icon 28px #1A1A1C
  - "一鍵沖煮" — Inter 14px semibold 600 #1A1A1C
  - "上次：Latte" — Inter 11px normal 400 #1A1A1C, opacity 0.7

#### 1.6 AI Recommendation Section
- Section Header: frame, horizontal, align center
  - 左側線段 rectangle, fill_container, height 1px, fill #3A3A3C
  - "AI 為你推薦" — Inter 11px medium 500 #6E6E70, letterSpacing 3, uppercase
  - 右側線段 rectangle, fill_container, height 1px, fill #3A3A3C

- 卡片容器: frame, horizontal, gap 12px (水平捲動)
  - 推薦卡片 × 3: frame, vertical, width 160px, radius 20px, fill #242426
    border 1px #3A3A3C, padding 20px, gap 12px
    - 情境 icon + 標籤 row:
      - icon 背景圓: frame 32x32, radius 16px, fill #2A2A2C
        - weather icon 16px #C9A962
      - "午後時光" — Inter 12px normal 400 #6E6E70
    - 飲品名 "冰拿鐵" — Cormorant Garamond 20px medium 500 #F5F5F0
    - 推薦理由 "天氣溫暖，適合來杯冰飲" — Inter 12px normal 400 #6E6E70, lineHeight 1.5

  - 第二張: icon muscle, "雙份濃縮", "提升專注力的最佳選擇"
  - 第三張: icon moon, "晚安拿鐵", "低咖啡因，安心入睡"

#### 1.7 Machine Status Card
- Section Header: "機器狀態" — 同 1.6 的分隔線樣式

- 狀態卡: frame, fill_container width, radius 20px, fill #242426
  border 1px #3A3A3C, padding 20px
  - 2x2 Grid (用兩個 horizontal row, 各包含兩個 item):
    - Row 1: frame horizontal, fill_container, gap 16px
      - Item 1: frame vertical, fill_container, gap 4px
        - "💧 水箱" — Inter 12px normal 400 #6E6E70
        - "78%" — Cormorant Garamond 20px medium 500 #F5F5F0
        - 進度條: frame fill_container, height 4px, radius 2px, fill #2A2A2C
          - 填充: frame width 78%, height 4px, radius 2px, fill #C9A962
      - Item 2: "🫘 咖啡豆" / "45%" / 進度條 fill #FF9800 (低於 50% 警告色)
    - Row 2:
      - Item 3: "🗑️ 渣盒" / "3/12" / 進度條 fill #6E9E6E
      - Item 4: "✨ 除垢" / "正常" / 無進度條，顯示 check icon #6E9E6E

#### 1.8 Recent Brews Section
- Section Header: "最近沖煮" — 同分隔線樣式

- 沖煮列表 (2-3 項): frame vertical, fill_container, gap 8px
  - 每項: frame horizontal, fill_container, padding [16, 20], radius 16px
    fill #242426, border 1px #3A3A3C, align center, justify space-between
    - 左側: frame horizontal, gap 12px, align center
      - 時間 "09:15" — Inter 12px medium 500 #6E6E70
      - 飲品名 "Espresso" — Cormorant Garamond 18px medium 500 #F5F5F0
    - 右側: 星星評分 5 顆 star icon 14px
      - 已填: #C9A962
      - 未填: #3A3A3C

#### 1.9 Tab Bar
- 如「通用底部 Tab Bar」所述
- Active: 首頁 (home icon)

---

## Screen 2: 飲品列表 (Drinks)

**Active Tab:** 飲品
**頁面描述：** 展示所有可沖煮飲品，分類瀏覽，2 列 Grid 布局。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 頁面標題 "飲品" + 搜尋按鈕
  Primary content: 分類 Tab 切換 + 飲品 2 列 Grid
  Scroll behavior: Grid 垂直捲動，分類 Tab 固定
Bottom Bar: Pill Tab Bar (飲品 active)
```

### 設計指令

#### 2.1 Header
- frame, horizontal, fill_container, align center, justify space-between
- "飲品" — Cormorant Garamond 42px normal 400 #F5F5F0
- search icon button: frame 44x44, radius 22px, fill #242426, border 1px #3A3A3C
  - search icon 18px #6E6E70

#### 2.2 Category Tabs (Segmented Control)
- frame, horizontal, fill_container, radius 24px, fill #242426
  border 1px #3A3A3C, padding 4px, gap 0
- Tab items × 5: "全部" / "濃縮" / "牛奶" / "特調" / "冰飲"
  - 每個: frame, fill_container, height 36px, radius 20px, center aligned
  - Active: fill #C9A962, text Inter 13px medium 500 #1A1A1C
  - Inactive: transparent, text Inter 13px medium 500 #6E6E70

#### 2.3 Drinks Grid
- frame, vertical (wrap), fill_container, gap 16px
- 每列兩張卡片: frame horizontal, fill_container, gap 16px
  - 飲品卡: frame, vertical, fill_container (50%), radius 20px, fill #242426
    border 1px #3A3A3C, padding 0, overflow hidden
    - 圖片區: frame, fill_container width, height 120px, fill 飲品對應色
      - 中央放置 coffee icon_font 40px #F5F5F0 (opacity 0.8)
    - 資訊區: frame, vertical, padding [16, 16], gap 4px
      - 飲品英文名 "Espresso" — Cormorant Garamond 18px medium 500 #F5F5F0
      - 中文名 "經典濃縮" — Inter 12px normal 400 #6E6E70

- 飲品列表 (顯示 6 張):
  Row 1: Espresso (#3E2723) / Latte (#8B7355)
  Row 2: Cappuccino (#7B6B5E) / Flat White (#6B5D52)
  Row 3: Americano (#5D4037) / Mocha (#4E342E)

---

## Screen 3: 飲品詳情 / 參數調整 (Drink Detail)

**Active Tab:** 無 Tab Bar (Push 子頁)
**頁面描述：** 飲品的參數調整頁，包含咖啡杯視覺化、滑桿控制、沖煮按鈕。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 返回箭頭 + 飲品名 + 收藏按鈕
  Primary content: 咖啡杯視覺圖 + 參數滑桿群
  Secondary content: 進階選項
  Primary action: 底部固定「開始沖煮」按鈕
  Scroll behavior: 參數區域垂直捲動
Bottom Bar: 無 Tab Bar（固定 CTA 按鈕取代）
```

### 設計指令

#### 3.1 Navigation Header
- frame, horizontal, fill_container, align center, padding [8, 0]
- 左側: 返回按鈕 frame 44x44, radius 22px
  - chevron-left icon 20px #F5F5F0
- 中間: "Espresso" — Cormorant Garamond 20px medium 500 #F5F5F0
- 右側: 收藏按鈕 frame 44x44, radius 22px
  - heart icon 20px #C9A962 (已收藏) 或 #6E6E70 (未收藏)

#### 3.2 Coffee Cup Visual
- 居中區域: frame, fill_container, height 200px, align center, justify center
- 咖啡杯視覺 (由基本形狀組合):
  - 杯身: rectangle 100x120px, radius [0, 0, 20, 20], fill #3E2723
  - 咖啡液: rectangle 96x80px (高度代表杯量), fill linear-gradient #5D4037 → #3E2723
  - 奶泡層: rectangle 96x20px, fill #D7CCC8, radius [10, 10, 0, 0] (僅奶類顯示)
  - 杯口: rectangle 110x8px, radius 4px, fill #242426, border 1px #3A3A3C
  - 蒸氣: 3 條曲線 path, stroke #6E6E70 opacity 0.4, 1px

#### 3.3 Parameter Sliders Section
- "沖煮參數" section header — Inter 11px medium 500 #6E6E70 letterSpacing 3

- 參數列表: frame vertical, fill_container, gap 24px
  每個參數:
  - frame vertical, fill_container, gap 8px
    - Label row: frame horizontal, justify space-between
      - 參數名 "溫度" — Inter 14px medium 500 #F5F5F0
      - 數值 "92°C" — Cormorant Garamond 20px medium 500 #C9A962
    - 滑桿: frame horizontal, fill_container, height 24px, align center
      - 軌道: rectangle fill_container, height 4px, radius 2px, fill #2A2A2C
      - 已填充: rectangle width按比例, height 4px, radius 2px
        fill linear-gradient #C9A962 → #8B7845
      - 把手: ellipse 24x24px, fill #C9A962, border 2px #1A1A1C

- 5 組參數:
  1. 溫度: "92°C" (85-96 範圍)
  2. 濃度: "████░" 視覺 + "4/5" 文字
  3. 杯量: "40ml" (25-350 範圍)
  4. 研磨度: "中細" (5 段文字)
  5. 奶泡量: 灰色禁用狀態 (Espresso 無奶), text #4A4A4C, slider fill #2A2A2C

#### 3.4 Advanced Options
- "進階選項" section header

- frame vertical, fill_container, gap 16px
  - 預浸泡 row: frame horizontal, fill_container, justify space-between, align center
    - "預浸泡" — Inter 14px medium 500 #F5F5F0
    - 右側: frame horizontal, gap 8px, align center
      - "3 秒" — Inter 14px normal 400 #6E6E70
      - Toggle: frame 48x28, radius 14px
        - Active: fill #C9A962, 圓形把手右側
        - Inactive: fill #3A3A3C, 圓形把手左側

  - 杯數 row: frame horizontal, fill_container, justify space-between, align center
    - "杯數" — Inter 14px medium 500 #F5F5F0
    - Segmented: frame horizontal, radius 20px, fill #242426, border 1px #3A3A3C, padding 4px
      - "單杯" active: fill #C9A962, text #1A1A1C, padding [8, 16], radius 16px
      - "雙杯" inactive: transparent, text #6E6E70, padding [8, 16], radius 16px

#### 3.5 Bottom CTA (固定底部)
- frame, fill_container width, padding [16, 28, 34, 28] (含 safe area)
  fill #1A1A1C, border-top 1px #2A2A2C

- 沖煮按鈕: frame, fill_container, height 56px, radius 20px
  fill linear-gradient 135° #C9A962 → #8B7845
  - 內容 horizontal, center: coffee icon 20px #1A1A1C + "開始沖煮" Inter 16px semibold 600 #1A1A1C

- 下方: "保存為配方" — Inter 14px medium 500 #C9A962, center, marginTop 12px

---

## Screen 4: 沖煮進度 (Brew Progress)

**Active Tab:** 無（Full-screen Modal）
**頁面描述：** 沖煮過程的全螢幕動畫頁面，顯示當前階段和進度。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 右上角關閉按鈕
  Primary content: 沖煮動畫 + 階段文字 + 進度條
  Primary action: 取消沖煮按鈕
  Scroll behavior: 不捲動（固定佈局）
Bottom Bar: 無
```

### 設計指令

#### 4.1 Close Button
- 右上角: frame 44x44, radius 22px, fill #242426, border 1px #3A3A3C
  - x icon 18px #6E6E70

#### 4.2 Animation Area (居中)
- frame, fill_container, height 240px, align center, justify center
- 咖啡杯大圖 (代表 Lottie 動畫佔位):
  - 外圈光暈: ellipse 200x200px, fill radial-gradient #C9A96220 → transparent
  - 杯形: 使用與 Screen 3 類似的咖啡杯，放大 1.5 倍
  - 杯中液面: 以動態高度表示進度 (示意用固定 65% 高度)
  - 蒸氣效果: 3 條曲線更明顯

#### 4.3 Status Text
- frame, vertical, fill_container, gap 8px, align center
- "正在為您沖煮..." — Cormorant Garamond 20px medium 500 #F5F5F0
- "Espresso · 92°C" — Inter 14px normal 400 #6E6E70

#### 4.4 Stage Progress
- frame, horizontal, fill_container, align center, justify center, gap 0
- 四個階段: 研磨 → 預浸 → 萃取 → 完成
  每個階段:
  - frame vertical, align center, gap 6px
    - 圓點: ellipse 12x12px
      - 已完成: fill #C9A962
      - 進行中: fill #C9A962, 外圈 ring animation (用 border 2px #C9A962 + ellipse 18x18 表示)
      - 未到: fill #3A3A3C
    - 文字: Inter 11px medium 500
      - 已完成/進行中: #F5F5F0
      - 未到: #4A4A4C
  - 連接線: rectangle width 40px, height 2px
    - 已完成段: fill #C9A962
    - 未到段: fill #3A3A3C

- 顯示為「預浸」進行中狀態

#### 4.5 Overall Progress Bar
- frame, vertical, fill_container, gap 8px, align center
- 進度條: frame fill_container, height 6px, radius 3px, fill #2A2A2C
  - 填充: frame width 65%, height 6px, radius 3px
    fill linear-gradient #C9A962 → #8B7845
  - 光點效果: ellipse 12x6px, fill #F5F5F0 opacity 0.3 (在填充末端)
- "65%" — Cormorant Garamond 20px light 300 #C9A962
- "預計剩餘 45 秒" — Inter 12px normal 400 #6E6E70

#### 4.6 Cancel Button (底部)
- frame, fill_container, height 48px, radius 20px
  fill transparent, border 1px #3A3A3C
- "取消沖煮" — Inter 14px medium 500 #6E6E70, center

---

## Screen 5: 配方頁 (Recipes)

**Active Tab:** 配方
**頁面描述：** 使用者個人化配方管理頁面，列表式呈現。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 標題 "我的配方" + 新增按鈕
  Primary content: 篩選 Tab + 配方卡片列表
  Scroll behavior: 卡片列表垂直捲動
Bottom Bar: Pill Tab Bar (配方 active)
```

### 設計指令

#### 5.1 Header
- frame horizontal, fill_container, justify space-between, align center
- "我的配方" — Cormorant Garamond 42px normal 400 #F5F5F0
- 新增按鈕: frame 44x44, radius 22px, fill #C9A962
  - plus icon 18px #1A1A1C

#### 5.2 Filter Tabs
- frame horizontal, gap 8px
- Pill buttons × 3: "全部" / "收藏 ❤️" / "最近使用"
  - Active: frame, padding [8, 16], radius 20px, fill #C9A962
    text Inter 13px medium 500 #1A1A1C
  - Inactive: frame, padding [8, 16], radius 20px, fill #242426, border 1px #3A3A3C
    text Inter 13px medium 500 #6E6E70

#### 5.3 Recipe Cards List
- frame vertical, fill_container, gap 12px

- 每張配方卡: frame, horizontal, fill_container, radius 20px, fill #242426
  border 1px #3A3A3C, padding [16, 20], gap 16px, align center

  - 左側飲品圖示: frame 48x48, radius 24px, fill 飲品色 (opacity 0.2)
    - coffee icon 24px #F5F5F0

  - 中間資訊: frame vertical, fill_container, gap 4px
    - 上列: frame horizontal, gap 8px, align center
      - 配方名 "早安濃縮" — Cormorant Garamond 18px medium 500 #F5F5F0
    - 下列: "Espresso · 93°C · 濃度4" — Inter 12px normal 400 #6E6E70
    - 時間: "上次使用：今天 09:15" — Inter 11px normal 400 #4A4A4C

  - 右側操作: frame vertical, gap 8px, align center
    - 收藏: heart icon 18px #C9A962 (filled) 或 #4A4A4C (outline)
    - 更多: more-vertical icon 18px #4A4A4C

- 3 張範例卡:
  1. "早安濃縮" / Espresso / 93°C / 濃度4 / 今天 09:15 / ❤️ filled
  2. "午後拿鐵" / Latte / 90°C / 奶泡80% / 昨天 14:30 / ❤️ filled
  3. "週末摩卡" / Mocha / 88°C / 巧克力醬 / 3 天前 / ♡ outline

---

## Screen 6: 統計頁 (Stats)

**Active Tab:** 統計
**頁面描述：** 沖煮數據視覺化儀表板，含圖表和成就摘要。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 標題 "統計"
  Primary content: 本週柱狀圖 + 數據卡 + 偏好圓餅圖
  Secondary content: 成就摘要
  Scroll behavior: 垂直捲動
Bottom Bar: Pill Tab Bar (統計 active)
```

### 設計指令

#### 6.1 Header
- "統計" — Cormorant Garamond 42px normal 400 #F5F5F0

#### 6.2 Weekly Chart Card
- "本週沖煮" — Inter 11px medium 500 #6E6E70, letterSpacing 3

- 圖表卡: frame, fill_container, radius 20px, fill #242426, border 1px #3A3A3C
  padding 24px, gap 16px

  - 總數: "18" — Cormorant Garamond 52px light 300 #F5F5F0
    "杯" — Inter 14px normal 400 #6E6E70

  - 柱狀圖區: frame horizontal, fill_container, height 120px, gap 8px, align bottom
    - 每天一根柱: frame vertical, fill_container, align center, gap 4px
      - 柱體: rectangle width 28px, height 按比例, radius [8, 8, 0, 0]
        - 有資料: fill linear-gradient #C9A962 → #8B7845
        - 今天: fill #C9A962, border 1px #C9A962 (高亮)
        - 未來: fill #2A2A2C
      - 星期: Inter 10px medium 500 #6E6E70

    範例數據: 一(3) 二(4) 三(2) 四(5) 五(4) 六(0) 日(0)

#### 6.3 Metric Cards Row
- frame horizontal, fill_container, gap 12px
- 3 張迷你卡:
  - 每張: frame, fill_container, radius 20px, fill #242426, border 1px #3A3A3C
    padding 20px, gap 4px, vertical
    - 數值 — Cormorant Garamond 20px medium 500 #F5F5F0
    - 標籤 — Inter 11px normal 400 #6E6E70

  1. "18 杯" / "本週"
  2. "234mg" / "咖啡因"
  3. "Latte" / "最愛" — 此卡數值色用 #C9A962

#### 6.4 Preference Chart Card
- "飲品偏好" section header

- 圓餅圖卡: frame, fill_container, radius 20px, fill #242426
  border 1px #3A3A3C, padding 24px

  - frame horizontal, fill_container, gap 20px
    - 左側圓餅 (用多個 arc path 或同心圓表示):
      - 圓形 120x120px
      - 扇區: Latte 45% #C9A962 / Espresso 30% #8B7845 / Americano 15% #6E6E70 / 其他 10% #3A3A3C
    - 右側圖例: frame vertical, gap 12px
      - 每項: frame horizontal, gap 8px, align center
        - 色塊: rectangle 12x12, radius 4px, fill 對應色
        - "拿鐵 45%" — Inter 13px normal 400 #F5F5F0

#### 6.5 Achievement Summary
- Header row: frame horizontal, justify space-between
  - "成就" section header
  - "查看全部 →" — Inter 13px medium 500 #C9A962

- 等級卡: frame, fill_container, radius 20px, fill #242426
  border 1px #3A3A3C, padding 20px, gap 12px
  - Top row: frame horizontal, gap 8px, align center
    - 獎牌 icon 🏅 (text 20px)
    - "Lv.3 鑑賞家" — Cormorant Garamond 18px medium 500 #C9A962
  - 進度條: fill_container, height 6px, radius 3px, fill #2A2A2C
    - 填充 72%: fill linear-gradient #C9A962 → #8B7845
  - "還差 28 杯升級為「大師」" — Inter 12px normal 400 #6E6E70

- 徽章 row: frame horizontal, gap 12px
  - badge × 2: frame, padding [6, 12], radius 20px, fill #2A2A2C, border 1px #3A3A3C
    - "🎖️ 奶泡達人" — Inter 12px medium 500 #F5F5F0
  - "🎖️ 早鳥族"

---

## Screen 7: 設定頁 (Settings)

**Active Tab:** 設定
**頁面描述：** App 與設備設定的入口頁，分組列表。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 標題 "設定"
  Primary content: 分組設定列表
  Scroll behavior: 垂直捲動
Bottom Bar: Pill Tab Bar (設定 active)
```

### 設計指令

#### 7.1 Header
- "設定" — Cormorant Garamond 42px normal 400 #F5F5F0

#### 7.2 Settings Groups
- frame vertical, fill_container, gap 32px

每個 Group:
- frame vertical, fill_container, gap 8px
  - Group Label: "用戶" — Inter 11px medium 500 #6E6E70, letterSpacing 3
  - Group Card: frame vertical, fill_container, radius 20px, fill #242426
    border 1px #3A3A3C, padding 0, gap 0
    - 每個 Item: frame horizontal, fill_container, padding [18, 20], align center
      justify space-between
      - 左側: frame horizontal, gap 12px, align center
        - icon 18px #C9A962
        - text Inter 14px medium 500 #F5F5F0
      - 右側: frame horizontal, gap 8px, align center
        - 狀態文字 (可選) Inter 13px normal 400 #6E6E70
        - chevron-right 16px #4A4A4C
    - Items 之間: 分隔線 rectangle fill_container height 1px fill #2A2A2C marginLeft 50px

Groups 列表:

**用戶**
1. user icon + "Bennett" → chevron
2. users icon + "家庭成員管理" → chevron

**咖啡機**
3. radio icon + "BrewMaster Pro" → 狀態 "已連線" #6E9E6E + chevron
4. wifi icon + "WiFi 設定" → chevron
5. refresh-cw icon + "韌體更新" → 狀態 "最新版 ✓" #6E9E6E

**排程**
6. clock icon + "排程管理" → chevron

**維護**
7. tool icon + "維護中心" → chevron
8. sparkles icon + "引導式清潔" → chevron
9. package icon + "耗材紀錄" → chevron

**其他**
10. bell icon + "通知設定" → chevron
11. help-circle icon + "幫助與回饋" → chevron
12. info icon + "關於" → chevron

---

## Screen 8: 排程管理 (Schedule)

**Active Tab:** 無 Tab Bar (Push 子頁)
**頁面描述：** 排程預約的管理頁，卡片列表顯示所有排程。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 返回 + 標題 "排程管理" + 新增按鈕
  Primary content: 排程卡片列表
Bottom Bar: 無
```

### 設計指令

#### 8.1 Navigation Header
- 同 Screen 3 格式
- 標題 "排程管理"
- 右側: plus 按鈕 (同 Screen 5 新增按鈕樣式)

#### 8.2 Schedule Cards
- frame vertical, fill_container, gap 12px

- 每張排程卡: frame, vertical, fill_container, radius 20px, fill #242426
  border 1px #3A3A3C, padding 20px, gap 16px

  - Top row: frame horizontal, fill_container, justify space-between, align center
    - 左側: frame vertical, gap 4px
      - 排程名 "早晨咖啡" — Cormorant Garamond 18px medium 500 #F5F5F0
      - 飲品 "Espresso · 93°C" — Inter 12px normal 400 #6E6E70
    - 右側: Toggle 開關 (同 Screen 3 樣式) — active #C9A962

  - Time: "07:30" — Cormorant Garamond 42px light 300 #C9A962

  - Weekday pills: frame horizontal, gap 6px
    - 7 個圓形 pill: frame 36x36, radius 18px
      - Active day (有排程): fill #C9A962, text Inter 12px semibold 600 #1A1A1C
      - Inactive day: fill transparent, border 1px #3A3A3C, text Inter 12px #6E6E70
    - "一" "二" "三" "四" "五" 為 active, "六" "日" 為 inactive

- 2 張範例:
  1. "早晨咖啡" / Espresso · 93°C / 07:30 / 週一到五 / Toggle ON
  2. "午後拿鐵" / Latte · 90°C / 14:00 / 週一到五 / Toggle ON

---

## Screen 9: 成就與徽章 (Achievements)

**Active Tab:** 無 Tab Bar (Push 子頁)
**頁面描述：** 完整的成就系統頁面，等級、徽章牆、里程碑。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Header area: 返回 + 標題 "成就"
  Primary content: 等級卡 + 徽章 Grid + 里程碑列表
  Scroll behavior: 垂直捲動
Bottom Bar: 無
```

### 設計指令

#### 9.1 Navigation Header
- 返回 + "成就" 標題

#### 9.2 Level Card (特色大卡)
- frame, fill_container, radius 20px, padding 24px, gap 16px
  fill linear-gradient 135° #C9A962 → #8B7845 (金色漸層背景)

  - 等級: "Lv.3" — Cormorant Garamond 52px light 300 #1A1A1C
  - 稱號: "鑑賞家" — Cormorant Garamond 20px medium 500 #1A1A1C
  - 進度條: fill_container, height 8px, radius 4px, fill #1A1A1C30
    - 填充 72%: fill #1A1A1C
  - "還差 28 杯升級為「大師」" — Inter 13px medium 500 #1A1A1C, opacity 0.7

#### 9.3 Badge Grid
- "已獲得徽章 (8/24)" — Inter 11px medium 500 #6E6E70, letterSpacing 3

- frame, wrap (grid), fill_container, gap 12px
- 4 列 Grid:
  - 每個 badge: frame, vertical, width ~85px, radius 20px, padding [16, 12], gap 8px
    align center
    - 已解鎖:
      fill #242426, border 1px #C9A962
      - icon text 28px
      - name Inter 11px medium 500 #F5F5F0, center
    - 未解鎖:
      fill #242426, border 1px #3A3A3C, opacity 0.4
      - icon: lock icon 28px #4A4A4C
      - name Inter 11px normal 400 #4A4A4C, center

- Badge 範例 (4x3 grid):
  Row 1: 🎖️奶泡達人(✓) / 🎖️早鳥族(✓) / 🎖️百杯俱樂部(✓) / 🎖️純粹主義(✓)
  Row 2: 🎖️週末咖啡(✓) / 🎖️探索家(✓) / 🎖️連續7天(✓) / 🎖️分享者(✓)
  Row 3: 🔒溫度敏感 / 🔒千杯傳奇 / 🔒參數大師 / 🔒連續30天

#### 9.4 Milestones
- "里程碑" section header

- frame vertical, fill_container, gap 8px
  每個里程碑: frame horizontal, fill_container, padding [16, 20], radius 16px
    fill #242426, border 1px #3A3A3C, gap 12px, align center
    - 狀態 icon:
      - 已達成: check-circle 18px #6E9E6E
      - 未達成: circle 18px #3A3A3C
    - 描述: frame vertical, fill_container, gap 2px
      - "第 1 杯咖啡" — Inter 14px medium 500 #F5F5F0 (已達成) 或 #4A4A4C (未達成)
      - "2026-01-15" — Inter 11px normal 400 #6E6E70 (已達成) 或 "---" #4A4A4C (未達成)

  1. ✅ 第 1 杯咖啡 / 2026-01-15
  2. ✅ 累計 100 杯 / 2026-03-22
  3. ⬜ 累計 500 杯 / ---
  4. ⬜ 連續 30 天 / ---

---

## Screen 10: Onboarding 歡迎頁

**Active Tab:** 無
**頁面描述：** 首次開啟 App 的歡迎/引導頁面。

### Screen Blueprint

```
Status Bar: 標準 62px
App Content:
  Primary content: 品牌 Logo + 歡迎文案 + 分頁指示器
  Primary action: 開始體驗按鈕
  Scroll behavior: 水平滑動分頁
Bottom Bar: 無
```

### 設計指令

#### 10.1 整體佈局
- frame, fill_container, fill_container height, fill #1A1A1C
  vertical, align center, justify center, gap 40px

#### 10.2 Brand Area
- 居中:
  - Logo 光暈: ellipse 160x160px, fill radial-gradient #C9A96220 → transparent
  - Logo 圖示: ellipse 100x100px, fill linear-gradient 135° #C9A962 → #8B7845
    - coffee icon 48px #1A1A1C
  - 品牌名 "BrewMaster Pro" — Cormorant Garamond 42px normal 400 #F5F5F0
  - 副標 "您的專屬咖啡管家" — Inter 16px normal 400 #6E6E70

#### 10.3 Feature Highlights (居中)
- frame vertical, gap 20px, align center
  - 每項 highlight: frame horizontal, gap 12px, align center
    - dot: ellipse 8x8, fill #C9A962
    - text: Inter 14px normal 400 #F5F5F0
  1. "遠端操控，一鍵沖煮"
  2. "個人化配方，專屬口味"
  3. "AI 智能推薦，發現驚喜"

#### 10.4 Page Indicator
- frame horizontal, gap 8px, center
  - Active: ellipse 8x24 (pill), fill #C9A962, radius 4px
  - Inactive × 3: ellipse 8x8, fill #3A3A3C

#### 10.5 CTA Button
- frame, width fill_container (考慮 padding), height 56px, radius 20px
  fill linear-gradient 135° #C9A962 → #8B7845
  margin horizontal 28px
- "開始體驗" — Inter 16px semibold 600 #1A1A1C, center

---

## 執行順序建議

Pencil 繪製時建議按以下順序，每次 `batch_design` 控制在 25 個 operation 以內：

1. **Pass 1:** 建立所有 Screen Frame（10 個 402x874 的 frame），排列在畫布上
2. **Pass 2-3:** Screen 10 (Onboarding) — 最簡單，用來驗證色彩/字型
3. **Pass 4-6:** Screen 1 (Home) — 核心頁面，元素最多，分 header → brew button → cards 三批
4. **Pass 7-8:** Screen 2 (Drinks) — Grid 佈局
5. **Pass 9-11:** Screen 3 (Drink Detail) — 滑桿較多
6. **Pass 12-13:** Screen 4 (Brew Progress) — 動畫佔位
7. **Pass 14-15:** Screen 5 (Recipes) — 列表式
8. **Pass 16-18:** Screen 6 (Stats) — 圖表較複雜
9. **Pass 19-20:** Screen 7 (Settings) — 分組列表
10. **Pass 21-22:** Screen 8 (Schedule) — 排程卡片
11. **Pass 23-25:** Screen 9 (Achievements) — 徽章 Grid

預估共需 20-25 次 `batch_design` 呼叫。

---

## 注意事項

1. **字型 fallback：** Cormorant Garamond 若不可用，使用 "serif"；Inter 若不可用，使用 "SF Pro"
2. **Icon：** 使用 Lucide icon set（icon_font type, family "lucide"）
3. **所有卡片統一：** radius 20px, fill #242426, border 1px #3A3A3C
4. **所有頁面背景：** #1A1A1C
5. **不使用 shadow：** 僅用 border + color layering 建立層次
6. **warm off-white：** 文字永遠用 #F5F5F0，不用純白 #FFFFFF
