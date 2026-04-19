---
name: add-stats-detail
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Stats, StatsDetail]
affected_components: []
---

## Why

統計頁三張 Quick Stat Card（本週、咖啡因、最愛）點擊目前僅 Alert「XX 的詳細資訊即將推出」。使用者看到概覽數字後自然想「點進去看更多」——這是資訊架構的常見 drill-down 模式，目前被佔位阻斷。

採用單一 template + 類別參數（`/stats/[category]`）實作，三類 drill-down 共用同一 template：

- 新增類別不用新 route，資料驅動
- 共用 header、期間切換、chart 容器等 UI pattern
- 降低設計稿工作量（畫一版 template + 各類內容區塊）

## What

新增 `/stats/[category]` 動態路由頁，統一 template 包含：

1. **Header**：back 按鈕 + 類別名稱（例：「本週沖煮」）
2. **Hero 區**：巨大主要數值 + 單位 + 同比／環比（例：「18 杯，比上週多 3」）
3. **期間切換**：週 / 月 / 年 三態 pill（部分類別用，不一定全有）
4. **主視覺化**：該類別的主要 chart（bar / pie / timeline）
5. **明細清單**：該類別的 breakdown（例：本週每天沖了什麼）
6. **洞察卡**（可選）：一行 insight 文字（例：「你週四最常沖 Latte」）

三個類別：

### `weekly`（本週沖煮）
- Hero：18 杯 / 比上週多 3 杯
- 期間切換：週 / 月 / 年
- Chart：bar chart（Stats 頁既有，放大版）
- 明細：每天的沖煮紀錄（時間 + 飲品 + 評分）
- Insight：「你週四最活躍」等

### `caffeine`（咖啡因攝取）
- Hero：234 mg / 今日
- 期間切換：今日 / 本週 / 本月
- Chart：timeline（時間軸 + 每次攝取點）
- 明細：每杯咖啡的咖啡因含量
- Insight：「WHO 建議每日上限 400mg，你目前 234mg」

### `favorite`（最愛飲品）
- Hero：Latte（佔 45%）
- 期間切換：近 30 天 / 近 90 天 / 全部
- Chart：pie chart（Stats 頁既有，放大版 + 更細分類）
- 明細：所有曾沖過飲品的排行與杯數
- Insight：「Latte 近 30 天排名上升 2 位」

Stats 頁三張 Quick Stat Card 點擊行為：`Alert.alert(...)` → `router.push('/stats/weekly' | '/stats/caffeine' | '/stats/favorite')`。

## Out of scope

- 使用者自訂期間範圍（date picker） — 固定三段 pill 即可
- 匯出統計資料（CSV / PDF） — 商務功能，另案
- 比較兩段期間（例：本週 vs 上週並列） — UI 複雜度跳級，另案
- Stats 頁的 Weekly Chart 卡點擊（目前不是 Alert，是純視覺）— 不在本 change 範圍
- 成就 / 徽章區塊（已導航到 `/achievements`，不變）
- 真實資料來源 — 本階段全 mock，未來 `statsStore` 建立時另案串接
