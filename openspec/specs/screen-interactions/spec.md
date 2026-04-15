## ADDED Requirements

### Requirement: Home screen interactions
Home 頁面的所有可互動元素 SHALL 具備觸控回饋和 handler。

#### Scenario: Notification bell tap
- **WHEN** 使用者點擊通知鈴鐺按鈕
- **THEN** 系統 SHALL 顯示 Alert 提示「通知功能即將推出」並顯示 opacity press feedback

#### Scenario: Suggestion card tap
- **WHEN** 使用者點擊 AI 推薦的飲品卡片
- **THEN** 系統 SHALL 導航至對應飲品的詳情頁 `/drink/[id]` 並顯示 scale press feedback

#### Scenario: Machine status tap
- **WHEN** 使用者點擊機器狀態區塊
- **THEN** 系統 SHALL 顯示 Alert 提示「機器詳細狀態即將推出」並顯示 scale press feedback

### Requirement: Drinks screen interactions
Drinks 頁面的搜尋按鈕 SHALL 具備互動效果。

#### Scenario: Search button tap
- **WHEN** 使用者點擊搜尋 icon 按鈕
- **THEN** 系統 SHALL 顯示 Alert 提示「搜尋功能即將推出」並顯示 opacity press feedback

### Requirement: Recipes screen interactions
Recipes 頁面的新增按鈕和配方卡片 SHALL 具備互動效果。

#### Scenario: Add recipe button tap
- **WHEN** 使用者點擊 "+" 新增按鈕
- **THEN** 系統 SHALL 顯示 Alert 提示「新增配方功能即將推出」並顯示 opacity press feedback

#### Scenario: Recipe card tap
- **WHEN** 使用者點擊任一配方卡片
- **THEN** 系統 SHALL 顯示 Alert 提示「配方詳情即將推出」並顯示 scale press feedback

### Requirement: Stats screen interactions
Stats 頁面的連結和卡片元素 SHALL 具備互動效果。

#### Scenario: View all achievements link tap
- **WHEN** 使用者點擊「查看全部」連結
- **THEN** 系統 SHALL 導航至 `/achievements` 頁面並顯示 opacity press feedback

#### Scenario: Achievement card tap
- **WHEN** 使用者點擊成就卡片
- **THEN** 系統 SHALL 導航至 `/achievements` 頁面並顯示 scale press feedback

#### Scenario: Quick stat card tap
- **WHEN** 使用者點擊快速統計卡片
- **THEN** 系統 SHALL 顯示 Alert 提示該統計類別的詳細資訊即將推出，並顯示 scale press feedback

#### Scenario: Badge pill tap
- **WHEN** 使用者點擊徽章 pill
- **THEN** 系統 SHALL 導航至 `/achievements` 頁面並顯示 opacity press feedback

### Requirement: Settings screen interactions
Settings 頁面的所有設定項目 SHALL 具備實際 handler。

#### Scenario: Settings item with target page tap
- **WHEN** 使用者點擊有對應目標頁面的設定項目
- **THEN** 系統 SHALL 顯示 Alert 提示「該設定頁面即將推出」（因目標頁面尚未建立）

#### Scenario: All settings items feedback
- **WHEN** 使用者點擊任何設定項目
- **THEN** 該項目 SHALL 顯示 scale press feedback

### Requirement: Drink detail interactions
Drink Detail 頁面的愛心收藏和保存配方按鈕 SHALL 具備互動效果。

#### Scenario: Favorite toggle
- **WHEN** 使用者點擊愛心按鈕
- **THEN** 系統 SHALL 切換收藏狀態（filled/outline heart icon），使用 local state 管理，並顯示 opacity press feedback 搭配 scale bounce 動畫

#### Scenario: Save as recipe tap
- **WHEN** 使用者點擊「保存為配方」按鈕
- **THEN** 系統 SHALL 顯示 Alert 提示「已保存」（placeholder），並顯示 opacity press feedback

### Requirement: Schedule screen interactions
Schedule 頁面的新增按鈕和星期選擇 SHALL 具備互動效果。

#### Scenario: Add schedule button tap
- **WHEN** 使用者點擊 "+" 新增排程按鈕
- **THEN** 系統 SHALL 顯示 Alert 提示「新增排程功能即將推出」並顯示 opacity press feedback

#### Scenario: Day circle toggle
- **WHEN** 使用者點擊星期圈圈
- **THEN** 該圈圈 SHALL 切換 active/inactive 狀態（使用 local state），active 時顯示金色背景，並顯示 opacity press feedback

### Requirement: Achievements screen interactions
Achievements 頁面的徽章和里程碑 SHALL 具備互動效果。

#### Scenario: Badge item tap
- **WHEN** 使用者點擊徽章項目
- **THEN** 系統 SHALL 顯示 Alert 提示該徽章的詳細說明，並顯示 scale press feedback

#### Scenario: Milestone row tap
- **WHEN** 使用者點擊里程碑列
- **THEN** 系統 SHALL 顯示 Alert 提示該里程碑的詳細說明，並顯示 scale press feedback
