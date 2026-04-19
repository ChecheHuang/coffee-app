---
name: sync-status
description: 維護專案根目錄的 SYNC-STATUS.md（PRD ↔ Pencil ↔ Code 三者同步狀態追蹤表）。提供 init / check 指令來建立或驗證表格，並在偵測到 PRD.md、coffee-app-pencil.pen、app/ 程式碼有改動時，主動詢問使用者是否同步更新表格的勾選狀態。其他寫入 skill（/apply、/pencil-draw）會直接寫入這張表格；唯讀 skill（/three-way-check、/archive、/explore、/propose）只讀不寫。觸發時機：使用者輸入 sync-status init、check sync、初始化同步表、補列；或 Claude 在對話中觀察到 PRD/Pencil/code 修改而需確認是否更新表格。
---

# Sync Status

## Overview

維護 `SYNC-STATUS.md`（位於專案根目錄）— 一張記錄每個頁面、共用元件、Design Token 在 PRD、Pencil、Code 三個產物中是否同步的勾選表。它是 BrewMaster Pro 「三產物一致性」工作流的單一狀態真相來源。

`SYNC-STATUS.md` 不是說明文件，而是**可被機器讀寫的狀態檔**。所有與 PRD、設計稿、程式碼一致性相關的 skill 都會讀寫它。

## SYNC-STATUS.md 結構

表格分三段，固定順序：Pages → Components → Design Tokens。

完整模板與符號定義見 [references/format-spec.md](references/format-spec.md)。

關鍵符號：
- `✓` 該欄已同步
- `✗` 該欄需更新
- `⚠` 標記需複查（例如純文案微調，不算不同步但需人工確認）

## 指令

### `/sync-status init`

第一次啟用時執行。掃描以下三個來源並交叉比對，產生完整的 `SYNC-STATUS.md`：

1. **app/ 路由** — 用 Glob 列出 `app/**/*.tsx`，識別頁面（含 `(tabs)` 與動態路由 `[id]`）
2. **PRD.md 功能項** — 讀 PRD.md，依 heading 切出每個頁面/元件/Token 對應段落
3. **Pencil 節點** — 透過 `mcp__pencil__get_editor_state` 與 `mcp__pencil__batch_get` 列出 frame 與 component 節點

對每一列，比對三者描述是否一致，初始打勾或留空，並填入 PRD heading anchor、Pencil 節點 ID。

若 `SYNC-STATUS.md` 已存在，先詢問是否覆蓋。

### `/sync-status check [item]`

驗證指定項目（例如 `Home`、`DrinkCard`、`gold-accent`），或不帶參數時掃描整張表的 `✗` / `⚠` 項。

對每個被檢查項：讀 PRD 對應段落、讀 Pencil 節點、讀對應程式碼，判斷三者是否一致。一致則打勾並更新「最後驗證」欄位為今天日期；不一致則保持 `✗` 並更新備註。

### `/sync-status`（無參數）

顯示 summary：
- 已同步比例（例如 `12/18 pages synced`）
- 列出所有 `✗` 與 `⚠` 項目及其備註
- 不修改檔案

## 智能提醒（被動行為）

**重要**：除上述明確指令外，Claude 在一般對話中**觀察到**以下情況時，應主動透過 `AskUserQuestion` 詢問是否更新表格——不要直接改，等使用者確認。

觸發條件：
- 對話中 Edit/Write 了 `PRD.md`
- 對話中透過 Pencil MCP（`mcp__pencil__batch_design`）改動了 .pen 檔
- 對話中 Edit/Write 了 `app/` 或 `components/` 下的 .tsx

詢問範例：
```
你剛剛改了 PRD.md 的「Home Screen」段落，
要更新 SYNC-STATUS.md 嗎？
[檢查 Home / 全表掃描 / 先不檢查]
```

若使用者選擇檢查，依「偵測規則」更新對應勾選；選擇先不檢查則繼續原任務。

## 偵測規則（PRD 修改 → 取消勾選）

PRD 修改類型決定哪些欄位被取消勾選。完整規則見 [references/detection-rules.md](references/detection-rules.md)。

速查：

| PRD 修改類型 | Pencil 欄 | Code 欄 | 影響範圍 |
|--------------|-----------|---------|----------|
| 可見元素增減 | ✗ | ✗ | 單頁 |
| Design Token | ✗ | ✗ | 所有列 |
| 純文案微調 | ⚠ | ⚠ | 單頁（標記複查） |

## 寫入契約（其他 skill 如何寫表格）

其他 skill 用 `Edit` 工具直接修改 `SYNC-STATUS.md`。寫入時必須遵守 [references/format-spec.md](references/format-spec.md) 規範的格式（符號、欄位順序、日期）。

各 skill 的寫入時機與欄位對照見 [references/integration-contract.md](references/integration-contract.md)。

## 一致性原則

- 「最後驗證」欄位的日期格式固定為 `YYYY-MM-DD`，使用今天日期（從環境取得，不要猜）
- 取消勾選時必須在「備註」欄填入一行原因（例如 `PRD 新增評價按鈕，待同步`）
- 重新打勾時清空備註
- 不要新增表格未定義的欄位；如需新增請先更新 `format-spec.md`

## 寫 ✓ 前的 Run-and-Verify Gate

涉及 UI 或前端行為的變更，**寫 ✓ 至 Code 欄之前必須通過 Run-and-Verify Gate**——實際在瀏覽器跑過該功能。

詳見 [references/run-verify-gate.md](references/run-verify-gate.md)。

| Gate 結果 | 寫入符號 |
|-----------|----------|
| 通過 | `✓` |
| 跳過（使用者授權）/ 有已知差異 | `⚠`（備註欄記錄原因） |
| 失敗或未執行 | `✗`（不可寫 ✓） |
