## ADDED Requirements

### Requirement: Notifications page structure
`/notifications` 頁面 SHALL 作為所有通知的統一入口，支援三類分頁與基本操作。

#### Scenario: Page header
- **WHEN** 使用者進入 `/notifications`
- **THEN** 系統 SHALL 顯示標題「通知」、左上返回按鈕（back chevron）、右上「全部已讀」文字按鈕
- **AND** 返回按鈕點擊 SHALL 呼叫 `router.back()`

#### Scenario: Category tabs
- **WHEN** 頁面載入
- **THEN** 系統 SHALL 顯示四個 tab：全部 / 系統 / 維護警訊 / 社群
- **AND** 預設選中「全部」
- **AND** 點擊切換 tab SHALL 過濾列表內容
- **AND** 各 tab 右側 SHALL 顯示未讀數量小圓點（若 >0）

#### Scenario: Notification card list
- **WHEN** 列表載入
- **THEN** 每張通知卡 SHALL 包含：分類 icon、標題、內文（最多 2 行）、相對時間（例：「5 分鐘前」、「昨天」、「3 月 10 日」）
- **AND** 未讀通知 SHALL 於卡片左側顯示金色小圓點
- **AND** 卡片按時間降冪排序（最新在上）

#### Scenario: Swipe to delete
- **WHEN** 使用者於任一通知卡向左滑動
- **THEN** 系統 SHALL 露出紅色「刪除」按鈕
- **AND** 點擊「刪除」或滑動超過閾值 SHALL 呼叫 `notificationStore.removeNotification(id)` 並以動畫移除該卡

#### Scenario: Mark all as read
- **WHEN** 使用者點擊 header 右上「全部已讀」
- **THEN** 系統 SHALL 呼叫 `notificationStore.markAllRead()`
- **AND** 所有卡片左側的金色小圓點 SHALL 消失
- **AND** tabs 右側的未讀小圓點 SHALL 消失

#### Scenario: Empty state
- **WHEN** 當前 tab 沒有任何通知
- **THEN** 系統 SHALL 顯示空狀態：BellOff icon + 「目前沒有通知」文字

### Requirement: Notification data model
系統 SHALL 提供 `AppNotification` 型別與 `notificationStore` Zustand store。

#### Scenario: Type definition
- **WHEN** 新增通知型別
- **THEN** 系統 SHALL 在 `src/types/notification.ts` 定義 `AppNotification`，包含欄位：
  - `id: string`
  - `category: "system" | "maintenance" | "social"`
  - `title: string`
  - `body: string`
  - `timestamp: number`（毫秒 epoch）
  - `read: boolean`
  - `icon?: string`（lucide icon 名稱，選填）

#### Scenario: Store API
- **WHEN** 新增 notificationStore
- **THEN** 系統 SHALL 在 `src/stores/notificationStore.ts` 提供：
  - `notifications: readonly AppNotification[]`（初始含 mock 資料）
  - `markAllRead(): void`
  - `removeNotification(id: string): void`
  - `getUnreadCount(category?: AppNotification["category"]): number`
- **AND** mock 資料 SHALL 至少包含每類 1 條，總數 >=5 條，涵蓋已讀與未讀

### Requirement: Home to Notifications navigation
Home 頁鈴鐺按鈕 SHALL 於點擊時導航至 `/notifications`。

#### Scenario: Navigate from home
- **WHEN** 使用者點擊首頁鈴鐺
- **THEN** 系統 SHALL 呼叫 `router.push('/notifications')` 並保留現有 opacity press feedback

#### Scenario: Return to home preserves state
- **WHEN** 使用者從 `/notifications` 返回首頁
- **THEN** 系統 SHALL 回到首頁並保留捲動位置
