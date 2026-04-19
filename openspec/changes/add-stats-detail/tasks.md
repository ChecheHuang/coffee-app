## Implementation

### 1. 型別與資料

- [ ] 1.1 新增 `src/types/stats.ts`：`StatsCategoryId = "weekly" | "caffeine" | "favorite"`、`Period`、`BreakdownItem`、`StatsDetailData`
- [ ] 1.2 新增 `src/constants/statsCategories.ts`：`STATS_CATEGORIES` config 陣列，含 id、title、unit、periods、chartType
- [ ] 1.3 新增 `src/hooks/useStatsDetail.ts`：`useStatsDetail(category, period)` 回傳 mock 資料；每類別 × 每期間至少一組 mock
- [ ] 1.4 `src/types/index.ts` 匯出新型別

### 2. PRD 同步

- [ ] 2.1 `PRD.md` §5 新增 §5.19「統計詳情 (Stats Detail)」：template 結構 + 三類別各自內容 + 類別 config
- [ ] 2.2 `PRD.md` §5.6 統計頁 Quick Stat Card 互動段補上「點擊 → `/stats/[category]`」
- [ ] 2.3 更新 PRD Alert 清單，移除「XX 的詳細資訊即將推出」

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 新增 StatsDetail template 主畫面節點：header + hero + period selector + chart 容器 + breakdown + insight
- [ ] 3.2 三類別各自的 chart 變體（bar / timeline / pie 放大版）
- [ ] 3.3 三類別的 breakdown list 變體（row 結構各異）
- [ ] 3.4 Insight 卡樣式（gold accent）
- [ ] 3.5 更新 `DESIGN-PROMPT.md` 加入此 template 速查

### 4. 路由與頁面 [DESIGN]

- [ ] 4.1 新增 `app/stats/[category].tsx`：讀取 `useLocalSearchParams` 取 category、驗證有效性、根據 category 切換 chart 與 breakdown 組件
- [ ] 4.2 Header（back + 類別標題）
- [ ] 4.3 Hero 區塊（數值 + 單位 + comparison）
- [ ] 4.4 Period selector Pill（使用既有 Pill 樣式）
- [ ] 4.5 Chart 子元件：`WeeklyBarChart`、`CaffeineTimeline`、`FavoritePieChart`（pie 可重用 stats 頁既有 PieChart）
- [ ] 4.6 Breakdown list 子元件（三類別各自的 row 結構）
- [ ] 4.7 Insight card
- [ ] 4.8 無效 category 的空狀態
- [ ] 4.9 `app/(tabs)/stats.tsx` QuickStatCard onPress 從 `Alert.alert` 改為 `router.push('/stats/${categoryId}')`；三張卡各帶 id
- [ ] 4.10 若 stats 頁不再使用 Alert 則移除 import

### 5. SYNC-STATUS 更新

- [ ] 5.1 新增 Pages 列：`stats/[category] | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.19](PRD.md) | app/stats/[category].tsx 單一 template` 
- [ ] 5.2 更新 Stats 列備註（移除「Alert XX 即將推出」的佔位描述）
- [ ] 5.3 更新頂部 Last update 時間戳

### 6. 驗證（Run-and-Verify）

- [ ] 6.1 Chrome mobile MCP：Stats 頁三張 QuickStat 卡各自進入對應 detail 頁
- [ ] 6.2 三類別 chart 正確顯示對應類型
- [ ] 6.3 Period selector 切換可變更 Hero + Chart 內容
- [ ] 6.4 無效 category（例：手動 `/stats/foo`）顯示空狀態
- [ ] 6.5 返回 Stats 頁保留捲動位置
