# `docs/`

> All project documentation, kept next to the code so it stays in sync.

| Layer | Owner |
|---|---|
| Documentation | Shared |

## What this folder is for

Everything that explains the project but is not code. Putting it in Git means the design documents are versioned together with the code that implements them.

## Rules for this folder

- Update the diagrams here whenever the design changes, in the same pull request as the code change.

## Files that go in this folder

### `SRS_Hostel_Management_System.docx`

**What it does:** The Software Requirements Specification: all functional requirements (FR-1 to FR-34), non-functional requirements, architecture and database design.

**Called by:** The whole team, as the source of truth for "what are we building" and the professor for evaluation.

**Details:**

- When a requirement changes, edit this file first, then change the code.

## Sub-folders

- `diagrams/` : High level design, low level design and ER diagram images.
- `prototype/` : The clickable HTML prototype used as the visual reference.
- `presentation/` : Course presentation slides.
