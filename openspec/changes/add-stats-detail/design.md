## Context

- Stats 頁有三個 Quick Stat Card（本週 / 咖啡因 / 最愛），目前點擊全是 Alert「XX 的詳細資訊即將推出」。
- 使用者於 /explore 階段已確認採用「單一 template + 類別參數」而非三個獨立頁，避免程式碼與設計稿重複。
- Stats 頁已有 bar chart 與 pie chart 實作（bar 寫在 `stats.tsx` inline，pie 在 `PieChart` 元件）。Detail 頁可重用這些元件的放大版或重構為共用元件。
- 專案尚未建立 `statsStore`，本階段全用 mock，後續 stats 真實資料串接時 hook 介面不變。

## Decisions

### 路由：`/stats/[category]` 動態路由

- Expo Router 的 `app/stats/[category].tsx` 直接支援。
- 進入方式：`router.push('/stats/weekly')` 等，參數透過 `useLocalSearchParams()` 讀取。
- `[category]` 資料夾方便未來增加 `/stats/[category]/compare` 這類子路由。

### Category 由 config 驅動而非 hardcode 的 switch

建立 `STATS_CATEGORIES` 常數陣列，包含每類的 metadata（title、unit、periods、chartType）。頁面 render 時：

```ts
const config = STATS_CATEGORIES.find(c => c.id === category);
if (!config) return <EmptyState />;
```

理由：未來加第四類只需要在 config 追加一項、寫對應的 chart 子元件、在 hook 補 mock 資料——不需動 route 或共用模板。

### Chart 子元件：三個獨立元件而非通用 ChartRenderer

- `WeeklyBarChart`、`CaffeineTimeline`、`FavoritePieChart` 各自實作，頁面根據 `chartType` switch render。
- 避免「統一 chart 介面」的過度抽象——三類別的資料結構差異大（bar 要 7 點、timeline 要帶時間戳、pie 要百分比），硬統一介面反而難讀。
- 未來若新增類別且 chart 相似，再抽象也不遲。

### Hook `useStatsDetail` 介面的未來相容性

```ts
function useStatsDetail(
  category: StatsCategoryId,
  period: Period,
): { hero, chart, breakdown, insight }
```

目前回傳 mock。未來：
- 替換為 `useStatsStore(s => s.getDetail(category, period))`
- Hook 簽名不變 → consumer 不變
- Mock 實作留在 hook 內部，以 `if (__DEV__ && !store.hasData) return mockData` 這類 guard 可平滑過渡

### Period selector 三段 pill

- 選項固定為 3 段，UI 穩定（不會因類別變動而晃動）。
- 三段內容依類別不同：
  - weekly：週 / 月 / 年
  - caffeine：今日 / 本週 / 本月
  - favorite：近 30 天 / 近 90 天 / 全部
- `STATS_CATEGORIES` 中 `periods` 欄位列出該類別的 3 段 label + id。

### Stats 頁的 Quick Stat Card 傳 category id

目前 `QuickStatCard` 接受 `value`、`label`、`gold` 等 props。需要追加 `categoryId: StatsCategoryId`。三張卡在 `stats.tsx` 中 hardcode 傳值：

```tsx
<QuickStatCard categoryId="weekly" ... />
<QuickStatCard categoryId="caffeine" ... />
<QuickStatCard categoryId="favorite" ... />
```

onPress 從 Alert 改為 `router.push(`/stats/${categoryId}`)`。

## Risks / Open questions

- **Caffeine timeline chart 無既有實作**：需從零畫。若 SVG 實作太花時間，可退而用 bar chart 版本（每小時一根 bar）先過，之後再升級。
- **Insight 文字 mock 的合理性**：單一 mock 字串會讓 UI 呆板。建議在 hook 中依 `category × period × period-slice` 查一張字串表，讓不同切換有不同文字。表格可放在 `src/constants/statsInsights.ts`。
- **Pie chart 重用 vs 重寫**：Stats 頁既有 PieChart 元件接受 `data` 與 `size`。Detail 頁直接重用即可；若要「hover 切片時顯示百分比」這種進階互動，再考慮重構。本階段沿用。
- **空 breakdown 狀態**：favorite 的 breakdown 若只有一種飲品會顯得單調。mock 時至少包含 4-5 種飲品。
- **同一路由的 ScrollView 行為**：回到 `/stats` 後保留捲動位置是 Expo Router 預設行為，但 Quick Stat Card 點擊進入 dynamic route 再返回時偶爾會 reset——/apply 階段實測並記錄。
