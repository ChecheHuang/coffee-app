## Context

- 本 change 是剩餘 Alert 中互動密度最高的——掃描 / 列表 / 密碼 / 連線狀態機全上。
- 使用者於 /propose 階段明確選擇「完整模擬」，體感優先於實作成本。
- 專案尚無 bottom sheet 元件，需要選型。
- WiFi 實際串接需要 iOS/Android native module（expo-network 僅能讀取連線資訊，無法控制）——本 change 明確為 mock 實作，未來 native 接入時 store 介面可保留。

## Decisions

### 路由：`/wifi`

- 短而明確。
- 不採用 `/settings/wifi`：Expo Router 目前其他子頁（`/schedule`、`/machine-info`）都是扁平，保持一致。

### 狀態機：單一 status 欄位

```ts
type WifiStatus = "idle" | "scanning" | "connecting" | "connected" | "failed"
```

理由：

- 扁平好理解，UI 根據 status switch render。
- 比起 boolean 組合（`isScanning`、`isConnecting`、`isConnected`）更不會出現「不該共存的狀態共存」。
- 「failed」是瞬時狀態，使用者關 sheet 或重試後回到 idle/connecting。

### Bottom sheet 選型：建議 `@gorhom/bottom-sheet`

評估：

| 選項 | 優點 | 缺點 |
|------|------|------|
| `@gorhom/bottom-sheet` | 手勢、snap point、keyboard avoidance 都有 | 多 2 個依賴（含 peer） |
| 自製 | 無依賴、完全可控 | 至少 1 天工作量，容易踩坑（keyboard、gesture conflict） |
| `react-native-modal` | 成熟穩定 | 非原生 sheet 感覺，與 iOS 原生風格有差 |

建議採 `@gorhom/bottom-sheet` 方案，`/apply` 階段確認無 peer 衝突後加入。若時程緊，可退到 Expo Router 的 modal presentation（全螢幕 modal）作為過渡——但體驗會稍差。

### Mock 連線成功/失敗邏輯

`connect(ssid, password?)`：

1. 立即 `status: connecting`
2. setTimeout 1500ms
3. 判斷：
   - 若 password === `"correct-password"`（特殊值，僅 dev mock）→ success
   - 或 `Math.random() > 0.3` → success
   - 其他 → failed

簡單可控。`/apply` 階段可依使用者體驗感需要調整失敗機率或特殊密碼。

### 密碼長度驗證：至少 8 字元才能點連線

WPA2 最短 8 字元。這個驗證讓使用者感覺「這個 app 懂 WiFi」。不做更複雜的字元類型檢查（例如「至少一個數字」），太侵入。

### 訊號強度以 4 級 icon 表示

- 1/4 = 最弱
- 4/4 = 最強
- 0/4 = 無訊號（列表中不出現此類）

數值用 `1 | 2 | 3 | 4` union type，強型別避免 `5` 或 `0` 等邊界錯誤。

### Refresh 觸發完整重掃

點 refresh → `wifiStore.scan()` → 重置 availableNetworks → 2 秒動畫 → 重填。

保留「目前連線卡」不受 scan 影響（使用者不會因重掃而斷線）。

## Risks / Open questions

- **Bottom sheet 與 keyboard 的互動**：iOS 上密碼輸入 keyboard 彈出時 sheet 是否正確上移？`@gorhom/bottom-sheet` 有內建 `enableDynamicSizing` 與 `keyboardBehavior` 可處理，但需 `/apply` 實測。
- **Web 版 bottom sheet 體驗**：`@gorhom/bottom-sheet` 的 Web 支援有限。`/apply` 時如果 Web 出問題，可考慮 Web 使用普通 modal、Native 用 bottom sheet（Expo 的平台判斷）。
- **掃描動畫與 FlashList/FlatList**：列表只有 6-8 個項目，用 ScrollView 即可；skeleton 動畫用 Reanimated 做 opacity pulse。
- **連線時間顯示**：「已連線 3 小時」這類相對時間需要對比 `connectedSince: number` 時間戳。Mock 時寫固定值（3 小時前）即可；未來真實資料接入時用 `Date.now() - connectedSince`。
- **Bottom sheet 作為共用元件**：其他頁未來可能也需要 bottom sheet（例：drink 詳情中的參數調整）。本 change 把 PasswordBottomSheet 當作一次性元件放在 `app/wifi.tsx` 附近；若通用版被抽出，再放到 `components/BottomSheet.tsx`。
- **密碼輸入在不同 platform 的 keyboard**：iOS `keyboardType="default"` + `secureTextEntry` 組合正常；Android 需確認密碼欄位不會意外關閉 suggestion bar。`/apply` 實測。
- **失敗模擬的平衡**：預設用「30% 失敗」讓使用者試幾次會碰到失敗路徑——但 QA/Demo 時 100% 隨機反而不穩定。建議加入 `__DEV__` flag：開發時必 succeed，測試時可切換。
