## Implementation

### 1. 型別與資料

- [ ] 1.1 在 `src/types/machine.ts` 擴充 `MachineState`：新增 `brewHeadTemp?: number`、`extractionPressure?: number`、`dryerStatus?: "idle" | "drying" | "ready"`
- [ ] 1.2 建立 `src/stores/machineStore.ts`（Zustand）：初始 mock 資料 + getter（本階段不需 setter）

### 2. PRD 同步

- [ ] 2.1 在 `PRD.md` §5 後新增 §5.15「機器狀態詳情頁 (Machine Status Detail)」：四區塊規格（核心指標／Live／維護／統計）、互動、資料來源
- [ ] 2.2 `PRD.md` §5.1 首頁「機器狀態」段補上「點擊 → `/machine-status`」
- [ ] 2.3 更新 `PRD.md` Alert 清單（若有）移除「機器詳細狀態即將推出」

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 在 `coffee-app-pencil.pen` 新增 MachineStatusDetail 畫面節點，沿用 dark luxury tokens
- [ ] 3.2 四區塊佈局：核心指標（2x2 grid 放大版）、Live 指標（3 欄橫列）、維護提醒（list）、使用統計快照（3 欄數字）
- [ ] 3.3 含 back header（標題「機器狀態」+ back chevron）
- [ ] 3.4 更新 `DESIGN-PROMPT.md` 加入此頁速查（layout / spacing / 典型數值）

### 4. 路由與頁面 [DESIGN]

- [ ] 4.1 新增 `app/machine-status.tsx`，SafeAreaView + ScrollView 標準結構
- [ ] 4.2 Header：back 按鈕 + 標題「機器狀態」
- [ ] 4.3 實作 4 個區塊的 UI（核心指標、Live、維護、統計）
- [ ] 4.4 首頁 `app/(tabs)/index.tsx` 的 Machine status `Pressable` `onPress` 從 `Alert.alert(...)` 改為 `router.push('/machine-status')`
- [ ] 4.5 移除首頁 `Alert` import（若因此不再使用）

### 5. SYNC-STATUS 更新

- [ ] 5.1 新增 Pages 列：`MachineStatusDetail | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.15](PRD.md) | app/machine-status.tsx`
- [ ] 5.2 更新 Home 列備註（移除「Alert 機器詳細狀態」的佔位描述）
- [ ] 5.3 更新頂部 Last update 時間戳

### 6. 驗證（Run-and-Verify）

- [ ] 6.1 Chrome mobile MCP：首頁進入 `/machine-status` 流程可見四區塊
- [ ] 6.2 返回按鈕回到首頁且保留捲動位置
- [ ] 6.3 低水量／低豆量 warning 色正確顯示
- [ ] 6.4 除垢狀態 overdue/needed/ok 三態顏色正確
