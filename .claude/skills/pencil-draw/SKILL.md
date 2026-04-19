---
name: pencil-draw
description: >-
  繪製或調整 Pencil (.pen) 設計稿的入口。雙模式：
  Standalone — 使用者直接呼叫；自動建立輕量 change（pencil-only-<ts>），畫完後問是否反向同步 PRD、是否立刻 /apply 接手。
  Embedded — 由 /apply Phase B 內呼；用既有 change 上下文，畫完直接交回 /apply。
  使用時機：要畫新頁面、調整既有頁面、新增/替換元件、調 token 顏色字型間距、整頁重新設計。
  觸發關鍵詞：pencil-draw、畫圖、畫設計、調設計、改設計稿、新增頁面設計、改顏色、改字型、設計、重畫、繪製。
---

# Pencil Draw

繪製或調整 .pen 設計稿。**唯一允許動 coffee-app-pencil.pen 的 skill**。

## 模式判定

| 進入方式 | 模式 |
|----------|------|
| 使用者直接觸發（無 change context） | **Standalone** |
| 由 `/apply` 用 Skill 工具呼叫並帶入 change context | **Embedded** |

入口時先判定模式；後續流程不同。

---

## Standalone 模式

### 1. 釐清要畫什麼

用 **AskUserQuestion** 問：
- 對象類型：頁面 / 元件 / Design Token / 整頁重設計
- 對應 SYNC-STATUS Item（從 Pages / Components 區塊取名讓使用者選）
- 變更類型：新增 / 修改 / 替換 / 刪除

需要時 `Read` PRD 對應段、`mcp__pencil__get_editor_state` 看當前狀態。

### 2. 自動建輕量 change

```bash
mkdir -p openspec/changes/pencil-only-YYYY-MM-DD-HHMMSS/
```

寫入 `proposal.md`：

```markdown
---
name: pencil-only-YYYY-MM-DD-HHMMSS
status: pencil-drafted
created: YYYY-MM-DD
needs_design: true
needs_prd_update: <pending>
affected_pages: [...]
affected_components: [...]
source: pencil-draw-standalone
---

## Why
<使用者的繪圖動機>

## What
<這次畫了什麼>
```

不寫 specs/、tasks.md、design.md——這些等 PRD 同步後或進 /apply 時補。

### 3. 進入繪圖

用 `mcp__pencil__open_document` 開檔（若未開）。
依需求用 `mcp__pencil__batch_design` 執行 insert / copy / replace / update / move / delete 操作。

每完成一個邏輯單位用 `mcp__pencil__get_screenshot` 自我驗證。

### 4. 寫 SYNC-STATUS

依 [`detection-rules.md`](../sync-status/references/detection-rules.md) 規則 §1（修改 .pen 的影響）：

對受影響的 Pages / Components 列：
- Pencil 欄 → ✓（剛畫完視為已同步）
- Code 欄 → ✗
- 備註：`[change: pencil-only-<ts>] Pencil 已更新 <一行說明>，待 Code 同步`
- 「最後驗證」→ 今天
- 表頭 `Last update` → 今天

### 5. 反向同步 PRD（diff 預覽）

對比 PRD 對應段落與這次畫的內容，產生 PRD diff 候選：
- 新增元素 → PRD 對應段加描述
- 改變佈局 → PRD 對應佈局描述更新
- 改 token → PRD §6 更新

用 **AskUserQuestion**：
- "套用 diff 同步 PRD（推薦）" — 寫入 PRD，並把對應列 PRD 欄維持 ✓
- "稍後手動同步" — PRD 欄 → ✗、備註加 `PRD 待同步`、proposal frontmatter 標 `needs_prd_update: true`
- "不需同步 PRD" — 沒有實質內容變更（例如純美化），proposal frontmatter 標 `needs_prd_update: false`

### 6. 接 /apply

用 **AskUserQuestion**：
- "立刻進入 /apply（推薦）" — 用 Skill 工具呼叫 `apply` skill 帶入此 change 名稱
- "稍後再實作" — 結束本 session，提示下次跑 `/apply pencil-only-<ts>`

---

## Embedded 模式（由 /apply Phase B 呼叫）

跳過 1（已有 change context）、跳過 2（已有 change）、跳過 5（PRD 已在 /apply Phase A 同步）、跳過 6（會自動回到 /apply）。

### 1. 接收 context

從 /apply 帶入：
- change 名稱
- affected_pages / affected_components 清單
- PRD 對應段落摘要

### 2. 進入繪圖

同 Standalone 步驟 3。重點：依 PRD 摘要實作對應的設計變更，避免畫成跟 PRD 不一致的東西。

### 3. 寫 SYNC-STATUS

對受影響列：
- Pencil 欄 → ✓
- 「最後驗證」→ 今天
- 備註不動（保留 /apply 寫入的 `[change: <name>] PRD <一行說明>`，留待 Code 完成後清空）
- 表頭 `Last update` → 今天

### 4. 交回 /apply

不問「立刻 /apply」（已經在 /apply 裡了）；不問反向 PRD 同步（PRD 已先動）。直接結束本次 Skill 呼叫，控制權回到 /apply Phase B 的「PRD↔設計比對」步驟。

---

## Token 變更特例

若這次畫的是 Design Token（顏色 / 字型 / 圓角 / 間距）：
- 用 `mcp__pencil__set_variables` 更新設計變數
- SYNC-STATUS Design Tokens 區塊：Pencil 欄 → ✓
- 警告：「Token 已在 .pen 同步；尚需在 PRD §6、DESIGN-PROMPT.md、tailwind.config.ts 同步」
- Standalone 模式於步驟 5 反向同步時一併處理；Embedded 模式交回 /apply 由 Phase C 的 token 變更偵測處理

## Guardrails

- **只透過 pencil MCP 工具操作 .pen**——絕對不用 Read/Grep/Edit
- **每次 batch_design 上限 25 ops**——超過要拆批
- **每完成邏輯單位必截圖驗證**——避免畫到一半節點關係跑掉
- **Standalone 模式必建 change**——確保有可追溯的 [change: ...] 備註
- **Embedded 模式不問 PRD 同步**——PRD 已在 /apply Phase A 動過，重複問會混亂
- **不寫 specs/tasks/design**——Standalone 模式只寫 proposal；其他 SDD 檔由後續 /apply 或 /propose 補
