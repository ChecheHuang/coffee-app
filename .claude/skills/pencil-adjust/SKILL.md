---
name: pencil-adjust
description: 調整 Pencil (.pen) 設計畫面的互動式引導工具。當使用者想修改、微調、替換元件或重繪任何 BrewMaster Pro 的 Pencil 設計畫面時觸發。適用於：(1) 畫面細節微調（顏色、字型、間距、位置）(2) 新增或替換元件 (3) 整頁重新設計 (4) 任何涉及 .pen 檔案修改的需求。觸發關鍵字：調整畫面、修改設計、改 Pencil、調 UI、改畫面。
---

# Pencil 畫面調整引導

透過 AskUserQuestion 互動式引導使用者精準描述 Pencil 畫面的調整需求，再使用 Pencil MCP 工具執行修改。

## 執行流程

### Step 1: 選擇目標畫面

讀取 [references/screen-map.md](references/screen-map.md) 取得畫面清單，用 AskUserQuestion 讓使用者選擇：

```
AskUserQuestion:
  question: "要調整哪個畫面？"
  header: "目標畫面"
  options:
    - "1. Home — 首頁"
    - "2. Drinks — 飲品列表"
    - "3. Detail — 飲品詳情"
    - "4. Progress — 沖煮進度"
    - "5. Recipes — 自訂配方"
    - "6. Stats — 統計數據"
    - "7. Settings — 設定"
    - "8. Schedule — 排程預約"
    - "9. Achievements — 成就系統"
    - "10. Onboarding — 引導頁"
```

### Step 2: 截圖確認現狀

使用 `get_screenshot` 對選中的 Frame 截圖，呈現給使用者確認目前畫面狀態。

```
mcp__pencil__get_screenshot(nodeId: "<frame_id>")
```

### Step 3: 選擇調整模式

```
AskUserQuestion:
  question: "需要什麼類型的調整？"
  header: "調整模式"
  options:
    - "微調" — 顏色、字型、間距、大小、位置等細節修改
    - "替換/新增元件" — 新增按鈕、卡片、圖示，或替換現有元件
    - "區域重繪" — 對畫面的某個區域進行重新設計
    - "整頁重繪" — 整個畫面重新設計
```

### Step 4: 收集具體需求

根據調整模式，引導使用者提供具體資訊：

**微調模式** — 詢問：
- 要調整哪個元素？（文字、按鈕、卡片、圖示...）
- 要改什麼屬性？（顏色、字型大小、間距、圓角、透明度...）
- 目標值是什麼？（具體色碼、px 值、或參考其他畫面）

**替換/新增元件模式** — 詢問：
- 要操作的元件類型？（從元件庫選擇或自訂）
- 放置位置？（某元素上方/下方/左右，或具體座標）
- 元件內容？（文字、圖示名稱、顏色）

**區域重繪 / 整頁重繪模式** — 詢問：
- 重繪的範圍？（頂部區域、內容區、底部...）
- 設計方向？（參考其他畫面、全新風格、功能增減）
- 有沒有參考圖？

### Step 5: 確認並執行

整合所有資訊，用 AskUserQuestion 做最終確認：

```
AskUserQuestion:
  question: "確認調整內容：\n\n畫面：[畫面名稱]\n模式：[調整模式]\n具體內容：\n- [修改項 1]\n- [修改項 2]\n\n開始執行？"
  header: "確認執行"
  options:
    - "確認執行（推薦）"
    - "需要補充"
    - "取消"
```

### Step 6: 執行調整

1. 用 `batch_get` 查詢目標節點的現有屬性
2. 用 `batch_design` 執行修改
3. 用 `get_screenshot` 截圖驗證結果
4. 呈現截圖給使用者確認

### Step 7: 結果確認

```
AskUserQuestion:
  question: "調整結果如何？"
  header: "結果確認"
  options:
    - "完成" — 滿意，結束調整
    - "需要微調" — 大方向正確，但細節需要再改
    - "撤銷重來" — 不滿意，還原並重新描述
```

如果選「需要微調」，回到 Step 4 繼續迭代。

## Pencil MCP 工具速查

| 操作 | 工具 | 用途 |
|------|------|------|
| 查詢節點 | `batch_get(patterns, nodeIds)` | 搜尋或讀取節點屬性 |
| 修改節點 | `batch_design(operations)` | 新增、更新、刪除節點 |
| 截圖 | `get_screenshot(nodeId)` | 擷取畫面截圖 |
| 編輯器狀態 | `get_editor_state()` | 確認當前開啟的 .pen 檔 |
| 設計規範 | `get_guidelines(topic)` | 取得設計指引 |
| 風格指南 | `get_style_guide(tags)` | 取得風格參考 |

## 注意事項

- .pen 檔案只能透過 Pencil MCP 工具讀寫，不可用 Read/Grep
- 修改前務必先 `batch_get` 查詢現有狀態
- 使用 `ref` 引用可複用元件以保持一致性
- 每次修改後都要截圖確認
- 色碼、字型須符合設計系統（見 references/screen-map.md）
