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

- Environments: preview + prod
- Board manages the queue, merges, and verifies
- Agent complement: 1
- No Chaise instance on this project. Board absorbs architect duties at this tier.

## Workflow States

`Backlog -> Todo -> In Progress -> Done` (Linear defaults for Tier 1-2).

This project does **not** run the Tier 3 pipeline - no Grooming, Sprint Ready, Verifying,
sprint ceremonies, or dispatch convention. Do not apply ARC's process here.

## What Belongs Where

| Belongs in `../chaise/` | Belongs in this repo |
| -- | -- |
| Role definitions, operating model, action gates | Product domain knowledge and Internal Logic |
| Card taxonomy, Linear conventions | Stack, architecture, and deployment specifics |
| Release governance, verification doctrine | Anything true only of DadsKitchen |

Changes to anything in the left column are made in the `chaise` repo, in the Chaise lane, under
Operator authorization - never here.
