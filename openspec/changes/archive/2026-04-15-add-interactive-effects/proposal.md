## Why

目前 App 各頁面大量使用靜態 View 呈現 UI 元素，缺乏觸控回饋（press state）、按鈕導航、以及基礎互動效果。許多 Pressable 元件的 onPress 為空、卡片不可點擊、清單項目無觸控反饋，導致整體體驗像靜態原型而非可用產品。需要全面補齊互動效果，讓每個頁面達到正常 App 的互動水準。

## What Changes

**觸控回饋（Press Feedback）**
- 所有可點擊元素加入 scale/opacity 動畫反饋（使用 Reanimated）
- 統一 press state 行為：卡片類 scale 0.97、按鈕類 opacity 0.7

**空 Handler 補齊**
- Home：通知鈴鐺加入 handler、推薦卡片導航至飲品詳情
- Drinks：搜尋按鈕加入搜尋 modal 或 filter 展開
- Recipes：加號按鈕觸發新增配方流程、配方卡片可點擊查看詳情
- Stats：「查看全部」連結導航至成就頁、統計卡片可互動
- Settings：所有 8 個設定項目補齊實際 handler（導航或 modal）
- Drink Detail：愛心按鈕加入收藏切換、「保存為配方」加入功能
- Schedule：加號按鈕可新增排程、星期圈圈可切換選取

**靜態元素轉互動元素**
- Home 機器狀態區塊 View → Pressable
- Stats 成就卡片、徽章、統計卡片 View → Pressable
- Schedule 星期選擇圈圈 View → Pressable
- Achievements 徽章與里程碑 View → Pressable

## Capabilities

### New Capabilities
- `press-feedback`: 統一的觸控回饋系統 — 封裝可重用的 press animation patterns（scale、opacity），供所有頁面共用
- `screen-interactions`: 各頁面互動效果補齊 — 包含空 handler 填入、靜態元素轉 Pressable、導航串接、功能性互動（收藏、新增、切換）

### Modified Capabilities
_(無既有 spec 需要修改)_

## Impact

- **Screens affected**: 全部 7 個主要頁面（Home、Drinks、Recipes、Stats、Settings、Drink Detail、Schedule）+ Achievements
- **Components**: 需新增共用 press feedback hook 或 wrapper component
- **Dependencies**: 主要使用現有 react-native-reanimated，不需新增外部依賴
- **Navigation**: 部分新增的導航目標可能需要建立 placeholder 頁面或 modal
