## Implementation

### 1. 型別與資料

- [ ] 1.1 `src/types/machine.ts` 擴充 `MachineState`：新增 `model`、`serialNumber`、`purchaseDate`、`warrantyEndDate`（readonly）
- [ ] 1.2 `src/stores/machineStore.ts` 初始 mock 補上四個新欄位的合理值（購買日期 ~1 年前、保固期內）
- [ ] 1.3 若 `machineStore` 尚未建立（與 `add-machine-status-detail` change 協調），本 change 視前置狀態決定是新建還是擴充

### 2. PRD 同步

- [ ] 2.1 `PRD.md` §5 新增 §5.20「咖啡機資訊 (Machine Info)」：六區塊規格（hero / 基本 / 連線 / 韌體 / 保固 / 法規）
- [ ] 2.2 `PRD.md` §5.8 設定頁「咖啡機」區塊說明：移除「韌體更新」獨立列；「咖啡機資訊」改為導航
- [ ] 2.3 更新 PRD Alert 清單，移除兩個相關 Alert

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 新增 MachineInfo 畫面節點：header + hero + 四/五個資訊區塊
- [ ] 3.2 韌體區塊 pill 三態：最新版（success）/ 可更新（warning）/ 檢查中
- [ ] 3.3 保固區塊 pill 二態：有效 / 已過期
- [ ] 3.4 序號列的複製 icon 樣式
- [ ] 3.5 更新設定頁 Pencil：移除「韌體更新」列
- [ ] 3.6 更新 `DESIGN-PROMPT.md` 加入此頁速查

### 4. 路由與頁面 [DESIGN]

- [ ] 4.1 新增 `app/machine-info.tsx`：header、hero、五個資訊區塊
- [ ] 4.2 使用 `expo-clipboard` 實作序號複製（若尚未安裝）
- [ ] 4.3 「檢查更新」mock 流程：Toast「檢查中…」→ 約 1.5 秒後 Toast「已是最新版本」
- [ ] 4.4 `app/(tabs)/settings.tsx`「咖啡機資訊」列 onPress 改為 `router.push('/machine-info')`
- [ ] 4.5 `app/(tabs)/settings.tsx` 移除「韌體更新」SettingsRow（整個區塊）
- [ ] 4.6 若設定頁 `Alert` 不再使用則移除 import
- [ ] 4.7 Toast 元件沿用 `add-maintenance-and-consumables` 建立的機制（若該 change 尚未 apply，本 change 可先自製或 fallback）

### 5. SYNC-STATUS 更新

- [ ] 5.1 新增 Pages 列：`MachineInfo | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.20](PRD.md) | app/machine-info.tsx`
- [ ] 5.2 更新 Settings 列備註（移除 Alert 佔位描述、標註韌體更新列已移除）
- [ ] 5.3 更新頂部 Last update 時間戳

### 6. 驗證（Run-and-Verify）

- [ ] 6.1 Chrome mobile MCP：設定頁 → 咖啡機資訊 → 六個區塊顯示正確
- [ ] 6.2 「檢查更新」按鈕點擊流程正確
- [ ] 6.3 序號複製動作可用（web 版用 navigator.clipboard fallback）
- [ ] 6.4 設定頁「韌體更新」列已移除
- [ ] 6.5 返回按鈕回到設定頁並保留捲動位置
