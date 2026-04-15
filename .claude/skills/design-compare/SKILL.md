---
name: design-compare
description: >-
  比對 Pencil (.pen) 設計稿與 App 實際頁面的結構化屬性差異。透過 DOM computed styles 與設計節點屬性的直接比對，
  產出可直接修復的差異報告（如 fontSize 設計 18px → 實際 16px）。自動掃描路由並用 AskUserQuestion 詢問使用者要比對哪個頁面，
  檢查 port 8081 是否運行（未運行則自動 npm start），用 Puppeteer 擷取 DOM 結構與 computed styles，
  與設計稿屬性比對後在終端輸出結構化差異報告，Chrome 保持開啟供手動確認。
  使用時機：(1) 比對設計稿與實際頁面 (2) 檢查 UI 是否符合設計 (3) 視覺回歸測試。
  觸發關鍵詞：compare、比對、對照、設計差異、檢查設計、design compare、visual diff、看差異、比較設計、設計比對、頁面檢查。
---

# Design Compare

透過 DOM 結構化屬性與 Pencil 設計稿節點屬性的直接比對，產出可立即修復的差異報告。

## 前置需求

首次使用需安裝依賴：

```bash
npm install --save-dev puppeteer-core
```

建立暫存目錄並加入 `.gitignore`：

```bash
mkdir -p .design-compare
grep -q ".design-compare" .gitignore 2>/dev/null || echo ".design-compare/" >> .gitignore
```

## 工作流程

### 1. 選擇比對頁面

1. 用 Glob 掃描 `app/` 下所有 `.tsx` 路由檔案（排除 `_layout.tsx`）
2. 依 Expo Router 慣例轉換為 URL 路徑：
   - `app/(tabs)/index.tsx` → `/`
   - `app/(tabs)/drinks.tsx` → `/drinks`
   - `app/onboarding.tsx` → `/onboarding`
   - `app/drink/[id].tsx` → `/drink/:id`（動態路由需詢問具體 id）
3. 用 AskUserQuestion 列出掃描到的路由供使用者選擇，同時允許手動輸入自訂路徑

### 2. 確保 Dev Server 運行

檢查 port 8081：

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 2>/dev/null
```

若未運行，在背景啟動並等待就緒：

```bash
cd <project-root> && npm start &
```

用 Monitor 工具搭配 `until curl -s http://localhost:8081 > /dev/null 2>&1; do sleep 2; done` 等待 server 回應。

### 3. 擷取 App 頁面 DOM 結構

在背景執行 inspect script（Chrome 會持續開啟供使用者查看）：

```bash
node "<SKILL_DIR>/scripts/inspect.mjs" "http://localhost:8081<route>" ".design-compare/elements.json" &
```

`<SKILL_DIR>` = 此 SKILL.md 所在目錄的絕對路徑。

等待 `.design-compare/elements.json` 產生後，用 Read 讀取 JSON 內容。

輸出格式為節點樹，每個節點包含：
- `tag`（非 div 時才顯示）、`testId`、`role`、`ariaLabel`
- `text` — 元素的直接文字內容
- `rect` — 位置與尺寸 `{ x, y, w, h }`
- `styles` — 非預設的 computed styles（已自動簡化，如統一的 padding 會合併）

### 4. 讀取設計稿屬性

1. `mcp__pencil__get_editor_state` — 確認 .pen 檔案狀態
2. 若未開啟，用 Glob 搜尋 `*.pen` 並用 `mcp__pencil__open_document` 開啟
3. `mcp__pencil__batch_get` — 搜尋對應頁面的設計節點（`readDepth: 3`, `resolveVariables: true`），取得節點樹結構與屬性
4. `mcp__pencil__search_all_unique_properties` — 以頁面根節點 ID 為 parent，查詢以下設計 tokens：
   - `fillColor`, `textColor`, `strokeColor`
   - `fontSize`, `fontFamily`, `fontWeight`
   - `cornerRadius`, `padding`, `gap`
   - `strokeThickness`

### 5. 結構化比對分析

將設計節點與 DOM 元素配對，配對策略（依優先順序）：

1. **文字內容匹配** — 相同文字內容的節點直接配對
2. **位置與尺寸匹配** — rect 位置相近的節點配對
3. **結構順序匹配** — 同層級子節點按順序配對

逐對比較以下屬性，產出差異報告：

| 設計屬性 | DOM computed style | 注意事項 |
|----------|-------------------|----------|
| `textColor` | `color` | 統一為 rgb 格式比較 |
| `fillColor` | `backgroundColor` | 統一為 rgb 格式比較 |
| `fontSize` | `fontSize` | 直接比較 px 值 |
| `fontFamily` | `fontFamily` | 只比較主要字型名稱 |
| `fontWeight` | `fontWeight` | 設計可能用名稱（Bold），轉為數值比較 |
| `cornerRadius` | `borderRadius` | 直接比較 px 值 |
| `padding` | `padding*` | 比較各方向 |
| `gap` | `gap` | 直接比較 |
| `strokeColor` | `borderColor` | 統一為 rgb 格式 |
| `strokeThickness` | `borderWidth` | 直接比較 px 值 |
| 節點 width/height | `rect.w` / `rect.h` | 允許 ±2px 誤差 |

**色彩正規化**：hex `#6F4E37` → `rgb(111, 78, 55)`，比較前統一轉換。

**報告格式**：

```
=== Design Compare Report ===
頁面: /drinks

[DIFF] 標題 "今日推薦"
  fontSize:  設計 18px → 實際 16px
  fontWeight: 設計 700 → 實際 400
  color:     設計 rgb(26,26,26) → 實際 rgb(51,51,51)

[DIFF] 卡片容器
  borderRadius: 設計 16px → 實際 12px
  padding:      設計 16px → 實際 12px

[MATCH] CTA 按鈕 "立即點餐"
  backgroundColor, fontSize, fontWeight, borderRadius — 全部一致 ✓

[MISSING] 底部分隔線
  設計中有 1px strokeColor rgb(229,229,229) 的分隔線，DOM 中未找到對應元素

=== 摘要 ===
比對元素: 12
一致: 8 | 有差異: 3 | 缺失: 1
```

### 6. 手動確認

Chrome 已在步驟 3 開啟並保持運行，提醒使用者：
- 按 F12 開啟 DevTools 進一步檢查元素
- 可在 Elements panel 直接修改樣式測試修正效果

## Scripts

| Script | 功能 | 依賴 |
|--------|------|------|
| `scripts/inspect.mjs` | 用 puppeteer-core 擷取 DOM 結構與 computed styles，輸出 JSON | `puppeteer-core` |
