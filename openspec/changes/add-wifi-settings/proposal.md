---
name: add-wifi-settings
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Settings, WifiSettings]
affected_components: []
---

## Why

設定頁「WiFi 設定」Alert「WiFi 設定頁面即將推出」是剩下待實作 Alert 中互動最密的一個。咖啡機的 WiFi 設定是實際會用到的功能（初次設定、換路由器、換地點），使用者期待完整的設定流程體驗。

本 change 實作完整的 WiFi 設定頁 + 掃描動畫 + 密碼輸入 bottom sheet + 連線狀態轉換，即使資料全 mock，也要讓流程感覺接近真實。

## What

新增 `/wifi` 頁，包含：

1. **Header**：back 按鈕 + 標題「WiFi 設定」+ 右上 refresh icon
2. **目前連線卡**（若已連線）：SSID、訊號強度、IP、連線時間、「斷開連線」按鈕
3. **可用網路列表**：
   - 進頁時顯示 2 秒掃描動畫（skeleton rows + pulse）
   - 掃描完成 → 網路列表按訊號強度排序
   - 每行：SSID + 訊號 icon（1-4 格）+ 鎖頭 icon（若需密碼）+ 5G/2.4G 標
4. **密碼輸入 Bottom Sheet**（點擊需密碼的網路時彈出）：
   - 標題顯示 SSID
   - 密碼 TextInput（secureTextEntry）+ 顯示密碼 toggle（eye icon）
   - 「取消 / 連線」按鈕
   - 連線中：spinner + 「連線中…」文字
   - 連線成功：滑下關閉 + 目前連線卡更新
   - 連線失敗：顯示 error 文字，不關閉 sheet
5. **Refresh 互動**：右上 refresh 點擊 → 重新掃描

Store：`wifiStore`（Zustand）含狀態機：`idle | scanning | connecting | connected | failed`，`scan()` / `connect(ssid, password?)` / `disconnect()` actions。

設定頁「WiFi 設定」列：Alert → `router.push('/wifi')`。

## Out of scope

- 真實 WiFi API 串接（iOS/Android native module） — 本階段全 mock
- WPS 快速配對、QR 碼加網 — 進階功能，另案
- 已儲存網路管理（忘記此網路） — 暫先支援連線即可
- 企業級 WiFi（802.1X、Radius） — 過度複雜，另案
- 訊號強度即時變動（5 秒更新一次） — 靜態 mock 即可
- 不同頻段（2.4G vs 5G）切換邏輯 — 只顯示標籤，不實作切換
