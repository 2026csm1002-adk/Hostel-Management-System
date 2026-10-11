# `src/components/ui/`

> shadcn/ui building blocks.

| Layer | Owner |
|---|---|
| UI components | Aryan |

## What this folder is for

Generated components such as Button, Input, Table, Dialog, Tabs, Badge. They are the design system's base.

## Rules for this folder

- Add one with `npx shadcn@latest add button`; the tool writes the file here (settings in `components.json`).
- Do not hand-edit them casually; restyle through Tailwind tokens in `globals.css` instead.

## Files that go in this folder

### `button.tsx, input.tsx, table.tsx, dialog.tsx, tabs.tsx, badge.tsx, ...`

**What it does:** One file per primitive, created by the shadcn command when first needed.

**Called by:** Every other component.
