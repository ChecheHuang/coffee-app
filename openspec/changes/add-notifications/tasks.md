## Implementation

### 1. 型別與資料

- [ ] 1.1 新增 `src/types/notification.ts` 定義 `AppNotification` 介面（readonly 欄位 + union 分類）
- [ ] 1.2 `src/types/index.ts` 匯出新型別
- [ ] 1.3 新增 `src/stores/notificationStore.ts`：Zustand store 含 notifications、markAllRead、removeNotification、getUnreadCount
- [ ] 1.4 Store 初始 mock：每類 >=1 條、總數 >=5 條、涵蓋已讀與未讀、時間戳分布近期～數天前

### 2. PRD 同步

- [ ] 2.1 在 `PRD.md` §5 新增 §5.16「通知中心 (Notifications)」：header、tabs、卡片規格、swipe-to-delete、全部已讀、空狀態
- [ ] 2.2 `PRD.md` §5.1 首頁鈴鐺互動段補上「點擊 → `/notifications`」
- [ ] 2.3 更新 PRD 既有 Alert 清單（若有）移除「通知功能即將推出」

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 在 `coffee-app-pencil.pen` 新增 Notifications 畫面節點
- [ ] 3.2 Header：back chevron + 標題「通知」+ 右上「全部已讀」文字按鈕
- [ ] 3.3 Tabs：全部 / 系統 / 維護警訊 / 社群（四個 Pill，既有 Pill 元件）
- [ ] 3.4 Notification card：分類 icon + 標題 + 內文 + 時間、未讀金點
- [ ] 3.5 Swipe-to-delete 紅色動作區樣式
- [ ] 3.6 空狀態插圖（BellOff icon + 文字）
- [ ] 3.7 更新 `DESIGN-PROMPT.md` 加入此頁速查

### 4. 路由與頁面 [DESIGN]

- [ ] 4.1 新增 `app/notifications.tsx`，SafeAreaView + FlatList（取代 ScrollView 以支援 swipe）
- [ ] 4.2 Header 實作（back + 標題 + 全部已讀）
- [ ] 4.3 Tabs 實作：四個 Pill、切換 filter、未讀小點顯示
- [ ] 4.4 NotificationCard 子元件：icon、標題、body 2 行截斷、相對時間 formatter
- [ ] 4.5 Swipe-to-delete：使用 `react-native-gesture-handler` Swipeable
- [ ] 4.6 Empty state UI
- [ ] 4.7 首頁 `app/(tabs)/index.tsx` 鈴鐺 onPress 從 `Alert.alert(...)` 改為 `router.push('/notifications')`
- [ ] 4.8 若不再使用則移除首頁 `Alert` import

### 5. SYNC-STATUS 更新

- [ ] 5.1 新增 Pages 列：`Notifications | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.16](PRD.md) | app/notifications.tsx`
- [ ] 5.2 更新 Home 列備註（移除「Alert 通知即將推出」的佔位描述）
- [ ] 5.3 更新頂部 Last update 時間戳

### 6. 驗證（Run-and-Verify）

- [ ] 6.1 Chrome mobile MCP：首頁鈴鐺 → `/notifications` 流程可見 tabs 與 mock 列表
- [ ] 6.2 Swipe-to-delete 單條通知動畫正常
- [ ] 6.3 「全部已讀」點擊後所有金點消失
- [ ] 6.4 切換 tab 列表正確過濾
- [ ] 6.5 空 tab 顯示空狀態
- [ ] 6.6 返回首頁捲動位置保留
