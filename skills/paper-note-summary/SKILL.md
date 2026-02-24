---
name: paper-note-summary
description: Summarize academic papers into structured learning notes with a fixed template covering metadata, research question, technical methods, experiments, and critique. Use when the user asks to summarize a paper, extract key ideas, compare methods, or produce repeatable paper notes (especially in Chinese).
---

# Paper Note Summary Workflow

Follow this workflow to produce consistent, high-signal paper notes.

## 1) Gather Inputs

Collect as much paper context as available:
- title, authors, affiliation, publication year/venue
- paper URL and PDF (if provided)
- user focus (for example: method details, experiments, critique)

If a field is unavailable, write `N/A` and briefly state `未在论文中明确给出`.

## 2) Extract Core Content

Read the paper in this order:
1. abstract + intro: define problem and motivation
2. method section: framework, modules, objectives, losses
3. experiment section: setup, baselines, key results
4. discussion/conclusion: limits and future directions

Separate facts from inference:
- factual claims: state directly
- inferred claims: prefix with `推断：`

Do not invent equations, metrics, or implementation details.

## 3) Output Format (Use Exactly)

Use the template in `references/paper-note-template.md`.
Keep section order unchanged.
Use concise bullet points.
Use strict heading hierarchy:
- one H1 only: `# 论文总结`
- section titles as H2 (`##`)
- question prompts as H3 (`###`)

Do not represent question prompts as list items.
If details need enumeration under a prompt, use flat bullet lists under that H3 heading.

Include diagrams whenever text alone is insufficient:
- required: for process logic, algorithm framework, and model architecture that are hard to explain with text
- preferred source: screenshot/crop from the paper figure
- fallback: draw with `draw.io` only when the paper has no suitable figure
- if the diagram is inferred from text, label it as `推断流程图`

## 4) Formatting Rules (Required)

Apply the following formatting rules to the final Markdown content.

### 4.1 Math Syntax

- Use Markdown LaTeX math syntax only:
  - inline math: `$...$`
  - block math: `$$...$$`
- Do not wrap formulas with backticks.
- Use proper LaTeX operators and symbols in math mode (for example, `\sim`, `\mid`, `\lambda`, `\mathcal{L}`).
- Use braces for sub/superscripts when needed (for example, `$s_{t+1}$`, `$x^{(i)}$`).

### 4.2 Spacing Rules

Always use half-width spaces for:
- Chinese and English boundaries (example: `机器人 world model`)
- Chinese and number boundaries (example: `训练 10 小时`)
- English and number boundaries (example: `DreamDojo 14B`, `batch 512`)

Keep punctuation in standard Markdown style and avoid full-width spaces.

### 4.3 Diagram Rules

- Add one or more diagram items in the diagram section as needed.
- First check whether the paper already provides a suitable figure:
  - if yes, use a screenshot/crop of that figure
  - if no, create a new figure with `draw.io`
- For `draw.io`-created figures, save editable source as `.drawio`.
- For `draw.io`-created figures, export a human-readable image (prefer SVG, fallback PNG).
- Save diagram under `paper-notes/assets/`.
- Embed the diagram in Markdown using image syntax: `![alt](relative/path)`.
- For `draw.io`-created figures, keep source and export filenames aligned, for example:
  - `paper-notes/assets/<paper-id>-flow.drawio`
  - `paper-notes/assets/<paper-id>-flow.svg`
- Keep node names short and map directly to paper modules/stages.
- Add a one-line caption below the image.
- If using a paper screenshot, include source location (figure number or section).
- Enforce non-overlap: boxes, labels, and arrows must not overlap each other.
- Prefer symmetric layout: align nodes on a grid, center key stages, and keep left-right balance.
- For multiple arrows to one node, keep clear spacing between arrow paths and avoid merged crossings.
- Route arrows to node edges (not through text area) and keep consistent arrowhead size.

## 5) Write Markdown File (Required)

Always write the final result to a Markdown file instead of only replying in chat.

- Default output directory: `paper-notes/` (create it if missing)
- Filename priority:
  1. arXiv paper: `<arxiv-id>-<short-slug>.md` (example: `2602.06949-dreamdojo.md`)
  2. Non-arXiv paper: `<year>-<short-slug>.md`
  3. If metadata is incomplete: `paper-note-<YYYYMMDD>-<short-slug>.md`
- Slug rules: lowercase, letters/digits/hyphen only, max 6 words
- File content: must follow `references/paper-note-template.md` exactly

After writing the file, return:
- absolute file path
- one-line status summary

## 6) Quality Gate Before Finalizing

Check all items in `references/quality-checklist.md`.
If critical evidence is missing (for example, no baseline table), explicitly note uncertainty.
