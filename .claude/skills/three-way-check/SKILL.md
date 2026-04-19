---
name: three-way-check
description: >-
  純讀體檢工具：橫向比對 PRD ↔ Pencil 設計稿 ↔ 程式碼三者是否同步。
  涵蓋 Pages、Components、Design Tokens 三類，輸出表格 + 摘要到對話中（不寫檔、不動 SYNC-STATUS）。
  發現 drift 時推薦進 /apply 修；可選掛上 Run-and-Verify Gate 跨 browser 實證。
  使用時機：定期健康檢查、大改動前後驗證、想看現況、想知道哪些頁面/元件/token 失同步。
  觸發關鍵詞：three-way-check、體檢、健康檢查、檢查同步、check sync、查看現況、三者比對、確認對齊、artifact check。
---

# Three-Way Check

純讀體檢三者同步狀態。**不寫任何檔案、不動 SYNC-STATUS。**

## 範圍

| 會做 | 不會做 |
|------|--------|
| Read PRD / SYNC-STATUS / src/types / tailwind.config.ts | 改 PRD / 改 .pen / 改 code |
| `mcp__pencil__batch_get` 取設計節點屬性 | 改 SYNC-STATUS 任何欄位 |
| Glob / Grep 程式碼 | 跑 dev server / 動 mocks |
| 輸出表格 + 摘要到對話 | 寫報告檔、寫日誌 |
| 推薦下一步（/apply 修） | 自動觸發其他 skill |

## 步驟

### 1. 讀 SYNC-STATUS 取對象清單

`Read` `SYNC-STATUS.md`，提取：
- Pages 區塊所有 Item + Pencil 節點 ID（從錨點欄推導）
- Components 區塊所有 Item + Pencil 節點 ID
- Design Tokens 區塊所有 Token

### 2. 對 Pages 三欄比對

對每個 Page：

| 欄位 | 取得方式 |
|------|----------|
| PRD 是否有規格 | Grep `PRD.md` 找 `### 5.X <PageName>` 對應段 |
| Pencil 是否有節點 | `mcp__pencil__batch_get` 用節點 ID 取屬性 |
| Code 是否有實作 | Glob `app/**/*.tsx` 找對應路由檔案 |

判斷三欄一致性：
- 三者都存在且大致對齊 → ✓
- 任一缺失 → ✗ + 缺失原因
- 三者都在但內容不一致 → ⚠ + 一行差異摘要

### 3. 對 Components 三欄比對

對每個 Component：

| 欄位 | 取得方式 |
|------|----------|
| PRD 是否描述 | Grep `PRD.md` 找元件名稱（PascalCase） |
| Pencil 是否有節點 | `mcp__pencil__batch_get` 用節點 ID |
| Code 是否有檔案 | Glob `components/**/*.tsx` |

### 4. 對 Design Tokens 四源比對

對每個 Token：

| 欄位 | 取得方式 |
|------|----------|
| PRD | Grep `PRD.md §6 設計系統` |
| DESIGN-PROMPT | Grep `DESIGN-PROMPT.md Style Guide` |
| Tailwind | Read `tailwind.config.ts` theme.extend |
| Pencil | `mcp__pencil__get_variables` |

統一色彩格式為 hex 比較；忽略大小寫。

### 5. 輸出三段表格 + 整體摘要

```
=== Pages ===

| Item       | PRD | Pencil | Code | 狀態          |
|------------|-----|--------|------|---------------|
| Home       | ✓   | ✓      | ✓    | 對齊          |
| Drinks     | ✓   | ✓      | ✓    | 對齊          |
| Schedule   | ✓   | ✓      | ⚠    | Code 缺路由檔 |

=== Components ===
...

=== Design Tokens ===

| Token         | PRD | DESIGN-PROMPT | Tailwind | Pencil | 狀態        |
|---------------|-----|---------------|----------|--------|-------------|
| gold (#C9A962)| ✓   | ✓             | ✓        | ✓      | 對齊        |
| text-tertiary | ✓   | ⚠             | ✓        | ⚠      | 兩源未驗證  |

=== 整體摘要 ===
- Pages 對齊: 11/12（1 缺）
- Components 對齊: 7/14（7 缺 PRD 規格）
- Tokens 對齊: 12/19（7 項待驗證）
- 整體健康度: 🟡 良好（小問題待修）
```

### 6. Drift 處理

若發現任何 ✗ 或 ⚠：

用 **AskUserQuestion**：
- "用 /apply 修這些差異（推薦）" — 列出建議的 change 名稱與範圍，提示使用者跑 `/propose` 或 `/apply` 接手
- "只看報告不修" — 結束 session
- "標進 SYNC-STATUS 備註讓我之後追" — 提示這需要由 /apply 動，本 skill 不寫表

### 7. 可選 Run-and-Verify Gate

報告印完後，用 **AskUserQuestion**：
- "不需跨 browser 驗證（推薦，快路徑）" — 結束
- "對選定頁面跨 browser 驗證" — 列出可選頁面（多選），對每頁依 [`run-verify-gate.md`](../sync-status/references/run-verify-gate.md) 跑：開 dev server、navigate、截圖、互動、Console 檢查；結果附在報告末段（仍不寫 SYNC-STATUS，因為這是 read-only skill）

---

## Guardrails

- **不寫 SYNC-STATUS、不寫任何檔**——這是純讀工具
- **不自動跳轉到 /apply**——只能推薦
- **Pencil 比對只用 MCP 工具**——不用 Read/Grep 讀 .pen
- **發現 drift 不要靜默修**——必經 AskUserQuestion 詢問是否進 /apply
- **色彩比對統一 hex 大寫**——避免 #c9a962 與 #C9A962 被誤判為不一致
- **不重做 src/types ↔ PRD 比對**——PRD 已不含資料模型；型別由 tsc 與測試驗證
