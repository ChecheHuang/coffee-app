---
name: propose
description: >-
  提出新 change 並產出 SDD 4 件套（proposal/specs/tasks/design）。
  透過 AskUserQuestion 釐清需求後，在 openspec/changes/<name>/ 寫入 4 個檔案，
  並在 proposal frontmatter 標註是否會動到設計稿（needs_design）與 PRD（needs_prd_update）。
  此 skill 只規劃、不實作，不動 PRD / coffee-app-pencil.pen / app/ / SYNC-STATUS.md。
  使用時機：要新增功能、修正錯誤、重構、優化或任何需正式立案的修改。
  觸發關鍵詞：propose、提案、新功能、新 change、新需求、立案、規劃、planning。
---

# Propose

提出新 change，產出 SDD 4 件套。**只規劃、不動實體產物。**

## 範圍

| 會動 | 不動 |
|------|------|
| `openspec/changes/<name>/proposal.md` | `PRD.md` |
| `openspec/changes/<name>/specs/<capability>.md` | `coffee-app-pencil.pen` |
| `openspec/changes/<name>/tasks.md` | `app/`、`components/`、`src/` |
| `openspec/changes/<name>/design.md` | `SYNC-STATUS.md` |

PRD/.pen/code/SYNC-STATUS 全部留給 `/apply` 動。

## 步驟

### 1. 釐清需求

用 **AskUserQuestion** 問 1–3 題（按需擇用，不要全問）：

- **任務類型**：新增功能 / 修正錯誤 / 重構 / 效能優化
- **影響範圍**：單頁 / 跨頁 / 跨模組 / 全站
- **技術選擇**：依任務內容決定（狀態管理、UI 元件、資料來源等）

需要時 `Read` PRD 對應段落、`Grep` 既有實作以校準理解。

需求模糊或多解時，建議使用者先跑 `/explore`，再回頭跑 `/propose`。

### 2. 命名 change

從需求摘要建議一個 kebab-case 名稱（如 `add-recipe-share`、`fix-onboarding-step3`）。

用 **AskUserQuestion** 確認：
- 名稱是否合適
- 對應 capability（specs 子檔名）

若 `openspec list --json` 顯示已有同名 active change，提示重新命名或建議改跑 `/apply <existing>` 繼續既有提案。

### 3. 推導影響旗標

依 [`.claude/skills/sync-status/references/detection-rules.md`](../sync-status/references/detection-rules.md) 判斷：

| 旗標 | 判斷 |
|------|------|
| `needs_design: true` | 動到 UI／新增頁面或元件／改視覺結構／改 token |
| `needs_prd_update: true` | 動到使用者可見功能、頁面規格、互動行為 |
| `affected_pages: [...]` | 受影響頁面（從 SYNC-STATUS Pages 區塊取名） |
| `affected_components: [...]` | 受影響元件（從 SYNC-STATUS Components 區塊取名） |

旗標推導完成後，用 **AskUserQuestion** 讓使用者確認 / 補正受影響清單。

### 4. 產出 4 個 SDD 檔案

建立目錄 `openspec/changes/<name>/` 與 `openspec/changes/<name>/specs/`，寫入：

#### 4.1 `proposal.md`

```markdown
---
name: <change-name>
status: proposed
created: YYYY-MM-DD
needs_design: true | false
needs_prd_update: true | false
affected_pages: [Home, Drinks, ...]
affected_components: [Button, Card, ...]
---

## Why
<為什麼要做這件事——使用者價值、業務驅動、技術債清理>

## What
<會改變什麼——一段話描述範圍與成果>

## Out of scope
<這次不處理但相關的事>
```

#### 4.2 `specs/<capability>.md`

OpenSpec 風格的規格 delta：

```markdown
## ADDED Requirements

### Requirement: <name>
<行為描述，The system SHALL ...>

#### Scenario: <happy path>
- **WHEN** ...
- **THEN** ...

## MODIFIED Requirements
...

## REMOVED Requirements
...
```

#### 4.3 `tasks.md`

可勾選任務清單。UI 任務在末尾標 `[DESIGN]`，Token 任務標 `[TOKEN]`：

```markdown
## Implementation

- [ ] 1. 在 src/types/ 新增 ShareLink 型別
- [ ] 2. 新增 useShareStore（zustand）
- [ ] 3. Drink Detail 頁加入分享按鈕 [DESIGN]
- [ ] 4. 處理分享連結 deep link
```

#### 4.4 `design.md`

技術設計筆記（資料流、決策、權衡）。若 change 不需技術設計可放單行說明：

```markdown
## Context
<背景與限制>

## Decisions
<關鍵技術決策與替代方案>

## Risks / Open questions
<已知風險與待決問題>
```

### 5. 顯示摘要

```
## Proposal created: <change-name>

**Files:**
- openspec/changes/<name>/proposal.md
- openspec/changes/<name>/specs/<capability>.md
- openspec/changes/<name>/tasks.md
- openspec/changes/<name>/design.md

**Flags:**
- needs_design: true
- needs_prd_update: true
- affected_pages: [Drinks, drink/[id]]
- affected_components: [Button]
```

### 6. 交接點

用 **AskUserQuestion** 問下一步（4 選 1）：

- "立刻 /apply <name> (Recommended)" — 同 session 繼續，保留釐清過程的脈絡
- "/compact 後 /apply <name>" — 提示使用者輸入 `/compact` 壓縮摘要、再 `/apply <name>`。保留決策脈絡但釋放 token
- "/clear 後 /apply <name>" — 提示使用者輸入 `/clear` 全清、再 `/apply <name>`。SDD 4 件套已落地，新 session 從文檔重啟最乾淨
- "稍後再實作" — 結束本 session，提示下次跑 `/apply <name>`

**Claude 無法主動觸發 `/clear` 或 `/compact`——必須由使用者手動輸入。** 本 skill 只回應確認訊息與下一步指令，不嘗試自動清理。

## Guardrails

- 一個 change 只處理一個焦點問題；過大時建議拆成多個 proposal
- 不直接寫 PRD、不直接畫 .pen、不直接改 code、不動 SYNC-STATUS——這些是 `/apply` 的職責
- frontmatter 旗標必填；`/apply` 完全依賴它判斷流程分支
- `affected_pages` / `affected_components` 命名必須對得上 SYNC-STATUS.md 的 Item 欄
- 若使用者在問題回答中提供了 frontmatter 已有的資訊，直接採用，不要重複問
