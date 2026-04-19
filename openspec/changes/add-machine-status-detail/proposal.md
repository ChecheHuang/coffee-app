---
name: add-machine-status-detail
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Home, MachineStatusDetail]
affected_components: []
---

## Why

首頁「機器狀態」卡點擊目前僅顯示 Alert「機器詳細狀態即將推出」，是 home hero 區最頻繁觸及的佔位互動之一。使用者無法：

- 看到四個核心指標（水箱／咖啡豆／渣盒／除垢）以外的 live 資訊（溫度、壓力）
- 知道下一次該做什麼維護（除垢倒數、清潔建議）
- 快速確認今天／本週的使用情況

本 change 將首頁 Alert 佔位升級為完整的「機器狀態詳情頁」，作為 home hero 的自然延伸入口。

## What

新增 `/machine-status` 頁面，包含四個區塊：

1. **核心指標（放大版）**：水箱／咖啡豆／渣盒／除垢——比首頁四宮格顯示更多細節（剩餘可沖煮杯數、建議補充時間）
2. **Live 指標**：沖煮頭溫度、萃取壓力、乾燥組狀態——即時數值（mock 即可）
3. **維護提醒**：下次除垢倒數、清潔建議，帶行動按鈕（暫導回設定頁對應列）
4. **使用統計快照**：今日沖煮次數、本週沖煮次數、總運轉時數

首頁 Machine status 卡點擊行為從 `Alert.alert(...)` 改為 `router.push('/machine-status')`。

## Out of scope

- 設定頁「咖啡機資訊」Alert（型號／序號／韌體）— 下一個 change 處理，與本頁完全分開
- 真實的 IoT 資料串接（本頁 mock 資料即可，透過 `machineStore` 讀取）
- 維護動作實際執行（例如觸發機器清潔）— 本頁只顯示提醒與導航
- 歷史趨勢圖表（壓力曲線、沖煮時間分布）— 若未來需要另案處理
