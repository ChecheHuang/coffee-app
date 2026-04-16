---
name: openspec-apply-change
description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.3.0"
---

Implement tasks from an OpenSpec change.

**Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:apply <other>`).

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "spec-driven")
   - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

3. **Get apply instructions**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   This returns:
   - Context file paths (varies by schema - could be proposal/specs/design/tasks or spec/tests/implementation/docs)
   - Progress (total, complete, remaining)
   - Task list with status
   - Dynamic instruction based on current state

   **Handle states:**
   - If `state: "blocked"` (missing artifacts): show message, suggest using openspec-continue-change
   - If `state: "all_done"`: congratulate, suggest archive
   - Otherwise: proceed to implementation

4. **Read context files**

   Read the files listed in `contextFiles` from the apply instructions output.
   The files depend on the schema being used:
   - **spec-driven**: proposal, specs, design, tasks
   - Other schemas: follow the contextFiles from CLI output

5. **Show current progress**

   Display:
   - Schema being used
   - Progress: "N/M tasks complete"
   - Remaining tasks overview
   - Dynamic instruction from CLI

6. **Implement tasks (loop until done or blocked)**

   For each pending task:
   - Show which task is being worked on
   - Make the code changes required
   - Keep changes minimal and focused
   - Mark task complete in the tasks file: `- [ ]` → `- [x]`
   - Continue to next task

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - Error or blocker encountered → report and wait for guidance
   - User interrupts

7. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Overall progress: "N/M tasks complete"
   - If all done: suggest archive
   - If paused: explain why and wait for guidance

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! Ready to archive this change.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**Design Consistency Check (UI 任務完成後)**

當一個涉及 UI 變更的任務完成後（修改了 `app/` 下的 `.tsx`、`components/` 下的元件、或樣式相關檔案），**自動執行** design-compare 流程：

1. **自動觸發設計稿比對**
   - 判斷條件：任務涉及頁面佈局、元件樣式、色彩、間距、或任何視覺呈現的變更
   - 標記任務完成後，**直接執行** `/design-compare` 的完整流程（不只是提示）：
     1. 根據修改的檔案自動推斷對應路由（如修改 `app/(tabs)/drinks.tsx` → 比對 `/drinks`）
     2. 確保 dev server 在 port 8081 運行（未運行則自動啟動）
     3. 用 Puppeteer 擷取實際頁面 DOM 結構與 computed styles
     4. 讀取 Pencil 設計稿對應頁面的設計節點屬性
     5. 執行結構化比對，產出差異報告
     6. 若有差異，列出具體屬性差異並詢問是否立即修復
   - 若修改涉及多個頁面，逐一比對每個受影響的頁面

2. **互動效果驗證**
   - 判斷條件：任務涉及動畫（Reanimated withTiming/withSpring、entering/exiting）、手勢互動（點擊回饋、滑動、長按）、狀態切換（loading/active/disabled）、或導航轉場
   - 在靜態比對完成後，透過 Chrome DevTools MCP 工具實際操作頁面驗證：
     1. 用 `mcp__chrome-devtools__take_screenshot` 擷取初始狀態截圖
     2. 根據任務描述的互動行為，用對應工具觸發互動：
        - 點擊：`mcp__chrome-devtools__click`
        - 滑動/拖曳：`mcp__chrome-devtools__drag`
        - 懸停效果：`mcp__chrome-devtools__hover`
        - 鍵盤操作：`mcp__chrome-devtools__press_key`
     3. 用 `mcp__chrome-devtools__wait_for` 等待動畫/轉場完成
     4. 再次 `mcp__chrome-devtools__take_screenshot` 擷取互動後狀態截圖
     5. 比對設計稿中定義的互動預期結果（從 Pencil 的頁面間關聯或 task 描述推斷）
     6. 用 `mcp__chrome-devtools__evaluate_script` 檢查動畫屬性是否正確（如 opacity、transform、duration）
   - 驗證項目：
     - 動畫是否流暢播放（無閃爍、無卡頓）
     - 互動後的視覺狀態是否符合設計稿
     - 狀態切換（active/disabled/loading）的樣式是否正確
     - 導航轉場的目標頁面是否正確
   - 若發現互動異常，截圖附上具體描述並詢問是否修復
   - 若任務不涉及互動效果，跳過此步驟
   - 驗證完成後再繼續下一個任務

3. **Design Token 變更偵測**
   - 若任務修改了 `tailwind.config.ts` 或 `src/constants/theme.ts` 中的 token
   - 警告使用者需同步更新其他三處（PRD、DESIGN-PROMPT、.pen）：
     ```
     ⚠ 偵測到 Design Token 變更，請確認以下檔案已同步：
     - PRD.md (Design System 章節)
     - DESIGN-PROMPT.md (Style Guide Speed Lookup)
     - coffee-app-pencil.pen (透過 pencil-adjust 更新)
     ```

4. **新元件/頁面檢查**
   - 若任務建立了新的頁面檔案（`app/` 下的 .tsx）或重要元件
   - 檢查 PRD 和 DESIGN-PROMPT 中是否有對應定義
   - 若缺失，提醒使用者補充

**Guardrails**
- Keep going through tasks until done or blocked
- Always read context files before starting (from the apply instructions output)
- If task is ambiguous, pause and ask before implementing
- If implementation reveals issues, pause and suggest artifact updates
- Keep code changes minimal and scoped to each task
- Update task checkbox immediately after completing each task
- Pause on errors, blockers, or unclear requirements - don't guess
- Use contextFiles from CLI output, don't assume specific file names

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
- **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
