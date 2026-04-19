## Context

- 本 change 是剩餘 Alert 中最單純的，主體為靜態資料呈現。
- 與 `add-machine-status-detail` 已於 /explore 確認完全分開：Status = live state（水位、溫度、維護提醒），Info = identity（型號、序號、韌體、保固）。
- 設定頁「韌體更新」Alert 原為功能性展示，使用者已確認將整合進本頁。

## Decisions

### 路由：`/machine-info`

- 與 `/machine-status` 並列，語意對稱（Status vs Info）。
- 不採用 `/machine/info` 層級路由：`/machine-status` 已經是扁平的，保持一致。

### 資料擴充在既有 `MachineState` 而非新型別

四個新欄位（model、serialNumber、purchaseDate、warrantyEndDate）邏輯上都屬於「機器」，放在既有型別最自然。避免創造 `MachineIdentity` 這種多餘型別。

### 韌體「檢查更新」為 mock 流程

本階段：

1. 點擊按鈕 → Toast「檢查中…」
2. 約 1.5 秒後 → 如果 `isLatestFirmware`，Toast「已是最新版本」；否則 Toast「發現新版本 v2.3.2」（暫不提供下載）

未來若要做完整 OTA：
- 「發現新版本」後 → 顯示版本說明 + 下載按鈕
- 下載進度條 → 安裝提示 → 重啟機器
這屬於另一個 change 的範疇，本頁只預留「檢查更新」按鈕的入口。

### 序號複製

`expo-clipboard`（若尚未安裝需加入依賴）。純 Web 版用 `navigator.clipboard` fallback（Expo SDK 54 已內建支援）。UI 上用小的複製 icon 在序號右側，不用長按（長按不發現性差）。

### 設定頁「韌體更新」列移除 vs 保留

移除的理由（使用者已選）：

- 韌體版本在本頁已明顯呈現，不需要設定列再顯示。
- 兩處都有「檢查更新」會造成行為重複，難以維護。
- 設定頁該區塊從 3 列變 2 列，視覺上更簡潔（與 `add-maintenance-and-consumables` 移除「引導式清潔」的方向一致）。

## Risks / Open questions

- **Toast 機制依賴**：如果 `add-maintenance-and-consumables` 的 Toast 元件先 apply 過了，本 change 直接用；如果本 change 先 apply，需要先建立 Toast 或用內建 `ToastAndroid` + iOS Alert 過渡。具體依 /apply 執行順序決定。
- **`machineStore` 建立的協調**：`add-machine-status-detail` 的 tasks.md §1.2 已定義建立 `machineStore`。本 change 的 1.3 說明若尚未建立則新建。實際 /apply 時若兩個 change 順序是 machine-status-detail 先，本 change 直接擴充即可。
- **保固資訊的顯示**：mock 時購買日期寫 2025-08-15，保固 1 年即 2026-08-15——目前日期 2026-04-19，保固有效。若未來需要展示「已過期」UI 態，mock 可選配一組過期資料用於 Pencil 變體。
- **法規資訊**：proposal 列為 collapsible 可選。若 Pencil 設計時覺得佔位，可暫時拿掉——屬於文字重要性低的區塊。
- **Illustration 素材**：需要一張機器 illustration 或 icon。若無現成素材，本階段可用既有 Coffee lucide icon 放大替代，未來再補。
