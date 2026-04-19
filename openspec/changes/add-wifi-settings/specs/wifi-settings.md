## ADDED Requirements

### Requirement: WiFi Settings page structure
`/wifi` 頁面 SHALL 提供完整的 WiFi 設定流程 mock。

#### Scenario: Page header
- **WHEN** 使用者進入 `/wifi`
- **THEN** 系統 SHALL 顯示左上返回按鈕、標題「WiFi 設定」、右上 refresh icon
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`
- **AND** refresh icon 點擊 SHALL 觸發 `wifiStore.scan()`

#### Scenario: Current connection card
- **WHEN** 頁面載入且 store 狀態為 `connected`
- **THEN** 系統 SHALL 顯示「目前連線」卡片，包含：
  - WiFi icon + SSID
  - 訊號強度條（1-4 格）
  - IP 位址
  - 連線時間（例：「已連線 3 小時」）
  - 「斷開連線」按鈕（secondary style）
- **AND** 「斷開連線」點擊 SHALL 呼叫 `wifiStore.disconnect()` 並隱藏此卡

#### Scenario: Scanning animation
- **WHEN** 頁面載入且 store 狀態為 `scanning`
- **THEN** 系統 SHALL 顯示 3-4 行 skeleton rows 帶 pulse 動畫（opacity 來回 0.4-0.8）
- **AND** 顯示「掃描中…」section header
- **AND** 約 2 秒後 store 切換為 `idle`，顯示網路列表

#### Scenario: Available networks list
- **WHEN** 頁面載入且 store 狀態為 `idle` 或 `connected`
- **THEN** 系統 SHALL 顯示「可用網路」區塊，列出 `wifiStore.availableNetworks`
- **AND** 列表 SHALL 按訊號強度降冪排序
- **AND** 每行 SHALL 包含：SSID、訊號 icon（4 格中填色數對應強度）、鎖頭 icon（若 `secured: true`）、頻段標籤（「2.4G」或「5G」）
- **AND** 目前連線的 SSID 若出現在列表中，SHALL 以 gold accent 標記並於右側顯示「✓ 已連線」

#### Scenario: Tap secured network
- **WHEN** 使用者點擊 `secured: true` 的網路
- **THEN** 系統 SHALL 彈出密碼輸入 bottom sheet

#### Scenario: Tap open network
- **WHEN** 使用者點擊 `secured: false` 的網路
- **THEN** 系統 SHALL 呼叫 `wifiStore.connect(ssid)` 直接進入連線流程（無密碼 sheet）

### Requirement: Password bottom sheet
點擊需密碼網路時 SHALL 從底部滑出 bottom sheet 收集密碼並處理連線流程。

#### Scenario: Sheet initial state
- **WHEN** bottom sheet 彈出
- **THEN** 系統 SHALL 顯示：
  - 頂部 drag handle
  - 標題「連線至 [SSID]」
  - 密碼 TextInput（`secureTextEntry` 預設開啟，placeholder「輸入密碼」）
  - 顯示密碼 toggle（eye / eye-off icon，切換 secureTextEntry）
  - 「取消」（ghost）與「連線」（primary）按鈕
- **AND** 「連線」按鈕 SHALL disable 直到密碼長度 >=8 個字元

#### Scenario: Submit password
- **WHEN** 使用者填寫密碼並點擊「連線」
- **THEN** 系統 SHALL 呼叫 `wifiStore.connect(ssid, password)`
- **AND** sheet 內容 SHALL 切換為：spinner + 文字「連線至 [SSID]…」
- **AND** 取消按鈕 SHALL 變為「關閉」，連線按鈕隱藏

#### Scenario: Connection success
- **WHEN** mock 連線成功（約 1.5 秒後）
- **THEN** 系統 SHALL 關閉 bottom sheet
- **AND** 更新 store：`status: connected`、`currentNetwork: { ssid, ... }`
- **AND** 頁面 SHALL 重新 render 顯示更新後的「目前連線」卡
- **AND** 顯示 Toast「已連線至 [SSID]」

#### Scenario: Connection failure
- **WHEN** mock 連線失敗（本階段以 50% 機率或固定密碼錯誤觸發）
- **THEN** 系統 SHALL 於 sheet 內顯示 error 文字「密碼錯誤或連線失敗」（error 色）
- **AND** sheet 內容還原至初始狀態（可重新輸入）

#### Scenario: Cancel from sheet
- **WHEN** 使用者點擊「取消」或向下滑動 sheet
- **THEN** 系統 SHALL 關閉 sheet 不觸發連線

### Requirement: WiFi data model and store
系統 SHALL 提供 `WifiNetwork` 型別與 `wifiStore`。

#### Scenario: Type definition
- **WHEN** 定義 WiFi 型別
- **THEN** 系統 SHALL 在 `src/types/wifi.ts` 匯出：
  - `WifiNetwork`：ssid、signalStrength (1|2|3|4)、secured、frequency ("2.4GHz"|"5GHz")
  - `WifiStatus = "idle" | "scanning" | "connecting" | "connected" | "failed"`

#### Scenario: Store API
- **WHEN** 新增 wifiStore
- **THEN** 系統 SHALL 在 `src/stores/wifiStore.ts` 提供：
  - `status: WifiStatus`
  - `currentNetwork: WifiNetwork | null`
  - `availableNetworks: readonly WifiNetwork[]`
  - `ipAddress: string | null`
  - `scan(): void`（將 status 設為 scanning，2 秒後填充 availableNetworks 並改為 idle）
  - `connect(ssid: string, password?: string): Promise<boolean>`（status → connecting → 1.5 秒後 → connected 或 failed）
  - `disconnect(): void`
- **AND** 初始 mock：已連線 1 個網路（家中 WiFi）、可用網路 >=6 個（含 open 與 secured 混合）
