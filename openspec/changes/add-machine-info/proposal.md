---
name: add-machine-info
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Settings, MachineInfo]
affected_components: []
---

## Why

設定頁「咖啡機」區塊有兩列是 Alert 佔位：

- **咖啡機資訊**：Alert「咖啡機詳細資訊即將推出」
- **韌體更新**：Alert「已是最新版本」（功能性但散落）

咖啡機的 identity 資訊（型號、序號、韌體、購買日）應該集中在一頁，方便：
- 報修時快速找到序號
- 一眼看到保固狀態
- 集中韌體檢查/更新入口

本 change 把兩者合併為 `/machine-info` 頁，設定頁移除「韌體更新」列，保留「咖啡機資訊」列改為導航。

## What

新增 `/machine-info` 頁，包含：

1. **機器大圖／illustration**：頁首視覺
2. **基本資訊**：型號、序號、購買日期
3. **連線狀態**：連線類型（BLE / WiFi / 未連線）、訊號強度
4. **韌體版本**：當前版本 + 「檢查更新」按鈕
5. **保固**：保固到期日、保固狀態（有效／已過期）
6. **法規資訊**（collapsible）：FCC / CE / 回收標誌等（可選）

Store 擴充（`machineStore` 或既有 `MachineState` 型別）：
- `model: string`
- `serialNumber: string`
- `purchaseDate: number`
- `warrantyEndDate: number`

設定頁調整：
- 「咖啡機資訊」列：Alert → `router.push('/machine-info')`
- 「韌體更新」列：**移除**（併入 machine-info）

## Out of scope

- 真實韌體下載／更新流程（OTA） — 本階段「檢查更新」只 mock 結果
- 連線管理（切換 BLE ↔ WiFi） — 屬於 `add-wifi-settings` 範疇
- 保固延長／產品註冊 — 商務功能，另案
- 機器狀態詳情頁（`add-machine-status-detail`）的重疊部分 — 使用者已於 /explore 確認兩頁完全分開
