---
name: apply
description: >-
  實作一個 change 的完整流程。四階段：
  Phase A 自動依 proposal+specs 產生 PRD diff、確認後寫入、cascade 取消同步表 Pencil/Code 勾。
  Phase B 內部呼叫 /pencil-draw 同步設計稿，再做 PRD↔設計比對；gap 則停下問你。
  Phase C 開 Chrome mobile MCP 全程保活，逐 task 實作前後 diff DOM；每 task 完成即時勾回 SYNC-STATUS。
  Phase D 全綠後問是否立刻 /archive。
  使用時機：要開始實作、繼續實作、apply 某個 change。
  觸發關鍵詞：apply、開始實作、繼續實作、實作這個 change、做這個。
---

# Apply

執行一個 change 的完整實作流程。**唯一會動 PRD / .pen / code / SYNC-STATUS 的 skill**。

## 階段總覽

```
┌─[Phase A] PRD 同步 ─────────────────────────────────────┐
│ 自動依 proposal+specs 產 PRD diff → 你確認 → 寫入       │
│ → cascade 取消對應列 Pencil + Code 勾                    │
└──────────────────────────────────────────────────────────┘
┌─[Phase B] 設計同步 ─────────────────────────────────────┐
│ 內部呼叫 /pencil-draw 完成 .pen 變更                      │
│ → PRD↔設計比對 → gap 則停下問你                           │
│ → 通過後 Pencil 欄回 ✓                                    │
└──────────────────────────────────────────────────────────┘
┌─[Phase C] 程式碼同步 ───────────────────────────────────┐
│ 開 Chrome mobile MCP（一個 /apply session 全程保活）     │
│ → 逐 task：實作前看 Pencil → Edit → 實作後看 DOM diff    │
│ → 過 Run-and-Verify Gate → SYNC-STATUS Code 欄即時 ✓     │
│ → 修改 token 檔則警告四源同步                             │
└──────────────────────────────────────────────────────────┘
┌─[Phase D] 收尾 ─────────────────────────────────────────┐
│ 全綠 → 問是否立刻 /archive                                │
└──────────────────────────────────────────────────────────┘
```

## 步驟

### 0. 選定 change

- 若指定名稱直接用
- 否則 `openspec list --json` + **AskUserQuestion** 讓使用者選
- 公告：「Using change: <name>」

讀取以下檔案到 context：
- `openspec/changes/<name>/proposal.md`（特別是 frontmatter）
- `openspec/changes/<name>/specs/<capability>.md`
- `openspec/changes/<name>/tasks.md`
- `openspec/changes/<name>/design.md`

從 proposal frontmatter 取出：
- `needs_prd_update`
- `needs_design`
- `affected_pages`
- `affected_components`

---

### Phase A — PRD 同步

#### A.1 判斷是否需更新 PRD

- `needs_prd_update: false` → 跳到 Phase B
- `needs_prd_update: true` → 繼續

#### A.2 自動生成 PRD diff 候選

從 proposal + specs ADDED/MODIFIED/REMOVED 推導 PRD 對應段落變更。輸出 unified diff 格式。

對每個 affected page，找到 PRD `## 5.X <頁面>` 對應段落；對 token 變更，找 PRD `## 6 設計系統` 段落。

#### A.3 確認

用 **AskUserQuestion**：
- "套用全部 diff（推薦）" — 一次寫入 PRD
- "逐項挑選" — 列出每個 hunk 讓使用者選
- "中止 PRD 更新" — 退出 /apply

#### A.4 寫入 PRD + cascade 取消同步表

寫入 `PRD.md` 後，依 [`detection-rules.md`](../sync-status/references/detection-rules.md) 對 SYNC-STATUS 執行 cascade：

| affected | 動作 |
|----------|------|
| affected_pages 對應列 | Pencil → ✗（若 `needs_design`）、Code → ✗ |
| affected_components 對應列 | 同上 |
| token 變更 | Design Tokens 區塊：DESIGN-PROMPT/Tailwind/Pencil 三欄 → ✗；可能波及全 Pages/Components → ✗ |
| 所有受影響列 | 備註欄：`[change: <name>] PRD <一行說明>` |
| 受影響列 + 表頭 | 「最後驗證」與 `Last update` → 今天 |

寫入規則完整版見 [`integration-contract.md`](../sync-status/references/integration-contract.md)，符號規範見 [`format-spec.md`](../sync-status/references/format-spec.md)。

---

### Phase B — 設計同步

#### B.1 判斷是否需動設計

- `needs_design: false` → 跳到 Phase C
- `needs_design: true` → 繼續

#### B.2 內部呼叫 /pencil-draw

對 `affected_pages + affected_components`，使用 **Skill** 工具呼叫 `pencil-draw`，帶入：
- change 名稱
- 受影響清單
- PRD 對應段落摘要

`/pencil-draw` 完成後，.pen 已更新；該頁面/元件的 Pencil 欄此時應由 `/pencil-draw` 寫成 ✓。

#### B.3 PRD↔設計比對

對每個 affected_pages / affected_components：

1. 從 PRD 取規格摘要（標題、互動、佈局元素清單）
2. 從 Pencil 用 `mcp__pencil__batch_get` 取對應節點屬性
3. 比對：
   - PRD 提到的元素是否都在 Pencil 中
   - PRD 描述的互動是否有對應的設計呈現
   - 命名與順序是否大致一致

#### B.4 Gap 處理

