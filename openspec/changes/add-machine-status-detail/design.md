## Context

- 首頁「機器狀態」卡目前只能看到 4 個數值（水箱／豆量／渣盒／除垢），資訊密度有限。
- 設定頁的「咖啡機資訊」Alert 為另一個佔位，但涵蓋的是「型號／序號／韌體」這類 identity 資訊；本頁聚焦於 live state，兩頁完全分開（使用者已於 /explore 階段確認）。
- 既有 `MachineState` 型別已覆蓋 4 個核心指標所需欄位，新增 live 欄位可以以可選（optional）方式擴充，不破壞相容性。
- 資料層本階段維持 mock：透過新增的 `machineStore`（Zustand）集中管理，為未來 IoT 串接預留介面。
- 設計系統既有：Card、ProgressBar、Badge、Pill、SectionHeader 皆可重用，無需新增全站元件。

## Decisions

### 路由命名：`/machine-status`

採用短而明確的路徑，與首頁「機器狀態」區塊名稱一致。

- 不用 `/machine`：過於泛稱，容易與未來「咖啡機資訊（identity）」頁混淆。
- 不用 `/machine/detail`：額外層級無意義，本頁不會有子路由。
- 未來若新增「咖啡機資訊」頁，建議命名 `/machine-info`，語意與本頁並列。

### 四區塊順序：核心 → Live → 維護 → 統計

依「熟悉度」遞減排序：

1. **核心指標** — 首頁已出現，進入時即辨識。
2. **Live 指標** — 新資訊，放第二位獲得最大關注。
3. **維護提醒** — 行動項，放在資訊區塊之後，轉化率較高。
4. **使用統計快照** — 次要資訊，放最後，屬於「有看到就好」。

### 資料層：`machineStore`（Zustand）

雖然本階段只讀 mock，但仍建立 store 的理由：

- 首頁與本頁會共用 machine state，store 可避免 props drilling 與重複 mock 定義。
- 為未來 IoT subscription 串接預留介面（之後只需替換 store 內部 source，consumer 不變）。
- 與既有 `recipeStore`、`scheduleStore`、`userStore` 的架構一致。

### 維護提醒的動作：暫時導回設定頁

維護動作（例如實際觸發清潔）屬於 `/apply` Out of scope。本階段提醒點擊僅 `router.push('/(tabs)/settings')` 讓使用者看到維護中心入口（即便該入口目前仍是 Alert）——避免在本 change 擴張範圍。

## Risks / Open questions

- **Live 指標的 mock 數值合理性**：溫度應在 90-96℃（espresso 萃取範圍），壓力應在 8-10 bar；偏離此範圍的假資料會讓設計顯得不專業。建議在 store 初始值或 Pencil 設計中採用接近真實的數值。
- **統計快照的資料來源**：目前 `statsStore` 尚未建立。若本階段全用 mock，未來 stats 頁完成時需要回頭統一資料源，可能產生 rework。可接受——本頁本階段獨立 mock 即可。
- **頁面進入動畫**：首頁 card 點擊用 scale press feedback，進入 detail 後是否需要額外的過場？目前計畫沿用 Expo Router 預設 slide 過場，設計稿中不特別標示——若 /apply 階段覺得體驗不夠，再討論。
- **返回後捲動位置保留**：Expo Router 預設應可處理，但首頁 `ScrollView` 若未特別配置 `keepScrollOffset`，需實測確認。列入 tasks.md §6.2 驗證。
