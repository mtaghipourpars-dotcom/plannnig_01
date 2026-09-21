# MAPNA Generator Architecture — Agent Skill

This package is an Agent Skills-compatible implementation skill for a MAPNA Generator Engineering and Manufacturing (PARS) dynamic production planning and resource allocation platform.

## Core architectural idea

**Past is Fact; Future is Plan.** The model is time-phased at one planning day. Actual events are immutable after close. Future state is versioned, branchable, recalculable, and optimizable. Every material business change is an event with impact propagation.

## Package layout

- `SKILL.md` — activation metadata + machine implementation instructions.
- `references/` — progressive-disclosure architecture specifications.
- `assets/` — machine-readable schemas, diagrams, contracts and examples.
- `scripts/` — package validation helpers.

## Recommended activation order

1. Read `SKILL.md`.
2. Read `references/00-executive-summary.md` and `references/01-business-context.md`.
3. Read the domain-specific reference needed for the implementation task.
4. Load the corresponding `assets/` contract/schema before coding.
5. Implement against the acceptance criteria and invariants in the references.
6. Run `python scripts/validate_skill.py .` before delivery; if the target agent supports the official validator, also run `skills-ref validate .`.

## Important source boundary

MAPNA public content establishes business context only. Internal operational data must be sourced from SAP, MES, governed MDM, or approved project data. Synthetic demo data must be marked as synthetic.
