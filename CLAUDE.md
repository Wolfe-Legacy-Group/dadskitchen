@AGENTS.md

# DadsKitchen - Agent Routing Guide

Linear team **DadsKitchen (DK)** · Repo `Wolfe-Legacy-Group/dadskitchen` · **Tier 2 - Split**

## Governance Lives in the chaise Repo

LEAD methodology and governance are product-agnostic and live in `Wolfe-Legacy-Group/chaise`,
cloned as a sibling of this repo (both under the same parent, e.g. `~/Developer/`).

- Product-agnostic methodology and governance: `../chaise/`
- Product-specific rules and domain knowledge: this repo

**If `../chaise/` is not present, this repo has no governance canon available.** Clone it before
proceeding rather than relying on a cached or remembered version. Do not copy chaise documents
into this repo - reference them by path.

## First Reads

1. `../chaise/CLAUDE.md` - reading order and path conventions
2. `../chaise/system/operating-model.md` - tier rubric, action gates, portfolio structure
3. `../chaise/system/agent-roles.md` - role definitions and boundaries
4. `../chaise/system/linear-conventions.md` - card workflow and status transitions

## Tier 2 - Split

Per `../chaise/system/operating-model.md` § Tier rubric:

- Environments: preview + prod (Vercel previews; no staging)
- Board manages the queue, merges, and verifies
- Devs: 1 (`DK - Dev`)
- Walker: none. A Tier 2 project needs staging and the `In Review` / `Verifying` states before
  the Operator can promote one (`../chaise/templates/new-project.md` § 1); DK has neither, so
  Board keeps verifying.

Every project carries a **Lead** and a **Board**, at every tier (Operator ruling 2026-08-26).
Tier determines the Dev complement and the workflow pipeline - not whether the project has
an architect. Lead holds project canon, architecture, and the reasons behind decisions; Board
runs throughput.

## Sessions

Every session is titled `DK - {Role}`: `DK - Lead`, `DK - Board`, `DK - Dev` - the role only,
never a step. The activation prompt opens `You are DK - {Role}.` and gives the agent's Position.
DK has no sprints, so the positions are Standing
(`../chaise/system/agent-activation-protocol.md` § Projects without sprints):

- `Position: Lead · Standing`
- `Position: Board · Standing` or `Board · Standing · DK-NNNN`
- `Position: Dev · Standing · DK-NNNN`

The agent checks that position against its playbook and the actual state, begins every report
and Linear post with `Position: ...`, and keeps its row in `DK Active Agent Sessions` current.

Standing sessions run on the portfolio's always-on parent machine, and are addressed by
session id (`../chaise/system/operating-model.md` § Session topology).

## Workflow States

`Backlog -> Todo -> In Progress -> Done` (Linear defaults for Tier 1-2). No Grooming, Sprint
Ready, Verifying, sprint ceremonies, or dispatch convention. Do not apply ARC's process here.
Board sets a card Done once the change is live on production, its latest merge has a passing
check, and no `PROOF: PENDING` is open.

## What Belongs Where

| Belongs in `../chaise/` | Belongs in this repo |
| -- | -- |
| Role definitions, operating model, action gates | Product domain knowledge and Internal Logic |
| Card taxonomy, Linear conventions | Stack, architecture, and deployment specifics |
| Release governance, verification doctrine | Anything true only of DadsKitchen |

Changes to anything in the left column are made in the `chaise` repo, in the Chaise lane, under
Operator authorization - never here.
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
