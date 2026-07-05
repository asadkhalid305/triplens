---
name: triplens-pr-review-conventions
description: Review TripLens pull requests for product boundary, calculation safety, and focused verification.
---

# TripLens PR Review Conventions

Use this skill when reviewing a TripLens pull request or branch diff.

## Review Priorities

1. Calculation correctness for totals, per-day costs, and comparison deltas.
2. Selected trip and comparison trip state staying separate.
3. Local `localStorage` persistence and reset behavior.
4. Stateless mock route handlers.
5. Mobile-first dashboard, chart, and form readability.
6. Product boundary: post-trip insights only, no live finance or bank features.

## Review Output

Lead with findings, ordered by severity. For each finding, name the file,
behavior, and verification signal. If there are no findings, say that clearly
and note any remaining test or browser-verification gap.

For calculation changes, start with `npm run test`. Do not edit files until the
user asks for a fix.
