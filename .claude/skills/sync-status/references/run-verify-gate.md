# Run-and-Verify Gate（執行驗證閘）

跨 skill 共享契約：**任何涉及 UI 或前端行為的變更，在標記任務完成 / 寫 ✓ 至 SYNC-STATUS / 歸檔 change 之前，必須實際在瀏覽器跑過該功能。**

> 型別檢查與測試只能驗證「程式碼正確」，無法驗證「功能正確」。設計稿比對只能驗證「結構對齊」，無法驗證「互動可用」。Run-and-Verify Gate 是這兩層檢查的最終守門。

## 何時觸發

| 情境 | 是否需執行 |
|------|-----------|
| 修改 `app/**.tsx`、`components/**.tsx`、樣式相關檔案 | **必須** |
| 修改 `tailwind.config.ts` 或 `src/constants/theme.ts` | **必須**（影響全站視覺） |
| 修改 `src/types/`、`src/utils/`、`src/stores/` 但無 UI 變更 | 可跳過（型別/邏輯由 TS 與測試驗證） |
| 純文件變更（PRD、md） | 可跳過 |
| 純 Pencil .pen 變更 | 可跳過（無程式碼變更，由設計稿截圖確認即可） |

## 執行步驟

### 1. 確保 dev server 在 port 8081 運行

```bash
# 檢查
curl -s http://localhost:8081 > /dev/null && echo "running" || echo "not running"

# 未運行則背景啟動
cd <project-root> && npm start &
# 等到 http://localhost:8081 回應
```

### 2. 用 Chrome DevTools MCP 開啟受影響頁面

```
mcp__chrome-devtools__navigate_page(url: "http://localhost:8081/<route>")
mcp__chrome-devtools__wait_for(text: "<頁面上預期出現的文字>")
```

### 3. 走過「Golden Path」與關鍵 edge case

對每個受影響的頁面：

1. **載入確認**：截圖 `take_screenshot`，確認無白屏 / 紅屏 / 缺字型 / 缺圖
2. **互動確認**：根據變更內容點 / 滑 / 切換對應元件，再截圖驗證狀態正確
   - 點擊：`mcp__chrome-devtools__click`
   - 滑動：`mcp__chrome-devtools__drag`
   - 鍵盤：`mcp__chrome-devtools__press_key`
3. **導航確認**：若變更涉及路由跳轉，實際點按鈕觀察跳轉結果
4. **Console 檢查**：`mcp__chrome-devtools__list_console_messages`，確認無紅色 error

### 4. 回歸檢查（變更可能波及的鄰近功能）

| 變更類型 | 必須額外確認 |
|----------|--------------|
| Design Token (顏色/字型/圓角/間距) | 至少 3 個未直接修改的頁面外觀無 regression |
| 共用元件 (Button/Card/Slider/TabBar) | 所有使用該元件的頁面 |
| 路由結構（檔名 / 目錄） | TabBar 切換、deep link、router.back() 是否正常 |
| Onboarding 拆檔 | 完整走過 4 步流程 + 跳到 (tabs) 主畫面 |

### 5. 記錄結果

回報時必須包含：
- ✓ / ✗ 標記每個受影響頁面的驗證結果
- 截圖證據（至少初始狀態 + 互動後）
- Console error 清單（若有）

範例：
```
### Run-and-Verify
- /onboarding ✓ (welcome → connect → profile → first-drink → /(tabs))
- /drink/espresso ✓ (Brew CTA 換新元件後外觀一致, 點擊跳轉 /brew-progress 正常)
- /recipe/edit ✓ (保存按鈕功能正常)
- Console: 無 error
```

## 跳過的判斷

允許跳過的唯一情況：**使用者明確表示「不用跑」**，並在報告中標註：

```
### Run-and-Verify
- ⏭ 已跳過（使用者授權）
- 風險：未驗證的頁面 [list]
```

## 失敗處理

若跑起來發現問題：
1. **不要**標記任務完成 / 不要寫 ✓ 至 SYNC-STATUS / 不要歸檔
2. 截圖 + 描述觀察到的異常
3. 用 AskUserQuestion 詢問使用者：
   - "立即修復" — 退回實作循環修復
   - "標記為已知問題並繼續" — 接受問題，於 SYNC-STATUS 備註欄記錄
   - "回滾本次變更"

## 與 SYNC-STATUS 的關聯

Run-and-Verify Gate 通過後，才允許將 SYNC-STATUS.md 對應列的 Code 欄寫成 `✓`。

寫 `⚠` 表示「已實作但未通過 Verify」（例如使用者跳過、或有已知差異）。

寫 `✗` 表示「實作未開始或已失敗」。

完整符號規範見 [format-spec.md](format-spec.md)；完整寫入契約見 [integration-contract.md](integration-contract.md)。
