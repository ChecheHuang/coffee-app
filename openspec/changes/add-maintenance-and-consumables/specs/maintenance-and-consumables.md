## ADDED Requirements

### Requirement: Maintenance Center page structure
`/maintenance` 頁面 SHALL 作為所有保養動作的執行入口。

#### Scenario: Page header
- **WHEN** 使用者進入 `/maintenance`
- **THEN** 系統 SHALL 顯示標題「維護中心」與左上返回按鈕
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`

#### Scenario: Recommended action highlight
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 於頂部顯示「建議動作」highlight 區塊（顯示當前 `isRecommended: true` 的動作，最多 1 項）
- **AND** 若無建議動作，SHALL 顯示「機器狀態良好，目前無建議維護」
- **AND** highlight 區塊 SHALL 使用 gold accent 強調

#### Scenario: Action card list
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示四張動作卡：引導式清潔、沖洗循環、除垢程序、反沖洗
- **AND** 每張卡 SHALL 包含：icon、標題、描述（一行）、建議頻率（例：「每週一次」）、上次執行時間（例：「3 天前」或「尚未執行」）、預估時長（例：「約 5 分鐘」）

#### Scenario: Execute maintenance action
- **WHEN** 使用者點擊任一動作卡
- **THEN** 系統 SHALL 顯示二次確認 Alert「確定執行 [動作名稱] 嗎？」含「取消 / 執行」兩個選項
- **AND** 點擊「執行」SHALL 顯示 mock 進度 Toast「[動作名稱] 執行中…」
- **AND** mock 完成後 SHALL 顯示 Toast「[動作名稱] 已完成」
- **AND** 對應動作的 `lastExecuted` 時間戳 SHALL 更新為當下時間

### Requirement: Consumables page structure
`/consumables` 頁面 SHALL 提供四類耗材的即時狀態與歷史紀錄檢視。

#### Scenario: Page header
- **WHEN** 使用者進入 `/consumables`
- **THEN** 系統 SHALL 顯示標題「耗材紀錄」與左上返回按鈕

#### Scenario: Current status block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示四張耗材狀態卡：咖啡豆、濾芯、除垢劑、水箱濾水器
- **AND** 每張卡 SHALL 包含：icon、類別名、剩餘量%（或剩餘杯數）、進度條、估計換期（例：「約 5 天後更換」）、上次更換日（例：「3/15 更換」）
- **AND** 剩餘量 <20% SHALL 以 warning 色顯示，<10% SHALL 以 error 色顯示

#### Scenario: Usage history list
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 於狀態區塊下方顯示「更換紀錄」區段標題與時間倒序的歷史列表
- **AND** 每條紀錄 SHALL 包含：類別 icon、動作類型（更換/補充/保養）、日期（例：「2026-04-10」）、選填備註
- **AND** 列表 SHALL 至少展示最近 20 條，並可捲動

#### Scenario: Empty history
- **WHEN** 沒有任何歷史紀錄
- **THEN** 系統 SHALL 顯示「尚無更換紀錄」空狀態

### Requirement: Maintenance and Consumables data model
系統 SHALL 提供對應型別與 Zustand store。

#### Scenario: Maintenance types
- **WHEN** 定義維護相關型別
- **THEN** 系統 SHALL 在 `src/types/maintenance.ts` 定義：
  - `MaintenanceActionId = "guided_clean" | "rinse" | "descale" | "backflush"`
  - `MaintenanceAction`：id、title、description、iconName、recommendedFrequencyDays、estimatedMinutes、lastExecuted?、isRecommended

#### Scenario: Consumables types
- **WHEN** 定義耗材相關型別
- **THEN** 系統 SHALL 在 `src/types/consumable.ts` 定義：
  - `ConsumableType = "beans" | "filter" | "descaler" | "water_filter"`
  - `ConsumableStatus`：type、levelPercent、estimatedNextReplace?、lastReplaced?
  - `ConsumableRecord`：id、type、action（"replaced" | "refilled" | "serviced"）、timestamp、note?

#### Scenario: Stores API
- **WHEN** 新增對應 store
- **THEN** 系統 SHALL 在 `src/stores/maintenanceStore.ts` 提供：
  - `actions: readonly MaintenanceAction[]`（初始 mock 4 項）
  - `executeAction(id: MaintenanceActionId): void`（更新 lastExecuted）
- **AND** 系統 SHALL 在 `src/stores/consumableStore.ts` 提供：
  - `statuses: readonly ConsumableStatus[]`（初始 mock 4 項，含不同剩餘量）
  - `history: readonly ConsumableRecord[]`（初始 mock >=5 條）
