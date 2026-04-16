---
name: "OPSX: Propose"
description: Propose a new change - create it and generate all artifacts in one step
category: Workflow
tags: [workflow, artifacts, experimental]
---

Propose a new change - create the change and generate all artifacts in one step.

I'll create a change with artifacts:
- proposal.md (what & why)
- design.md (how)
- tasks.md (implementation steps)

When ready to implement, run /opsx:apply

---

**Input**: The argument after `/opsx:propose` is the change name (kebab-case), OR a description of what the user wants to build.

**Steps**

1. **If no input provided, ask what they want to build**

   Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
   > "What change do you want to work on? Describe what you want to build or fix."

   From their description, derive a kebab-case name (e.g., "add user authentication" → `add-user-auth`).

   **IMPORTANT**: Do NOT proceed without understanding what the user wants to build.

2. **Create the change directory**
   ```bash
   openspec new change "<name>"
   ```
   This creates a scaffolded change at `openspec/changes/<name>/` with `.openspec.yaml`.

3. **Get the artifact build order**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to get:
   - `applyRequires`: array of artifact IDs needed before implementation (e.g., `["tasks"]`)
   - `artifacts`: list of all artifacts with their status and dependencies

4. **Create proposal artifact**

   Create the first artifact (proposal — the one with no pending dependencies):

   a. Run `openspec status --change "<name>" --json` to find `ready` artifacts
   b. Get instructions:
      ```bash
      openspec instructions <artifact-id> --change "<name>" --json
      ```
   c. The instructions JSON includes:
      - `context`: Project background (constraints for you - do NOT include in output)
      - `rules`: Artifact-specific rules (constraints for you - do NOT include in output)
      - `template`: The structure to use for your output file
      - `instruction`: Schema-specific guidance for this artifact type
      - `outputPath`: Where to write the artifact
      - `dependencies`: Completed artifacts to read for context
   d. Read dependency files, create the artifact using `template`
   e. Apply `context` and `rules` as constraints — do NOT copy them into the file
   f. Show: "Created proposal"
   g. If artifact requires user input → use **AskUserQuestion** to clarify

5. **Upstream Design Production（上游設計產出）**

   After proposal establishes scope, ensure PRD → Pencil → DESIGN-PROMPT are complete **before** generating remaining artifacts (design.md, tasks.md). This guarantees tasks are based on complete specs.

   a. **PRD 差量更新**
      - Read `PRD.md` sections related to the proposed change
      - Identify gaps: new pages, features, data models, or UI flows not yet defined in PRD
      - If gaps found:
        - Ask via **AskUserQuestion**: "PRD 尚未定義以下內容，是否現在補充？" + gap list
        - If yes → edit `PRD.md` to add missing definitions (follow existing PRD structure)
        - If deferred → note as prerequisite in design.md
      - If no gaps → proceed

   b. **Pencil 設計產出**
      - Open `coffee-app-pencil.pen` via `mcp__pencil__open_document`
      - Search existing designs for affected screens via `mcp__pencil__batch_get`
      - If screens lack Pencil designs:
        - Ask via **AskUserQuestion**: "以下畫面尚無 Pencil 設計，是否現在建立？" + screen list
        - If yes → load `get_guidelines` + `get_variables`, use `batch_design` to create designs following the design system
        - If deferred → note as prerequisite
      - If designs exist → verify they cover the proposed changes, flag outdated areas

   c. **DESIGN-PROMPT.md 同步**
      - If Pencil designs were created/updated in step b, update `DESIGN-PROMPT.md` Screen Blueprints
      - Add new screen entries or update existing ones to match Pencil designs
      - Keep blueprint format consistent with existing entries
      - If no Pencil changes → skip

   Show upstream production summary before proceeding.

6. **Create remaining artifacts**

   Continue creating artifacts (design.md, tasks.md) in dependency order:

   a. Re-run `openspec status --change "<name>" --json`
   b. For each `ready` artifact:
      - Get instructions via `openspec instructions <artifact-id> --change "<name>" --json`
      - Read dependency files for context
      - Create the artifact using `template`, applying `context` and `rules` as constraints
      - **IMPORTANT**: Reference updated PRD, Pencil designs, and DESIGN-PROMPT as implementation context
      - Show: "Created <artifact-id>"
   c. After each artifact, re-check status until all `applyRequires` are `done`
   d. If an artifact requires user input → use **AskUserQuestion** to clarify

7. **Show final status**
   ```bash
   openspec status --change "<name>"
   ```

**Output**

After completing all artifacts, summarize:
- Change name and location
- **Upstream production**: PRD updates applied, Pencil designs created/verified, DESIGN-PROMPT synced (or deferred items)
- List of artifacts created with brief descriptions
- Consistency validation results
- What's ready: "All artifacts created! Ready for implementation."
- Prompt: "Run `/opsx:apply` to start implementing."

**Artifact Creation Guidelines**

- Follow the `instruction` field from `openspec instructions` for each artifact type
- The schema defines what each artifact should contain - follow it
- Read dependency artifacts for context before creating new ones
- Use `template` as the structure for your output file - fill in its sections
- **IMPORTANT**: `context` and `rules` are constraints for YOU, not content for the file
  - Do NOT copy `<context>`, `<rules>`, `<project_context>` blocks into the artifact
  - These guide what you write, but should never appear in the output

**Consistency Validation（一致性驗證 — 上游產出後的最終確認）**

步驟 5 的 Upstream Design Production 已主動處理大部分缺失。此步驟為最終驗證：

1. **PRD ↔ 設計稿覆蓋度** — 確認 PRD 定義的頁面在 DESIGN-PROMPT 和 Pencil 中都有對應
2. **Design Token 四源同步** — `PRD.md`、`DESIGN-PROMPT.md`、`tailwind.config.ts`、`coffee-app-pencil.pen`
3. **資料模型 ↔ TypeScript 型別** — 若涉及模型變更，比對 PRD 與 `src/types/`

在 summary 中加入：
```
### Consistency Validation
- PRD ↔ 設計稿: ✓ 通過 / ⚠ N 項 deferred
- Design Token: ✓ 一致 / ⚠ N 項需同步
- 資料模型 ↔ 型別: ✓ 一致 / ⚠ N 項需更新
- Upstream Production: ✓ PRD 已更新 / ✓ Pencil 已建立 / ⏭ 已跳過
```

**Guardrails**
- Create ALL artifacts needed for implementation (as defined by schema's `apply.requires`)
- Always read dependency artifacts before creating a new one
- If context is critically unclear, ask the user - but prefer making reasonable decisions to keep momentum
- If a change with that name already exists, ask if user wants to continue it or create a new one
- Verify each artifact file exists after writing before proceeding to next
