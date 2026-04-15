## Context

App 各頁面已完成視覺 UI 但缺乏互動效果。大量 Pressable 的 onPress 為空函式，多處應可點擊的元素仍為靜態 View，且按壓時無視覺回饋。需要建立統一的互動模式並逐頁補齊。

現有基礎設施：
- `react-native-reanimated` 4 已安裝且在 brew-progress、Slider、drinks 頁面中使用
- `react-native-gesture-handler` 2 已安裝
- Expo Router 的 `router.push()` / `router.back()` 已在部分頁面使用
- `components/Slider.tsx` 是良好的互動元件參考範例

## Goals / Non-Goals

**Goals:**
- 建立統一的 press feedback pattern（`useAnimatedPress` hook），所有頁面共用
- 補齊全部空 onPress handler，串接導航或觸發適當 UI 回應
- 將需要互動的靜態 View 轉為 Pressable/AnimatedPressable
- 對於尚無目標頁面的功能（如搜尋、新增配方），使用 Alert 或 Toast 提示「即將推出」作為臨時回應

**Non-Goals:**
- 不實作完整的搜尋功能、配方編輯器、通知系統等新功能模組
- 不建立全域狀態管理（Zustand store）— 收藏等狀態先用 local state
- 不修改現有的動畫效果（brew-progress、tab bar、drinks 卡片已有良好的動畫）
- 不改變設計系統的色彩或排版

## Decisions

### 1. 使用 `useAnimatedPress` custom hook 而非 wrapper component

**選擇：** 建立 `src/hooks/useAnimatedPress.ts` hook，回傳 `animatedStyle` 和 `pressHandlers`

**替代方案：** 建立 `<AnimatedPressable>` wrapper component
**理由：** Hook 更靈活，可搭配現有的 Animated.View 使用，不強制替換元件結構。部分頁面已有自己的 Animated.View 結構（如 drinks 卡片），hook 可以直接整合而不需要重構。

### 2. 兩種 press feedback 模式

| 模式 | 效果 | 適用場景 |
|------|------|---------|
| `scale` | pressIn: scale(0.97), pressOut: scale(1) + spring | 卡片、大型可點擊區塊 |
| `opacity` | pressIn: opacity(0.7), pressOut: opacity(1) | 小型按鈕、icon button、文字連結 |

使用 `withTiming` duration 100ms for press-in、`withSpring` for press-out 提供自然回彈感。

### 3. 無目標的 handler 使用 Alert.alert 佔位

**選擇：** `Alert.alert("即將推出", "此功能開發中")` 作為尚未實作功能的 placeholder

**替代方案：** 留空不處理 / console.log
**理由：** 使用者點擊後有明確回饋，比無反應好。後續功能開發時直接替換 Alert 即可。

### 4. 收藏狀態使用 local useState

Drink Detail 的愛心收藏按鈕使用 `useState<boolean>` 管理，不持久化。等 Zustand store 建立後再遷移至全域狀態。

### 5. Settings 導航策略

Settings 頁面的 8 個設定項目：
- 有明確目標的項目（如「關於」）→ 導航至新頁面或 modal
- 功能性項目（如「清除快取」）→ Alert 確認 + placeholder 動作
- 尚無實作的項目 → Alert "即將推出"

## Risks / Trade-offs

**[過度 Alert]** 多處使用 "即將推出" Alert 可能讓使用者覺得 App 未完成 → 可接受，因為這是開發階段的臨時方案，比無回饋好

**[Local state 不持久]** 收藏狀態在頁面切換後消失 → 可接受，後續 Zustand 整合時一併解決

**[動畫效能]** 大量元素同時使用 Reanimated animated style → 風險低，Reanimated 4 的 worklet 在 UI thread 執行，不影響 JS thread
