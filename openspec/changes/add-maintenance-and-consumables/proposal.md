---
name: add-maintenance-and-consumables
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Settings, Maintenance, Consumables]
affected_components: []
---

## Why

設定頁「維護」區塊目前三列中有兩列是 Alert 佔位：

- **維護中心**：Alert「維護中心頁面即將推出」
- **耗材紀錄**：Alert「耗材紀錄頁面即將推出」
- **引導式清潔**：功能性 Alert（可執行，但散落在設定列，無合適的 hub 頁）

本 change 把三者整理成有邏輯的結構：維護中心作為所有保養動作的執行入口（含引導式清潔、沖洗、除垢），耗材紀錄作為四類耗材的即時狀態與歷史檢視。兩頁同屬「維護主題」，一次立案共用資料與設計語言。

## What

新增兩個頁面與對應 store：

### `/maintenance`（維護中心）

- **可執行動作列表**：引導式清潔、沖洗循環、除垢程序、反沖洗
- 每個動作卡含：icon、標題、建議頻率、上次執行時間、預估時長
- 點擊卡片 → 二次確認對話框 → mock 執行進度（Toast「XX 已完成」）
- 頂部「建議動作」highlight 區：顯示當前最需要執行的項目

### `/consumables`（耗材紀錄）

- **四類即時狀態卡**：咖啡豆、濾芯（沖煮頭）、除垢劑、水箱濾水器
- 每卡含：圖示、剩餘量%、估計換期、上次更換日
- **用量歷史列表**：時間倒序顯示所有更換/補充紀錄
- 本階段不提供手動新增紀錄（Out of scope）

### 設定頁調整

- 「維護中心」列：Alert → `router.push('/maintenance')`
- 「引導式清潔」列：**移除**（已併入維護中心作為一個動作卡）
- 「耗材紀錄」列：Alert → `router.push('/consumables')`

## Out of scope

- 手動新增耗材紀錄（modal 輸入豆包名稱/重量） — 使用者本階段未選
- Chart 視覺化用量趨勢 — 使用者本階段未選
- 真實的維護動作執行（IoT 指令觸發）— mock Toast 即可
- 機器狀態詳情頁的「維護提醒」點擊 deep link 到維護中心 — 屬於 `add-machine-status-detail` 的後續優化
- 除垢劑購買/補貨連結 — 商務功能，另案
