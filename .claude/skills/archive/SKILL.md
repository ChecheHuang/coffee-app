---
name: archive
description: >-
  歸檔已完成的 change：檢查 tasks 全完成、Sync Status Gate（讀-only 確認三欄全綠）、
  把 openspec/changes/<name>/ 移到 openspec/changes/archive/YYYY-MM-DD-<name>/。
  使用時機：/apply 全綠後使用者選擇歸檔、想手動結案某個 change。
  觸發關鍵詞：archive、歸檔、結案、結束 change、完成這個 change、收尾。
---

# Archive

歸檔已完成的 change。**只讀 SYNC-STATUS（不寫）；只動 openspec/changes/ 內的目錄移動。**

## 範圍

| 會做 | 不會做 |
|------|--------|
| 讀 tasks.md 統計完成度 | 改 PRD / 改 .pen / 改 code |
| 讀 SYNC-STATUS 做 Sync Status Gate | 寫 SYNC-STATUS（任何欄位都不動） |
| `mv openspec/changes/<name>/` 到 `archive/YYYY-MM-DD-<name>/` | 補完未完成的 task |
| 顯示歸檔摘要 | 自動觸發其他 skill |

## 步驟

### 0. 選定 change

- 若指定名稱直接用
- 否則 `openspec list --json` + **AskUserQuestion** 讓使用者選（只列 active changes，不列已 archived）

公告：「Archiving: <name>」

### 1. 檢查 tasks 完成度

`Read` `openspec/changes/<name>/tasks.md`，統計 `- [ ]` 與 `- [x]`。

若有未完成 task：
- 顯示未完成清單
- 用 **AskUserQuestion**：
  - "中止歸檔" — 退出
  - "強制歸檔（記錄於 summary）" — 繼續，但 summary 標 ⚠

### 2. Sync Status Gate（讀-only）

`Read` `SYNC-STATUS.md`，掃描所有「備註」欄含 `[change: <name>]` 的列。

判斷：
- **全部三欄都 ✓ 且備註已清空** → 通過 Gate
- **仍有 ✗ 或 ⚠，或備註仍含此 change ID** → 列出未同步項

未通過時，用 **AskUserQuestion**：
- "回頭同步（推薦）" — 中止歸檔；提示「請先 `/apply <name>` 補完同步，或 `/three-way-check` 確認狀態」
- "強制歸檔（記錄於 summary）" — 繼續，summary 標 ⚠

**此 skill 絕對不寫 SYNC-STATUS。** 完整契約見 [`integration-contract.md`](../sync-status/references/integration-contract.md)。

### 3. 執行歸檔

```bash
mkdir -p openspec/changes/archive
```

目標路徑：`openspec/changes/archive/YYYY-MM-DD-<name>/`

衝突檢查：
- 若目標已存在 → 失敗，提示使用者改名或改日期
- 否則 `mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>`

### 4. 顯示摘要

```
## Archive Complete

**Change:** <name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/

### Tasks
- 完成: M/N
- 未完成: 0  （或：⚠ 強制歸檔，N 個 task 未完成）

### Sync Status Gate
- ✓ 全部對齊  （或：⚠ 強制歸檔，未同步項：[列表]）

### Next steps
- (none)  （或：完成未同步項、收尾測試等建議）
```

---

## Guardrails

- **不寫 SYNC-STATUS**——這是讀-only Gate
- **不補完 task**——歸檔不是實作的延伸；未完成請回 /apply
- **不刪 change**——歸檔是 mv 不是 rm；保留歷史可追溯
- **強制歸檔必標註**——summary 必須註明 ⚠ 與原因，避免後人誤以為一切順利
- **目標路徑衝突要提示**——絕不覆蓋既有 archive 目錄
- **proposal status 不更新**——保留原 frontmatter；要更新請使用者手動或建後續 change
