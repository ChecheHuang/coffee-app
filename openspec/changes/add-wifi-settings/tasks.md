## Implementation

### 1. 型別與資料

- [ ] 1.1 新增 `src/types/wifi.ts`：`WifiNetwork`、`WifiStatus`（readonly 欄位 + union）
- [ ] 1.2 `src/types/index.ts` 匯出新型別
- [ ] 1.3 新增 `src/stores/wifiStore.ts`：status / currentNetwork / availableNetworks / ipAddress 狀態；scan / connect / disconnect actions
- [ ] 1.4 Store 初始 mock：已連線「Home-5G」、可用網路 6-8 個（含 open + secured 混合，訊號強度分布均勻）
- [ ] 1.5 `connect(ssid, password?)` 實作：setTimeout 1.5 秒 → 若 password !== "correct-password"（或用 Math.random() > 0.3）→ failed；否則 connected

### 2. PRD 同步

- [ ] 2.1 `PRD.md` §5 新增 §5.21「WiFi 設定 (WiFi Settings)」：header、目前連線、掃描動畫、可用網路、密碼 bottom sheet、狀態機
- [ ] 2.2 `PRD.md` §5.8 設定頁「WiFi 設定」列互動：改為導航
- [ ] 2.3 更新 PRD Alert 清單，移除「WiFi 設定即將推出」

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 新增 WifiSettings 畫面節點：header + 目前連線卡 + 網路列表
- [ ] 3.2 掃描動畫 skeleton row 樣式（3-4 行、pulse 動畫描述）
- [ ] 3.3 網路列表 row：訊號 icon 4 格變體（1/2/3/4 格）、鎖頭 icon、頻段 tag、已連線標記（gold ✓）
- [ ] 3.4 密碼 bottom sheet 設計：drag handle、標題、TextInput、eye toggle、按鈕組
- [ ] 3.5 Bottom sheet 三態：初始 / 連線中（spinner）/ 失敗（error 文字）
- [ ] 3.6 更新 `DESIGN-PROMPT.md` 加入此頁速查

### 4. 依賴評估 [DESIGN]

- [ ] 4.1 評估 bottom sheet 實作方案：
  - `@gorhom/bottom-sheet`（功能完整、pass gesture 支援好、多一個依賴）
  - 自製（Reanimated + gesture handler，控制度高但工作量大）
- [ ] 4.2 決策記錄於 design.md 並更新 `package.json`（若加依賴）

### 5. 路由與頁面 [DESIGN]

- [ ] 5.1 新增 `app/wifi.tsx`：SafeAreaView + ScrollView
- [ ] 5.2 Header（back + 標題 + refresh icon，refresh 呼叫 `wifiStore.scan()`）
- [ ] 5.3 CurrentConnectionCard 子元件（connected 狀態才顯示）
- [ ] 5.4 掃描 skeleton 子元件（scanning 狀態顯示，Reanimated pulse）
- [ ] 5.5 NetworkRow 子元件（SSID + 訊號 + 鎖頭 + 頻段 + 已連線 check）
- [ ] 5.6 PasswordBottomSheet 子元件（三態：initial / connecting / failed）
- [ ] 5.7 `app/(tabs)/settings.tsx`「WiFi 設定」列 onPress 改為 `router.push('/wifi')`
- [ ] 5.8 若設定頁 `Alert` 不再使用則移除 import

### 6. SYNC-STATUS 更新

- [ ] 6.1 新增 Pages 列：`WifiSettings | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.21](PRD.md) | app/wifi.tsx`
- [ ] 6.2 更新 Settings 列備註（移除「Alert WiFi 即將推出」）
- [ ] 6.3 若使用 `@gorhom/bottom-sheet` 新增依賴，於備註記錄
- [ ] 6.4 更新頂部 Last update 時間戳

### 7. 驗證（Run-and-Verify）

- [ ] 7.1 Chrome mobile MCP：設定頁 → WiFi 設定 → 掃描動畫 → 列表顯示
- [ ] 7.2 點擊需密碼網路 → bottom sheet 彈出 → 輸入密碼 → 連線中 → 成功 Toast → sheet 關閉 → 目前連線卡更新
- [ ] 7.3 點擊 open 網路（無密碼）直接連線
- [ ] 7.4 連線失敗狀態（例：填錯密碼）顯示 error 文字且 sheet 不關閉
- [ ] 7.5 點擊「斷開連線」隱藏目前連線卡
- [ ] 7.6 Refresh icon 重新觸發掃描動畫
- [ ] 7.7 返回設定頁捲動位置保留
