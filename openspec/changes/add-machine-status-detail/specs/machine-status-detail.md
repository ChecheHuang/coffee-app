## ADDED Requirements

### Requirement: Machine Status Detail page structure
`/machine-status` 頁面 SHALL 提供完整的咖啡機即時狀態概覽，作為首頁機器狀態卡的延伸檢視。

#### Scenario: Page header
- **WHEN** 使用者進入 `/machine-status`
- **THEN** 系統 SHALL 顯示頁面標題「機器狀態」與左上返回按鈕（back chevron）
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`

#### Scenario: Core metrics block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示四個核心指標卡：水箱、咖啡豆、渣盒、除垢
- **AND** 每張卡 SHALL 包含：圖示、標題、主要數值（百分比或計數）、次要說明（例：「剩 XX 杯」或「XX 天後建議」）、進度條
- **AND** 低水量（<20%）或低豆量（<20%）SHALL 以 warning 色顯示
- **AND** 除垢狀態為 `overdue` SHALL 以 error 色顯示，`needed` SHALL 以 warning 色顯示，`ok` SHALL 以 success 色顯示

#### Scenario: Live metrics block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示 Live 指標區塊：沖煮頭溫度、萃取壓力、乾燥組狀態
- **AND** 每個指標 SHALL 顯示當前數值與單位（℃、bar、狀態文字）
- **AND** 本階段使用 mock 資料（機器未連線時顯示 `—`）

#### Scenario: Maintenance reminders block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示維護提醒區塊，列出下一次除垢倒數與清潔建議
- **AND** 每條提醒 SHALL 包含文字描述、狀態 pill（例：「7 天後」／「建議執行」）
- **AND** 點擊提醒 SHALL 導航至設定頁的維護相關列（暫時可 `router.push('/(tabs)/settings')`）

#### Scenario: Usage stats snapshot block
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示三個統計：今日沖煮次數、本週沖煮次數、總運轉時數
- **AND** 使用 mock 資料即可，無需連動 statsStore

### Requirement: Machine Status Detail data source
`/machine-status` 頁面 SHALL 透過既有 `MachineState` 型別與未來的 `machineStore` 取得資料。

#### Scenario: Data fields available
- **WHEN** 實作讀取資料
- **THEN** 系統 SHALL 使用 `src/types/machine.ts` 的 `MachineState` 既有欄位（waterLevel, beanLevel, wasteCount, wasteCapacity, descaleStatus, isConnected, firmwareVersion）
- **AND** 新增的 live 欄位（brewHeadTemp, extractionPressure, dryerStatus）SHALL 以可選欄位加入 `MachineState` 型別

### Requirement: Home to Machine Status navigation
Home 頁面機器狀態卡 SHALL 於點擊時導航至 `/machine-status`。

#### Scenario: Navigate from home
- **WHEN** 使用者點擊首頁機器狀態卡
- **THEN** 系統 SHALL 呼叫 `router.push('/machine-status')` 並保留現有 scale press feedback

#### Scenario: Back from detail page
- **WHEN** 使用者於 `/machine-status` 點擊返回或執行系統返回手勢
- **THEN** 系統 SHALL 回到首頁並保留首頁捲動位置
