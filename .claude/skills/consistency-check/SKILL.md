---
name: consistency-check
description: >-
  全面審計 PRD、Pencil 設計稿與程式碼之間的一致性。涵蓋四項檢查：
  (1) 設計稿 ↔ UI 頁面比對 (2) PRD ↔ 設計稿功能覆蓋度 (3) Design Token 四源頭同步
  (4) PRD 資料模型 ↔ TypeScript 型別對應。
  使用時機：想確認專案三大產物（PRD、設計、程式碼）是否對齊、做全面健康檢查、或在大改動前後驗證一致性。
  觸發關鍵詞：consistency check、一致性檢查、健康檢查、全面審計、artifact check、檢查一致性、對齊檢查、同步檢查。
---

# Consistency Check

全面審計 PRD ↔ Pencil 設計稿 ↔ 程式碼的一致性，產出結構化報告。

## 檢查範圍選擇

用 **AskUserQuestion** 詢問要執行哪些檢查（multiSelect）：

- "設計稿 ↔ UI 比對" — 比對 Pencil 與實際頁面（需要 dev server）
- "PRD ↔ 設計稿覆蓋度" — 確認 PRD 頁面/功能都在設計稿中
- "Design Token 同步" — 比對四處 token 定義
- "資料模型 ↔ 型別" — 比對 PRD 模型與 TypeScript 介面
- "全部執行（推薦）" — 執行所有四項檢查

## 檢查 1：設計稿 ↔ UI 比對

委託 `/design-compare` 執行，對使用者選擇的頁面進行比對。

1. 列出所有 `app/` 下的頁面路由
2. 用 AskUserQuestion 詢問要比對哪些頁面（可多選）
3. 對每個選定頁面執行 design-compare 流程
4. 收集每頁的差異摘要

## 檢查 2：PRD ↔ 設計稿覆蓋度

確認 PRD 定義的每個頁面和核心功能都在設計稿中有對應。

1. **提取 PRD 頁面清單**
   - 讀取 `PRD.md`，找到頁面架構章節
   - 提取所有定義的頁面名稱（如 Home、Drinks、Drink Detail、Brew Progress 等）
   - 提取每頁的核心功能點（如「Home 頁有 AI 推薦卡片」）

2. **提取設計稿頁面清單**
   - 讀取 `DESIGN-PROMPT.md`，找到 Screen Blueprints 章節
   - 提取所有 blueprint 的頁面名稱和包含的元件

3. **交叉比對**
   - 對每個 PRD 頁面，檢查設計稿中是否有對應 blueprint
   - 對每個核心功能點，檢查設計稿是否有對應的元件描述
   - 標記：✓ 已覆蓋 / ⚠ 缺失 / △ 部分覆蓋

4. **輸出**
   ```
   === PRD ↔ 設計稿覆蓋度 ===
   
   [✓] Home — blueprint 完整，含 AI 推薦、Brew 按鈕、機器狀態
   [✓] Drinks — blueprint 完整，含分類篩選、飲品卡片網格
   [⚠] Schedule — PRD 有定義但設計稿缺少 blueprint
   [△] Settings — blueprint 存在但缺少「多用戶切換」功能
   
   覆蓋率: 8/10 頁面完整，1 缺失，1 部分覆蓋
   ```

## 檢查 3：Design Token 同步

比對四個位置的 Design Token 定義是否一致。

1. **提取各源頭的 token**

   | 源頭 | 方法 |
   |------|------|
   | PRD.md | 讀取 Design System 章節的色彩/間距/圓角表格 |
   | DESIGN-PROMPT.md | 讀取 Style Guide Speed Lookup 的 token 定義 |
   | tailwind.config.ts | 讀取 theme.extend 中的 colors/spacing/borderRadius |
   | coffee-app-pencil.pen | 用 `mcp__pencil__get_variables` 取得設計變數 |

2. **建立對照表**
   - 將四處的 token 按語義分組（如 bg-primary、gold-accent、text-primary）
   - 統一色彩格式為 hex 進行比較

3. **輸出**
   ```
   === Design Token 同步 ===
   
   Token           | PRD      | DESIGN   | Tailwind | Pencil   | 狀態
   bg-primary      | #1A1A1C  | #1A1A1C  | #1A1A1C  | #1A1A1C  | ✓ 一致
   gold-accent     | #C9A962  | #C9A962  | #C9A962  | #C8A960  | ⚠ Pencil 差異
   text-secondary  | #6E6E70  | #6E6E70  | —        | #6E6E70  | ⚠ Tailwind 缺失
   
   一致: 10/12 | 差異: 1 | 缺失: 1
   ```

## 檢查 4：資料模型 ↔ TypeScript 型別

比對 PRD 定義的資料模型與 `src/types/` 的 TypeScript 介面。

1. **提取 PRD 資料模型**
   - 讀取 `PRD.md` 的資料模型章節
   - 提取每個模型的名稱和欄位定義（User、Drink、Recipe、BrewRecord、Schedule、MachineState、Achievement）

2. **提取 TypeScript 型別**
   - 用 Glob 搜尋 `src/types/**/*.ts`
   - 讀取每個檔案，提取 interface/type 定義
   - 解析欄位名稱和型別

3. **交叉比對**
   - 對每個 PRD 模型，找 TypeScript 中對應的介面
   - 比對欄位名稱和型別是否匹配
   - 標記：✓ 一致 / ⚠ 欄位差異 / ✗ 缺失介面

4. **輸出**
   ```
   === 資料模型 ↔ TypeScript 型別 ===
   
   [✓] Drink — src/types/drink.ts — 欄位完全對應
   [⚠] User — src/types/user.ts — 缺少 PRD 定義的 preferences 欄位
   [✗] Schedule — 未找到對應的 TypeScript 介面
   
   一致: 5/7 | 差異: 1 | 缺失: 1
   ```

## 最終報告

彙整四項檢查結果：

```
╔══════════════════════════════════════════╗
║       Consistency Check Report           ║
║       BrewMaster Pro                     ║
╠══════════════════════════════════════════╣
║                                          ║
║  1. 設計稿 ↔ UI    [✓ 通過 / ⚠ 3 差異]  ║
║  2. PRD ↔ 設計稿   [✓ 8/10 覆蓋]        ║
║  3. Design Token   [⚠ 2 項需同步]       ║
║  4. 資料模型 ↔ 型別 [⚠ 1 缺失]          ║
║                                          ║
║  整體健康度: 🟡 良好（有小問題待修）      ║
║                                          ║
╚══════════════════════════════════════════╝
```

接著用 **AskUserQuestion** 詢問後續動作：
- "修復差異" — 逐一處理報告中的問題
- "匯出報告" — 將報告存為 `.design-compare/consistency-report.md`
- "稍後處理" — 結束檢查，保留報告供參考

## Guardrails

- 每項檢查獨立執行，一項失敗不影響其他項
- 色彩比對統一為 hex 格式，忽略大小寫差異
- Pencil 檔案只透過 MCP 工具存取，不用 Read/Grep
- 設計稿 ↔ UI 比對需要 dev server 運行；若未運行，提醒使用者或自動啟動
- 報告格式保持結構化，方便後續自動化處理