若有 gap，**AskUserQuestion**：
- "回頭重畫" — 再次 Skill 呼叫 `pencil-draw` 補洞
- "接受差異" — 在 SYNC-STATUS 該列備註欄記 `[change: <name>] 設計差異已接受：<摘要>`
- "中止 apply" — 退出，保留半成品狀態

通過後不動 SYNC-STATUS（Pencil 欄已由 /pencil-draw 寫過）。

---

### Phase C — 程式碼同步

#### C.1 啟動 Chrome mobile session（全程保活）

```
1. 確保 dev server 在 8081 運行（未運行則 npm start &）
2. mcp__chrome-devtools__new_page → 設 mobile viewport（375 × 812）
3. 初次 navigate 到任一 affected page，確認頁面可載入
```

**這個 session 在整個 /apply 中保活**，不要每個 task 都關開。

#### C.2 逐 task 實作循環

對 `tasks.md` 每個未完成任務（`- [ ]`），按順序執行：

##### a. 讀脈絡

- task 描述
- PRD 對應段落（從 affected_pages 找）
- specs 對應 requirement
- design.md 對應決策

##### b. 實作前看設計（僅 UI / `[DESIGN]` 任務）

```
mcp__pencil__batch_get(...) → 取得目標節點的 typography / colors / spacing / layout
```

把設計屬性寫進 task notes，作為實作目標。

##### c. 實作

`Edit` / `Write` 程式碼。改動範圍嚴格限定於該 task。

##### d. 實作後看實際（僅 UI / `[DESIGN]` 任務）

```
mcp__chrome-devtools__navigate_page → 對應路由
mcp__chrome-devtools__take_snapshot
mcp__chrome-devtools__evaluate_script → 取目標元素的 computed styles
```

##### e. Diff 化進

把 b 取的設計屬性與 d 取的實際屬性 diff：
- `fontSize 18 → 16`
- `gap 24 → 16`
- ...

不一致則微調 className，重跑 d 再次 verify。

##### f. Run-and-Verify Gate

依 [`run-verify-gate.md`](../sync-status/references/run-verify-gate.md) 執行：
- 載入確認（截圖無紅屏 / 缺字）
- 互動確認（按鈕點得到、跳轉對）
- Console 無紅色 error
- 回歸檢查（依變更類型挑 3 個鄰近頁）

**未通過 Gate 不允許標 task 完成、不允許勾 Code ✓。**

##### g. 標記 task 完成

```
- [ ] N. <task> → - [x] N. <task>
```

##### h. 寫回 SYNC-STATUS

對該 task 影響的 Pages / Components 列：
- Code 欄 → ✓
- 「最後驗證」→ 今天
- 若三欄都回 ✓，清空備註欄
- 表頭 `Last update` → 今天

#### C.3 Token 變更偵測

若任一 task 修改了 `tailwind.config.ts` 或 `src/constants/theme.ts`：

```
⚠ 偵測到 token 變更：<變更摘要>

需同步以下三處：
- PRD.md §6 設計系統
- DESIGN-PROMPT.md Style Guide
- coffee-app-pencil.pen（透過 /pencil-draw 設計變數）
```

用 **AskUserQuestion**：
- "立刻同步（推薦）" — 自動補 PRD 與 DESIGN-PROMPT，提示啟動 /pencil-draw 改 .pen
- "記到備註稍後處理" — Token 列備註寫 `[change: <name>] <token> 變更，PRD/DESIGN-PROMPT/Pencil 待同步`
- "跳過" — 不寫備註，靜默繼續

---

### Phase D — 收尾

1. 顯示完成摘要：
   - 完成 task 數 / 總數
   - 受影響 Pages / Components 三欄當前狀態
   - Token 變更（若有）
2. 若所有受影響列三欄全綠：用 **AskUserQuestion**：
   - "立刻 /archive（推薦）"
   - "稍後處理"
3. 若仍有未完成 task 或未綠列：顯示待辦並結束本 session

---

## 互動驗證 Gate

C.2.f 的 Run-and-Verify Gate 是寫 ✓ 至 SYNC-STATUS Code 欄的**前置條件**。完整規範（何時觸發、何時可跳過、失敗處理）見 [`.claude/skills/sync-status/references/run-verify-gate.md`](../sync-status/references/run-verify-gate.md)。

## SYNC-STATUS 寫入契約

完整契約見 [`.claude/skills/sync-status/references/integration-contract.md`](../sync-status/references/integration-contract.md)。/apply 是契約中「實作 skill」的角色。

## Guardrails

- **Chrome session 一個 /apply 開一次保活**；中途不關不重啟，跨 task 共用
- **不私自跳過 PRD 同步**：`needs_prd_update: true` 時必經 Phase A，不要因為 task 簡單就略過
- **不私自接受設計 gap**：必經 AskUserQuestion，不可在沒問的情況下標備註「接受」
- **每 task 完成立即寫 SYNC-STATUS**：不批次更新，避免中途中斷導致表格與實際進度不符
- **Token 變更必警告**：靜默修改 token 是高風險，會波及全站；必經 AskUserQuestion
- **Run-and-Verify Gate 不可繞過**：寫 ✓ 至 Code 欄前必過；使用者明確跳過時要在備註標註
- **Phase A 後不要回頭改 proposal/specs**：發現 proposal 有誤時，停下來建議使用者改 `/propose` 或在 plan mode 重議；不要在 /apply 中悄悄改 SDD
