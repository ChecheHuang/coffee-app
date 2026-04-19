## MODIFIED Requirements

### Requirement: Settings screen machine interactions
Settings 頁面「咖啡機」區塊的列 SHALL 導航至對應子頁，不再使用 Alert 佔位。

#### Scenario: Machine info row tap
- **WHEN** 使用者點擊「咖啡機資訊」列
- **THEN** 系統 SHALL 呼叫 `router.push('/machine-info')` 並保留既有 opacity press feedback

## REMOVED Requirements

### Requirement: Settings firmware update row
**Reason**: 韌體版本與更新入口併入 `/machine-info` 頁，設定頁不再提供獨立列。

原行為：點擊「韌體更新」顯示 Alert「已是最新版本」。
