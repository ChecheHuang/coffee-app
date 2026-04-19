## Context

- PRD §10.1.1 已預告使用 `expo-notifications` 作為未來推播通道，本 change 先實作 in-app 通知中心，資料源為 mock；未來 push 接入時只需替換 store 內部 source。
- 設定頁另有「通知設定」Alert（§5.8 設定樹狀）——屬於「偏好配置」頁，與本 change 的「通知列表」頁職責分離，另案處理。
- 首頁鈴鐺 press feedback 既有 opacity 樣式，保留不改。

## Decisions

### 三類分類：系統 / 維護警訊 / 社群

理由：對應 BrewMaster Pro 三大資訊來源——機器端（系統/韌體）、機器狀態（維護）、家庭社交（Family members 章節）。避免使用「重要 / 一般」這類模糊優先級，分類以「來源」為軸更好對應圖示與未來推播主題。

### 路由：`/notifications`（複數）

- 對應內容是 list，英文語意上複數更貼近。
- 既有命名慣例：Expo Router 頁多採單數（`schedule/new`）但 list 頁常用複數（`recipes`、`drinks`）。
- 未來 push notification detail 頁可命名 `/notifications/[id]`。

### 列表元件：`FlatList` 而非 `ScrollView`

- swipe-to-delete 需要 `react-native-gesture-handler` 的 `Swipeable`，搭配 FlatList 的 renderItem 更自然。
- 通知量可能上百條，FlatList 的 virtualization 避免效能問題。
- 與既有頁面的 ScrollView 模式不同——這是本頁特例，不改其他頁。

### 未讀狀態：單向流（進頁不自動標記已讀）

進入頁面**不會**自動把所有通知標記已讀——只有點擊「全部已讀」才會。理由：

- 使用者可能只是想瀏覽特定類別，不應強制標已讀。
- 單條已讀可透過未來新增的「點擊 deep link」觸發（本 change out of scope）。
- 與 iOS/Android 原生通知中心行為一致（點開類別只是瀏覽，不自動清除 badge）。

### 相對時間 formatter

格式規則：
- < 1 分鐘：「剛剛」
- < 60 分鐘：「N 分鐘前」
- < 24 小時：「N 小時前」
- < 7 天：「N 天前」（或顯示「昨天」）
- >= 7 天：「M 月 D 日」

將 formatter 寫在 `src/utils/relativeTime.ts`，若未來其他頁需要可共用。

## Risks / Open questions

- **Swipe-to-delete 在 web 版（`npm run web`）的手勢支援**：`react-native-gesture-handler` 在 web 的支援雖然存在但體驗有差異。本專案主目標是 native，web 僅作為輔助預覽——若 web 上 swipe 不順暢，可接受，不為此改動。
- **Mock 通知的 timestamp 合理性**：需要在不同時間區間分布（剛剛 / 幾小時前 / 昨天 / 上週），讓相對時間 formatter 各分支都有資料展示，避免 UI review 時看起來單調。
- **FlatList 取代 ScrollView 的專案一致性**：既有頁面全用 ScrollView。本頁破例是技術考量。若未來其他頁（例：Stats）也需 virtualization，可將此選擇推廣為「list-heavy 頁用 FlatList」的慣例。
- **未讀小點 vs badge 計數**：tab 右側選擇用「有/無小圓點」而非「顯示數字」，語意更輕量且不會在超過 9 條時擁擠。若使用者覺得需要顯示實際數字，`/apply` 階段可討論改用 Badge 元件。
