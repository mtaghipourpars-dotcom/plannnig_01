# Agent Implementation Contract

1. Treat `references/99-complete-architecture.md` as the consolidated baseline and the topic-specific references as authoritative for their domains.
2. Topic-specific references may refine, not silently contradict, the consolidated baseline. If conflict is found, stop implementation and create an ADR.
3. All externally integrated identifiers require explicit mapping to internal IDs.
4. All future state changes require an effective planning day.
5. All actual facts require event source + source ID + immutable hash.
6. All scenario results require baseline plan version, model version, rules version and calculation timestamp.
7. All optimization candidates require feasibility status and objective value.
8. `RESOURCE_CRISIS` is not a valid optimization result; it is an escalation outcome requiring a management intervention path.
9. Any change to an API, event, table, state or SAP mapping requires updates to the machine-readable asset plus tests.
10. Synthetic data must carry `data_classification: SYNTHETIC`.
