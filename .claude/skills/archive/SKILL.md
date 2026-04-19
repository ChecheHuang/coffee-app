---
name: archive
description: >-
  結案已完成的 change：檢查 tasks 全完成、Sync Status Gate（讀-only 確認三欄全綠）、
  詢問使用者要「歸檔保留」（mv 到 archive/）或「直接刪除不留紀錄」（rm -rf）。
  使用時機：/apply 全綠後使用者選擇結案、想手動結案某個 change。
  觸發關鍵詞：archive、歸檔、結案、結束 change、完成這個 change、收尾、刪除 change。
---

# Archive

結案已完成的 change。**只讀 SYNC-STATUS（不寫）；只動 openspec/changes/ 內的目錄。**

## 範圍

| 會做 | 不會做 |
|------|--------|
| 讀 tasks.md 統計完成度 | 改 PRD / 改 .pen / 改 code |
| 讀 SYNC-STATUS 做 Sync Status Gate | 寫 SYNC-STATUS（任何欄位都不動） |
| 問使用者：歸檔 / 直接刪除 / 中止 | 補完未完成的 task |
| `mv` 到 `archive/YYYY-MM-DD-<name>/` 或 `rm -rf` | 自動觸發其他 skill |
| 顯示結案摘要 | 未經使用者同意的刪除 |

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

### 3. 選擇處置方式

**必經 AskUserQuestion**（不可預設動作）：

- "歸檔保留 (Recommended)" — `mv` 到 `archive/YYYY-MM-DD-<name>/`，保留可追溯歷史
- "直接刪除不留紀錄" — `rm -rf openspec/changes/<name>/`，完全消失（適用於草案、誤建、不值得留檔的小修）
- "中止" — 退出，不動目錄

選 "直接刪除不留紀錄" 時，再次確認：
- "確認刪除（不可復原，除非有 git 歷史）" — 繼續
- "改成歸檔" — 切回歸檔
- "中止" — 退出

### 4. 執行處置

#### 4a. 歸檔分支

```bash
mkdir -p openspec/changes/archive
```

目標路徑：`openspec/changes/archive/YYYY-MM-DD-<name>/`

衝突檢查：
- 若目標已存在 → 失敗，提示使用者改名或改日期
- 否則 `mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>`
- 若 `mv` 因檔案 lock（IDE 開著）失敗，fallback：`cp -r` + `rm -rf` 原目錄

#### 4b. 刪除分支

```bash
rm -rf openspec/changes/<name>
```

刪除前再次顯示將被移除的檔案清單（最多列 20 行），確認後執行。

### 5. 顯示摘要

歸檔模式：
```
## Archive Complete

**Change:** <name>
**Action:** 歸檔保留
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/

### Tasks
- 完成: M/N
- 未完成: 0  （或：⚠ 強制歸檔，N 個 task 未完成）

### Sync Status Gate
- ✓ 全部對齊  （或：⚠ 強制歸檔，未同步項：[列表]）

### Next steps
- (none)  （或：完成未同步項、收尾測試等建議）
```

刪除模式：
```
## Removed

**Change:** <name>
**Action:** 直接刪除（無 archive 紀錄）
**Removed:** openspec/changes/<name>/ （N 個檔案）

### Tasks (snapshot)
- 完成: M/N

### Sync Status Gate (snapshot)
- ✓ 通過 / ⚠ 強制刪除

### Recovery
- 若需還原，請查 git 歷史（`git log --diff-filter=D --name-only` 找該路徑）
```

### 6. 交接點

用 **AskUserQuestion** 問下一步（4 選 1）：

- "立刻 /propose 下一個" — 同 session 繼續，適用於相關 change 連環處理（脈絡可重用）
- "/compact 後 /propose" — 提示使用者輸入 `/compact` 壓縮摘要、再 `/propose`。保留結案決策但釋放 token，適合接相關但不依賴細節的下個 change
- "/clear 後 /propose (Recommended for unrelated work)" — 提示使用者輸入 `/clear` 全清、再 `/propose`。本 change 已結案，下一個若無關聯，新 session 從零最乾淨
- "稍後處理" — 結束本 session

**Claude 無法主動觸發 `/clear` 或 `/compact`——必須由使用者手動輸入。** 本 skill 只回應確認訊息與下一步指令，不嘗試自動清理。

---

## Guardrails

- **不寫 SYNC-STATUS**——這是讀-only Gate
- **不補完 task**——結案不是實作的延伸；未完成請回 /apply
- **刪除前必問**——「直接刪除」是會破壞性的選項，必經 AskUserQuestion 兩段確認；預設選項一律是「歸檔保留」
- **未經明確同意絕不 rm**——若使用者沒回答或回答「中止」，目錄保持原樣
- **強制結案必標註**——summary 必須註明 ⚠ 與原因，避免後人誤以為一切順利
- **歸檔目標路徑衝突要提示**——絕不覆蓋既有 archive 目錄
- **mv 失敗時用 cp+rm fallback**——Windows 上 IDE 開檔會 lock；不可放棄結案
- **proposal status 不更新**——保留原 frontmatter；要更新請使用者手動或建後續 change
