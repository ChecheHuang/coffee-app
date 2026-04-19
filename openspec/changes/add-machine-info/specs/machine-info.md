## ADDED Requirements

### Requirement: Machine Info page structure
`/machine-info` 頁面 SHALL 提供咖啡機 identity 資訊的集中檢視。

#### Scenario: Page header
- **WHEN** 使用者進入 `/machine-info`
- **THEN** 系統 SHALL 顯示左上返回按鈕與標題「咖啡機資訊」
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`

#### Scenario: Hero illustration
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 於頁首顯示機器 illustration 或 icon + 型號名稱（例：「BrewMaster Pro X1」）

#### Scenario: Basic info section
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示「基本資訊」區塊，包含三條：
  - 型號
  - 序號（可複製到剪貼簿）
  - 購買日期（格式：「2025-08-15」）

#### Scenario: Connection status section
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示「連線狀態」區塊，包含：
  - 連線類型（BLE / WiFi / 未連線）
  - 連線圖示（對應 icon + 狀態點 success/warning/error）
- **AND** 未連線時 SHALL 顯示 `—` 或「未連線」文字

#### Scenario: Firmware section
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示「韌體」區塊，包含：
  - 當前版本號（例：「v2.3.1」）
  - 若 `isLatestFirmware` 為 true，顯示綠色「最新版 ✓」pill
  - 若為 false，顯示 warning pill「可更新」
  - 「檢查更新」按鈕
- **AND** 點擊「檢查更新」SHALL 顯示 mock 進度（Toast「檢查中…」→ Toast「已是最新版本」或「發現新版本 v2.3.2」）

#### Scenario: Warranty section
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示「保固」區塊，包含：
  - 保固到期日
  - 狀態 pill：「有效」（success 色）或「已過期」（warning 色）

#### Scenario: Copy serial number
- **WHEN** 使用者長按或點擊序號列的複製圖示
- **THEN** 系統 SHALL 將序號複製到剪貼簿
- **AND** 顯示 Toast「序號已複製」

### Requirement: Machine Info data model
系統 SHALL 於既有 `MachineState` 型別擴充 identity 欄位。

#### Scenario: Extended fields
- **WHEN** 擴充 `src/types/machine.ts`
- **THEN** 系統 SHALL 新增欄位：
  - `model: string`（例：「BrewMaster Pro X1」）
  - `serialNumber: string`
  - `purchaseDate: number`（ms epoch）
  - `warrantyEndDate: number`（ms epoch）
- **AND** 欄位 SHALL 為 readonly

#### Scenario: Store mock
- **WHEN** 新增或擴充 `machineStore`
- **THEN** store SHALL 提供上述欄位的合理 mock 值（購買日期約一年前，保固期內）
