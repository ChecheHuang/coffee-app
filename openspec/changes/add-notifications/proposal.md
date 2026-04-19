---
name: add-notifications
status: proposed
created: 2026-04-19
needs_design: true
needs_prd_update: true
affected_pages: [Home, Notifications]
affected_components: []
---

## Why

首頁右上角的鈴鐺按鈕目前僅顯示 Alert「通知功能即將推出」，是使用者最早接觸的佔位互動之一。完整的通知中心能：

- 讓系統、維護警訊、社群動態有統一入口
- 支援未來 `expo-notifications` 推播整合（PRD §10.1.1 已預留）
- 替首頁 unread badge 留下資料源

## What

新增 `/notifications` 頁面與 `notificationStore`，包含：

1. **三類分頁**（Tab 切換）：全部 / 系統 / 維護警訊 / 社群
   - 系統：韌體、App 更新
   - 維護警訊：渣盒滿、豆量低、除垢到期
   - 社群：家庭成員活動、分享
2. **通知卡片列表**：每張卡含 icon、標題、內文、時間戳、未讀點標記
3. **滑動刪除單條**（swipe-to-delete）
4. **Header 右上「全部已讀」按鈕**
5. **空狀態**：「目前沒有通知」插圖/文字

首頁鈴鐺點擊行為從 Alert 改為 `router.push('/notifications')`。

## Out of scope

- 真實 push 推播串接（僅預留資料結構，`expo-notifications` 整合另案）
- 通知偏好設定頁（設定頁的「通知設定」Alert 另案處理）
- 點擊單條通知 deep link 到對應頁面（例：維護警訊 → 機器狀態詳情）— 使用者本階段未選，視之後需求追加
- 一鍵清空全部通知 — 使用者本階段未選
- 首頁鈴鐺的 unread badge 視覺（此 change 只準備資料源，視覺另案或順手處理）
