# 整合契約：其他 skill 如何讀寫 SYNC-STATUS.md

本檔案規定既有 skill 在何時、寫入哪個欄位。所有 skill 都用 `Edit` 工具直接修改 `SYNC-STATUS.md`，遵守 [format-spec.md](format-spec.md) 的格式。

每次寫入後，更新檔案頂部 blockquote 的 `Last update: YYYY-MM-DD`。

---

## /propose

**寫入時機**：不寫入。

`/propose` 只規劃、不動實體產物。SYNC-STATUS 表格的勾選交給 `/apply` 在 Phase A 動。

---

## /apply

`/apply` 是唯一一個會跨 PRD / .pen / code 同步並動 SYNC-STATUS 的 skill，分四階段寫入。

### Phase A — PRD 同步後

寫入 affected_pages / affected_components / 受影響 token：

| 欄位 | 動作 |
|------|------|
| Pages 對應列 Pencil | `✗`（若 `needs_design`） |
| Pages 對應列 Code | `✗` |
| Components 對應列 Pencil | `✗`（若 `needs_design`） |
| Components 對應列 Code | `✗` |
| Design Tokens 對應列 DESIGN-PROMPT/Tailwind/Pencil | `✗`（若有 token 變更） |
| 受影響列備註 | `[change: <name>] PRD <一行說明>` |
| 「最後驗證」 | 今天 `YYYY-MM-DD` |
| 表頭 `Last update` | 今天 |

Cascade 規則細節見 [detection-rules.md](detection-rules.md)。

### Phase B — 設計同步後

不直接寫；由內呼的 `/pencil-draw` Embedded 模式寫 Pencil 欄。

### Phase C — 每完成一個 task 後

| 欄位 | 動作 |
|------|------|
| 該 task 影響的 Pages / Components 列 Code 欄 | `✓`（必先過 Run-and-Verify Gate） |
| 「最後驗證」 | 今天 |
| 三欄全綠時備註欄 | 清空 |
| 表頭 `Last update` | 今天 |

寫 `✓` 至 Code 欄前的 Gate 規範見 [run-verify-gate.md](run-verify-gate.md)。

### Phase D — 收尾

不寫；只讀 + 建議下一步。

---

## /pencil-draw

### Standalone 模式

**寫入時機**：完成 .pen 變更後。

| 欄位 | 動作 |
|------|------|
| 受影響 Pages / Components Pencil 欄 | `✓` |
| 受影響 Pages / Components Code 欄 | `✗` |
| Design Tokens 對應列 Pencil 欄（若改 token） | `✓` |
| 受影響列備註 | `[change: pencil-only-<ts>] Pencil 已更新 <一行說明>，待 Code 同步` |
| 「最後驗證」 | 今天 |
| 表頭 `Last update` | 今天 |

若使用者於後續步驟選擇「同步 PRD」：PRD 欄維持 `✓`；選「不同步」則 PRD 欄 → `✗` 並備註 `PRD 待同步`。

### Embedded 模式（由 /apply Phase B 呼叫）

| 欄位 | 動作 |
|------|------|
| 受影響列 Pencil 欄 | `✓` |
| 「最後驗證」 | 今天 |
| 備註 | **不動**（保留 /apply Phase A 寫入的 [change: <name>] 備註） |
| 表頭 `Last update` | 今天 |

不動 Code 欄（由 /apply Phase C 寫）、不動 PRD 欄（已在 Phase A 寫）。

---

## /three-way-check

**寫入時機**：不寫入。

純讀體檢工具，輸出表格與摘要到對話即可。任何 drift 推薦給使用者進 `/apply` 修，不自動寫表。

---

## /archive

**寫入時機**：不寫入。

只讀 SYNC-STATUS 做 Sync Status Gate（檢查 `[change: <name>]` 備註是否已清空、三欄是否全綠）。Gate 未過時提示使用者回 /apply 補完。

---

## /explore

**寫入時機**：不寫入。

純對話 skill，只 Read PRD/code 校準討論基礎；不動任何檔。

---

## 寫入流程通則

每個寫入 SYNC-STATUS 的 skill 標準步驟：

1. `Read` SYNC-STATUS.md
2. 用 `Edit` 修改對應列的目標欄位
3. 修改該列「備註」與「最後驗證」
4. 修改檔案頂部 `Last update: YYYY-MM-DD`

若被寫入的列不存在於表中（例如新增的頁面/元件），於備註中註明 `item not in table`，並在後續 session 由使用者執行 `/sync-status` 補列。

## 衝突處理

- 多個 skill 在同一對話中先後寫入同一列：以最後寫入為準（無需鎖）
- 使用者手動編輯了 SYNC-STATUS.md：尊重其修改，不要回滾
- 若發現格式不符（symbol 用了 `[x]` 之類）：靜默修正為標準符號

## 不要做的事

- ❌ 不要為了「好看」而改變欄位順序
- ❌ 不要新增欄位（除非先更新 format-spec.md）
- ❌ 不要把備註寫成多行
- ❌ 不要在沒驗證時就打勾（每次打勾都代表「我剛剛驗證過」）
- ❌ 不要在 read-only skill（/three-way-check / /archive / /explore / /propose）中寫表
