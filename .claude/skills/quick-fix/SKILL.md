---
name: quick-fix
description: 快速修復程式碼層級的 bug，不需要動 PRD、設計稿或建立 change。使用時機：(1) 修 crash 或邏輯錯誤，(2) 修正不正確的行為但 PRD/UI 規格本身沒有問題，(3) 修型別錯誤、錯字、壞掉的 import、資料計算錯誤等純 code 問題。不適用：涉及 UI 變更、新功能、需要更新 PRD 規格的 bug。
---

# Quick Fix

純程式碼層級的 bug 修復，跳過 propose/apply 完整流程。

## 進入門檻（先確認再動手）

在開始之前，回答以下三個問題：

| 問題 | 若是 → |
|------|--------|
| 這個修復會改變 PRD 描述的使用者可見行為嗎？ | 停止，改用 `/propose` |
| 這個修復會改變畫面佈局或視覺設計嗎？ | 停止，改用 `/drift-fix` 或 `/apply` |
| 這個修復只涉及程式碼邏輯、crash、資料計算或壞掉的實作嗎？ | 繼續 |

## 流程

**1. 定位問題**
找出 bug 所在的檔案和行號，確認根因。

**2. 評估波及範圍**
- 若修復動到 `src/types/`：列出所有使用該型別的 screens/components，逐一確認不受影響
- 若修復動到 `components/` 的共用元件：確認其他引用該元件的頁面行為正常

**3. 最小化修復**
只改修復 bug 所需的程式碼，不順手重構或清理周邊。

**4. 確認修復**
若能在 dev server 上驗證，快速跑過受影響的畫面確認行為正確，無明顯 regression。

**5. Commit**
使用專案慣例：繁體中文 + conventional commit 前綴。

```
fix(scope): 一句話說明修了什麼問題
```

範例：
```
fix(home): 修正首頁咖啡飲用次數未即時更新的問題
fix(stats): 修正週統計圖表資料計算錯誤
fix(drink): 修正 DrinkCard 在長標題時截字位置不正確
```

## 不需要做的事

- 不開 `openspec/changes/` 目錄
- 不更新 PRD.md
- 不動 Pencil 設計稿
- 不更新 SYNC-STATUS.md（除非這個 fix 解決了表格中已知的 drift 項目）
