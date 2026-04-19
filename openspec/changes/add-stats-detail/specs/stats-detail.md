## ADDED Requirements

### Requirement: Stats Detail page structure
`/stats/[category]` 頁面 SHALL 提供單一 template 承載三個類別的統計 drill-down。

#### Scenario: Page header
- **WHEN** 使用者進入 `/stats/[category]`
- **THEN** 系統 SHALL 顯示左上返回按鈕與類別中文標題（例：「本週沖煮」、「咖啡因攝取」、「最愛飲品」）
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`

#### Scenario: Hero block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示 Hero 區塊：主要數值（大字）+ 單位 + 同比／環比描述
- **AND** 主要數值 SHALL 使用 `font-display-light` 接近 48-56px

#### Scenario: Period selector
- **WHEN** 頁面載入且該類別支援期間切換
- **THEN** 系統 SHALL 顯示三段 Pill 切換（如「週 / 月 / 年」），預設選中第一段
- **AND** 切換 SHALL 更新 Hero 數值與 Chart 資料

#### Scenario: Main chart
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 根據類別顯示對應 chart：
  - weekly：bar chart（7 或 30 日）
  - caffeine：timeline chart（時間軸 + 攝取點）
  - favorite：pie chart（前 5 項 + 其他）

#### Scenario: Breakdown list
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 於 chart 下方顯示明細列表
- **AND** weekly：顯示當期每次沖煮紀錄（時間 + 飲品 + 評分）
- **AND** caffeine：顯示每杯咖啡的咖啡因含量
- **AND** favorite：顯示所有飲品排行（飲品名 + 杯數 + 佔比）

#### Scenario: Insight card
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 於 breakdown 下方顯示一行 insight 卡片（gold accent 邊框或 icon）
- **AND** insight 內容 SHALL 根據當前類別與期間動態產生（本階段可使用 mock 字串，依 period + category 組合查表）

#### Scenario: Invalid category
- **WHEN** 使用者進入 `/stats/[category]` 但 category 不在有效清單內
- **THEN** 系統 SHALL 顯示空狀態「找不到此統計類別」與返回按鈕

### Requirement: Stats Detail data and routing
系統 SHALL 提供類別 config 與資料來源，支援單一 template 驅動多類別。

#### Scenario: Category config
- **WHEN** 定義類別 config
- **THEN** 系統 SHALL 在 `src/constants/statsCategories.ts` 匯出 `STATS_CATEGORIES`，含：
  - `id: "weekly" | "caffeine" | "favorite"`
  - `title: string`（中文標題）
  - `unit: string`
  - `periods: readonly Period[]`（例：["week", "month", "year"]）
  - `chartType: "bar" | "timeline" | "pie"`
- **AND** `id` 對應路由參數

#### Scenario: Mock data hook
- **WHEN** 本階段無真實 statsStore
- **THEN** 系統 SHALL 在 `src/hooks/useStatsDetail.ts` 提供 `useStatsDetail(category, period)` 回傳：
  - `hero: { value, unit, comparison }`
  - `chart: unknown`（視 chartType 結構）
  - `breakdown: readonly BreakdownItem[]`
  - `insight: string`
- **AND** 回傳值以 mock 資料驅動，未來切換為 statsStore 時 hook 介面不變

### Requirement: Stats to Stats Detail navigation
Stats 頁的三張 Quick Stat Card 點擊 SHALL 導航至對應 `/stats/[category]`。

#### Scenario: Navigate from Quick Stat Card
- **WHEN** 使用者點擊 Stats 頁任一 Quick Stat Card
- **THEN** 系統 SHALL 呼叫 `router.push('/stats/weekly')`、`/stats/caffeine`、或 `/stats/favorite`，對應卡片類別
- **AND** 保留現有 scale press feedback

#### Scenario: Return preserves state
- **WHEN** 使用者從 `/stats/[category]` 返回
- **THEN** 系統 SHALL 回到 Stats 頁並保留捲動位置
