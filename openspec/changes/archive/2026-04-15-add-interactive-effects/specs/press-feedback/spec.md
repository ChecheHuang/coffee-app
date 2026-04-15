## ADDED Requirements

### Requirement: Animated press feedback hook
系統 SHALL 提供 `useAnimatedPress` custom hook，回傳 Reanimated animated style 和 press event handlers，供所有可點擊元素使用。

Hook 接受參數：
- `type`: `"scale"` | `"opacity"` — 決定動畫模式
- `disabled?`: boolean — 禁用時不產生動畫

回傳值：
- `animatedStyle`: 可直接套用至 `Animated.View` 的 style
- `pressHandlers`: `{ onPressIn, onPressOut }` 可展開至 Pressable

#### Scenario: Scale mode press feedback
- **WHEN** 使用者按下一個使用 scale 模式的可點擊元素
- **THEN** 元素 SHALL 以 `withTiming` (100ms) 縮放至 0.97，放開後以 `withSpring` 回彈至 1.0

#### Scenario: Opacity mode press feedback
- **WHEN** 使用者按下一個使用 opacity 模式的可點擊元素
- **THEN** 元素 SHALL 以 `withTiming` (100ms) 透明度降至 0.7，放開後以 `withTiming` (150ms) 回復至 1.0

#### Scenario: Disabled state
- **WHEN** 元素處於 disabled 狀態
- **THEN** press feedback SHALL 不觸發任何動畫

### Requirement: Press feedback consistency
所有可點擊元素 SHALL 使用統一的 press feedback 模式：
- 卡片類元素（DrinkCard、RecipeCard、StatCard、AchievementCard）使用 `scale` 模式
- 小型按鈕與 icon button（通知鈴鐺、愛心、加號、搜尋）使用 `opacity` 模式
- 文字連結（「查看全部」、「保存為配方」）使用 `opacity` 模式

#### Scenario: Card press feedback
- **WHEN** 使用者按下任何卡片類元素
- **THEN** 該卡片 SHALL 顯示 scale 縮放動畫回饋

#### Scenario: Icon button press feedback
- **WHEN** 使用者按下任何 icon button
- **THEN** 該按鈕 SHALL 顯示 opacity 透明度動畫回饋
