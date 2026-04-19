## MODIFIED Requirements

### Requirement: Settings screen WiFi interaction
Settings 頁面「WiFi 設定」列 SHALL 導航至 `/wifi` 頁，不再使用 Alert 佔位。

#### Scenario: WiFi settings row tap
- **WHEN** 使用者點擊「WiFi 設定」列
- **THEN** 系統 SHALL 呼叫 `router.push('/wifi')` 並保留既有 opacity press feedback
