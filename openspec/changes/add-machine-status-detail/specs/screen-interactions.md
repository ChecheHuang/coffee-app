## MODIFIED Requirements

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
- **THEN** 系統 SHALL 導航至 `/machine-status` 機器狀態詳情頁，並顯示 scale press feedback
