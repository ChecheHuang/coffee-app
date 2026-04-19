## MODIFIED Requirements

### Requirement: Settings screen maintenance interactions
Settings 頁面「維護」區塊的列 SHALL 導航至對應子頁，不再使用 Alert 佔位。

#### Scenario: Maintenance center row tap
- **WHEN** 使用者點擊「維護中心」列
- **THEN** 系統 SHALL 呼叫 `router.push('/maintenance')` 並保留既有 opacity press feedback

#### Scenario: Consumables row tap
- **WHEN** 使用者點擊「耗材紀錄」列
- **THEN** 系統 SHALL 呼叫 `router.push('/consumables')` 並保留既有 opacity press feedback

## REMOVED Requirements

### Requirement: Settings guided cleaning row
**Reason**: 引導式清潔已併入維護中心作為一個動作卡；設定頁不再提供此獨立列。

原行為：點擊「引導式清潔」顯示二層 Alert（「確定要執行清潔程序嗎？」→「清潔中」）。
