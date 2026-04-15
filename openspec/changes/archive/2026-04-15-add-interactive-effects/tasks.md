## 1. Press Feedback 基礎建設

- [x] 1.1 建立 `src/hooks/useAnimatedPress.ts` — 實作 `useAnimatedPress` hook，支援 `scale` 和 `opacity` 兩種模式，回傳 `animatedStyle` 和 `pressHandlers`

## 2. Home 頁面互動 (`app/(tabs)/index.tsx`)

- [x] 2.1 通知鈴鐺按鈕加入 onPress handler（Alert 佔位）+ opacity press feedback
- [x] 2.2 SuggestionCard 加入 onPress 導航至 `/drink/[id]` + scale press feedback
- [x] 2.3 機器狀態區塊 View → Pressable，加入 onPress（Alert 佔位）+ scale press feedback

## 3. Drinks 頁面互動 (`app/(tabs)/drinks.tsx`)

- [x] 3.1 搜尋按鈕加入 onPress handler（Alert 佔位）+ opacity press feedback

## 4. Recipes 頁面互動 (`app/(tabs)/recipes.tsx`)

- [x] 4.1 "+" 新增按鈕加入 onPress handler（Alert 佔位）+ opacity press feedback
- [x] 4.2 RecipeCard 加入 onPress handler（Alert 佔位）+ scale press feedback

## 5. Stats 頁面互動 (`app/(tabs)/stats.tsx`)

- [x] 5.1 「查看全部」連結加入 onPress 導航至 `/achievements` + opacity press feedback
- [x] 5.2 AchievementCard View → Pressable，加入 onPress 導航至 `/achievements` + scale press feedback
- [x] 5.3 QuickStatCard View → Pressable，加入 onPress（Alert 佔位）+ scale press feedback
- [x] 5.4 BadgePill View → Pressable，加入 onPress 導航至 `/achievements` + opacity press feedback

## 6. Settings 頁面互動 (`app/(tabs)/settings.tsx`)

- [x] 6.1 所有 8 個 SettingsRow 的空 onPress 補齊 Alert 佔位 handler + scale press feedback

## 7. Drink Detail 頁面互動 (`app/drink/[id].tsx`)

- [x] 7.1 愛心按鈕加入收藏切換（useState + icon 切換 filled/outline）+ opacity press feedback + scale bounce
- [x] 7.2 「保存為配方」按鈕加入 onPress handler（Alert "已保存" 佔位）+ opacity press feedback

## 8. Schedule 頁面互動 (`app/schedule.tsx`)

- [x] 8.1 "+" 新增排程按鈕加入 onPress handler（Alert 佔位）+ opacity press feedback
- [x] 8.2 星期圈圈 View → Pressable，加入 active/inactive 切換（local state + 金色背景）+ opacity press feedback

## 9. Achievements 頁面互動 (`app/achievements.tsx`)

- [x] 9.1 BadgeItem View → Pressable，加入 onPress（Alert 顯示徽章說明）+ scale press feedback
- [x] 9.2 MilestoneRow View → Pressable，加入 onPress（Alert 顯示里程碑說明）+ scale press feedback
