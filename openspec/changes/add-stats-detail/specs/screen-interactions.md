## MODIFIED Requirements

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
- **THEN** 系統 SHALL 導航至 `/stats/[category]` 頁面，category 對應卡片類別（weekly / caffeine / favorite），並顯示 scale press feedback
