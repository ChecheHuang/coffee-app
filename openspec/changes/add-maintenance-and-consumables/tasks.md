## Implementation

### 1. 型別與資料

- [ ] 1.1 新增 `src/types/maintenance.ts`：`MaintenanceActionId`、`MaintenanceAction`（readonly 欄位）
- [ ] 1.2 新增 `src/types/consumable.ts`：`ConsumableType`、`ConsumableStatus`、`ConsumableRecord`（readonly 欄位）
- [ ] 1.3 `src/types/index.ts` 匯出新型別
- [ ] 1.4 新增 `src/stores/maintenanceStore.ts`：actions、executeAction；初始 mock 4 項動作（guided_clean / rinse / descale / backflush），其中 1 項 isRecommended: true
- [ ] 1.5 新增 `src/stores/consumableStore.ts`：statuses、history；mock 4 類耗材（其中 1 類剩餘 <20%），history >=5 條

### 2. PRD 同步

- [ ] 2.1 `PRD.md` §5 新增 §5.17「維護中心 (Maintenance)」：建議動作 highlight、四動作卡規格、執行流程、Toast 回饋
- [ ] 2.2 `PRD.md` §5 新增 §5.18「耗材紀錄 (Consumables)」：四類狀態卡規格、歷史列表、空狀態
- [ ] 2.3 `PRD.md` §5.8 設定頁更新「維護」區塊說明：移除「引導式清潔」獨立列，維護中心/耗材紀錄改為導航
- [ ] 2.4 更新 PRD Alert 清單，移除三個相關 Alert

### 3. 設計稿（Pencil）[DESIGN]

- [ ] 3.1 新增 Maintenance 畫面節點：header + 建議動作 highlight + 四動作卡列表
- [ ] 3.2 新增 Consumables 畫面節點：header + 四狀態卡 grid + 更換紀錄區段 + list
- [ ] 3.3 耗材狀態卡 warning/error 色態變體
- [ ] 3.4 更新設定頁 Pencil：移除「引導式清潔」列
- [ ] 3.5 更新 `DESIGN-PROMPT.md` 加入兩頁速查

### 4. 路由與頁面 [DESIGN]

- [ ] 4.1 新增 `app/maintenance.tsx`：header、recommended highlight、4 張動作卡、點擊 → 確認 Alert → mock Toast
- [ ] 4.2 新增 `app/consumables.tsx`：header、4 張狀態卡 2x2 grid、更換紀錄 list
- [ ] 4.3 `app/(tabs)/settings.tsx`「維護中心」列 onPress 改為 `router.push('/maintenance')`
- [ ] 4.4 `app/(tabs)/settings.tsx` 移除「引導式清潔」列（整個 SettingsRow 區塊）
- [ ] 4.5 `app/(tabs)/settings.tsx`「耗材紀錄」列 onPress 改為 `router.push('/consumables')`
- [ ] 4.6 若設定頁 `Alert` 不再使用則移除 import
- [ ] 4.7 Toast 實作：沿用現有機制（若無，使用 react-native 內建 ToastAndroid + iOS Alert fallback，或新增簡易 Toast 元件）

### 5. SYNC-STATUS 更新

- [ ] 5.1 新增 Pages 列：`Maintenance | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.17](PRD.md) | app/maintenance.tsx`
- [ ] 5.2 新增 Pages 列：`Consumables | ✓ | ✓ | ✓ | 2026-MM-DD | [PRD §5.18](PRD.md) | app/consumables.tsx`
- [ ] 5.3 更新 Settings 列備註（移除三個 Alert 佔位描述、標註引導式清潔已移除）
- [ ] 5.4 更新頂部 Last update 時間戳

### 6. 驗證（Run-and-Verify）

- [ ] 6.1 Chrome mobile MCP：設定頁 → 維護中心 → 四動作卡顯示正確
- [ ] 6.2 點擊引導式清潔 → 確認對話框 → 執行 → Toast
- [ ] 6.3 設定頁 → 耗材紀錄 → 四狀態卡 + 歷史列表
- [ ] 6.4 warning/error 色耗材卡顏色正確
- [ ] 6.5 設定頁「引導式清潔」列已移除
- [ ] 6.6 返回按鈕回到設定頁，位置保留
