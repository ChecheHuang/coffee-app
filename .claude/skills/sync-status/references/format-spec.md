# SYNC-STATUS.md 格式規範

所有讀寫 `SYNC-STATUS.md` 的 skill 都必須遵守本規範。

## 檔案位置

`<repo-root>/SYNC-STATUS.md` — 與 `PRD.md`、`DESIGN-PROMPT.md` 同層級。

## 整體結構

```markdown
# Sync Status

> Init: YYYY-MM-DD | Last update: YYYY-MM-DD

## Pages

| Item | PRD | Pencil | Code | 最後驗證 | 錨點 | 備註 |
|------|-----|--------|------|----------|------|------|
| ... |

## Components

| Item | PRD | Pencil | Code | 最後驗證 | Pencil 節點 | 備註 |
|------|-----|--------|------|----------|-------------|------|
| ... |

## Design Tokens

| Token | PRD | DESIGN-PROMPT | Tailwind | Pencil | 最後驗證 | 備註 |
|-------|-----|---------------|----------|--------|----------|------|
| ... |
```

三段順序固定：Pages → Components → Design Tokens。不得改變段落標題或欄位順序。

## 符號

| 符號 | 含義 | 使用時機 |
|------|-----|---------|
| `✓` | 已同步 | 該欄與其他欄一致且通過驗證 |
| `✗` | 需更新 | 偵測到不一致或被取消勾選 |
| `⚠` | 需複查 | 純文案微調等不影響元素的修改 |

不要使用其他符號（如 `[x]`、`[ ]`、`OK`、`NG`）。

## 欄位定義

### Pages 區塊

| 欄位 | 類型 | 範例 |
|------|------|------|
| Item | 路由名稱 | `Home`、`Drinks`、`drink/[id]` |
| PRD | 符號 | `✓` |
| Pencil | 符號 | `✗` |
| Code | 符號 | `✓` |
| 最後驗證 | 日期 `YYYY-MM-DD` | `2026-04-19` |
| 錨點 | Markdown 連結 | `[↗](PRD.md#home-screen)` |
| 備註 | 一行純文字（< 60 字） | `PRD 新增評價按鈕，待同步` |

### Components 區塊

| 欄位 | 類型 | 範例 |
|------|------|------|
| Item | 元件名稱 | `DrinkCard`、`BrewProgress` |
| PRD / Pencil / Code | 符號 | 同上 |
| 最後驗證 | 日期 | 同上 |
| Pencil 節點 | 節點 ID | `node-abc123` |
| 備註 | 一行純文字 | 同上 |

### Design Tokens 區塊

| 欄位 | 類型 | 範例 |
|------|------|------|
| Token | Token 名稱 | `gold-accent`、`bg-card`、`radius-card` |
| PRD | 符號 | 對應 PRD.md Design System 章節 |
| DESIGN-PROMPT | 符號 | 對應 DESIGN-PROMPT.md Style Guide |
| Tailwind | 符號 | 對應 tailwind.config.ts |
| Pencil | 符號 | 對應 .pen 中的設計變數 |
| 最後驗證 | 日期 | 同上 |
| 備註 | 一行純文字 | 同上 |

## 日期

- 固定格式 `YYYY-MM-DD`
- 取自系統當前日期（不要憑空猜）
- 在對話 context 中通常以 `Today's date is YYYY-MM-DD` 形式提供

## 表頭 Metadata

檔案頂部固定有一行 blockquote：

```markdown
> Init: 2026-04-19 | Last update: 2026-04-19
```

- `Init` 由 `/sync-status init` 設定，之後不變
- `Last update` 每次任何 skill 寫入時更新為當天

## 取消勾選時的備註

被取消勾選（從 `✓` → `✗` 或 `⚠`）時，**必須**在備註欄填入原因，建議格式：

```
<觸發來源> <修改內容>，<待辦動作>
```

範例：
- `PRD 新增評價按鈕，待同步 Pencil 與 Code`
- `Token gold-accent 改 #C9A962 → #D4B370，待全面同步`
- `pencil-adjust 改了 Hero 字體，待 Code 同步`

## 重新打勾時

- 把符號改回 `✓`
- 更新「最後驗證」為今天
- **清空備註欄**

## Item 命名規範

- **Pages**：跟著 `app/` 路由命名，去掉 `(tabs)`、副檔名。例如 `app/(tabs)/home.tsx` → `Home`，`app/drink/[id].tsx` → `drink/[id]`
- **Components**：跟著 `components/` 下的檔名（PascalCase）
- **Tokens**：跟著 `tailwind.config.ts` 的 token key（kebab-case）

不要為了好看而改名，命名必須能反向定位到原始檔案。
