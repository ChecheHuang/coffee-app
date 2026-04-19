---
name: drift-fix
description: >-
  快速視覺比對與直接修復。選定頁面或元件 → 實際比對 Pencil 設計節點 vs 程式碼實作 →
  發現落差立即更新 SYNC-STATUS → 問你修設計稿還是修程式碼 → 直接修復，不走 /propose 流程。
  使用時機：SYNC-STATUS 顯示綠燈但肉眼看到設計稿與 App 不一致、想快速單點修復。
  觸發關鍵詞：drift-fix、修落差、修視覺、比對修復、設計稿不對、程式碼不對、快速修、視覺修復。
---

# Drift Fix

快速比對 Pencil ↔ Code，發現落差就修。**不走 /propose，直接動 .pen 或程式碼。**

## 範圍

| 會做 | 不動 |
|------|------|
| 讀 SYNC-STATUS、PRD、程式碼、Pencil 節點 | proposal / specs / tasks / design.md |
| 比對設計屬性 vs 程式碼實作 | SYNC-STATUS（除了更新落差狀態） |
| 更新 SYNC-STATUS 落差列狀態 | /propose 流程 |
| 直接 Edit 程式碼 | 其他頁面／元件 |
| 直接呼叫 pencil-draw embedded 修 .pen | |

---

## 步驟

### 1. 選定目標

讀 `SYNC-STATUS.md` 取出所有 Pages + Components 清單。

用 **AskUserQuestion**（多選）：
- 列出所有 Pages（附 Pencil 節點 ID）
- 列出所有 Components（附 Pencil 節點 ID）
- 選項「全部掃一遍」

### 2. 逐一比對

對每個選定項目，**並行**執行：

#### 2a. 取 Pencil 屬性

```
mcp__pencil__batch_get(nodeIds: [<節點ID>])
```

提取關鍵屬性：
- 顏色（fill、stroke）
- 字型大小、字重、字色
- 間距（padding、gap、margin）
- 圓角（cornerRadius）
- 佈局（direction、alignment）
- 尺寸（width、height）

#### 2b. 取程式碼實作

- Glob 找對應路由或元件檔
- Read 檔案，提取 className / style 中對應的 token 或數值

#### 2c. 比對

將設計屬性 vs 程式碼實作逐項對齊：

| 屬性 | Pencil | Code | 一致？ |
|------|--------|------|--------|
| 背景色 | #242426 | bg-card ✓ | ✓ |
| 標題字級 | 24px | text-2xl ✓ | ✓ |
| 卡片圓角 | 20px | rounded-card ✓ | ✓ |
| 內距 | 28px | px-7 ✗ (24px) | ✗ |

token 對照：讀 `tailwind.config.ts` 取對應數值後再比。

### 3. 輸出比對結果

```
=== [頁面/元件名稱] ===

✓ 對齊 (5 項)
✗ 落差 (2 項):
  - padding: Pencil 28px → Code px-6 (24px)
  - font-size: Pencil 18px → Code text-base (16px)
```

### 4. 更新 SYNC-STATUS

對有落差的項目，更新 `SYNC-STATUS.md`：
- Pencil 欄或 Code 欄 → ⚠（視落差方向）
- 備註欄 → `[drift-fix] 落差：<一行摘要>`
- 「最後驗證」→ 今天
- 表頭 `Last update` → 今天

無落差的項目不動 SYNC-STATUS。

### 5. 選修復方向

若有落差，用 **AskUserQuestion**（可對每個落差項目分別選）：

- "修程式碼對齊設計稿（推薦）" — 直接 Edit 程式碼
- "修設計稿對齊程式碼" — 呼叫 pencil-draw embedded 模式
- "接受差異，標備註不修" — SYNC-STATUS 備註加 `[已接受差異]` 並維持 ⚠

若多個項目落差方向相同，可批次選擇。

### 6. 執行修復

#### 修程式碼路徑

直接 `Edit` 對應程式碼檔：
- 替換 className token 或數值
- 修改後重讀檔案確認沒誤

**不啟動 Chrome / dev server**（純程式碼修改，使用者自行 reload 確認；若使用者想驗證，提示開 Chrome 手動看）。

修完更新 SYNC-STATUS：
- Code 欄 → ✓
- 備註清空（若已全對齊）

#### 修設計稿路徑

用 Skill 工具呼叫 `pencil-draw`，帶入：
- change context：`drift-fix`
- affected 節點 ID 清單
- 目標屬性（從程式碼取到的數值）

`/pencil-draw` 完成後 Pencil 欄 → ✓。

### 7. 修復完成摘要

```
=== Drift Fix 完成 ===

已修復:
- [頁面/元件] padding: px-6 → px-7（對齊設計稿 28px）
- [頁面/元件] font-size: text-base → text-lg（對齊設計稿 18px）

SYNC-STATUS 已更新 ✓

接受差異:
- （無）
```

---

## Guardrails

- **不建立 change / proposal**——這是直接修復工具，不留 SDD 足跡
- **只動選定項目**——嚴格限制改動範圍，不順手改其他地方
- **Pencil 比對只用 MCP 工具**——不用 Read/Grep 讀 .pen
- **修程式碼不跑 dev server**——快速修復路徑，不做完整 Run-and-Verify Gate；需要視覺驗證時告知使用者手動確認
- **修設計稿走 pencil-draw embedded**——不直接呼叫 Pencil MCP；保持單一入口原則
- **token 對照必查 tailwind.config.ts**——不靠記憶猜數值，避免 text-lg = 18px 這類需要查表的對應關係
- **色彩比對統一 hex 大寫**——避免 #c9a962 vs #C9A962 誤判為不一致
