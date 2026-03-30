# Warden OS — Agent Configuration

> **This repository is under Warden OS authority.**
> Warden OS path: `~/.wardenos`
> Authority registry: `~/.wardenos/system/security/authority-registry.json`
> Source of truth: `~/.wardenos/AGENTS.md`

## Governance Rules (All Agents Must Follow)

1. **Never delete files.** Move orphaned files to `_rehome/`.
2. **Data sovereignty applies.** PRIVATE data never leaves. SENSITIVE data requires consent.
3. **Destructive actions require awareness.** Consider system-wide impact before force push, database drop, etc.
4. **Log significant actions.** Note service restarts, data exports, security events.
5. **Cross-repo awareness.** Consult the authority registry for the full list of managed directories.
6. **Vault access requires challenge.** Use `~/.wardenos/system/security/vault-open.sh`.

## Model Routing

This project uses the Warden OS LiteLLM gateway for model selection:
- Standard work: `warden-spoke` (Sonnet-tier)
- Complex problems: escalate to `warden-hub` (Opus-tier)
- Subagents: `warden-agent` (Haiku-tier)

## MCP Integrations (Available to All Projects)

All MCP servers registered with Warden OS are available: Slack, Gmail, Google Calendar, Canva, PDF Viewer, Godot MCP Pro (163 tools), Wazuh (planned).

## Portable Governance Hooks

Canonical scripts at `~/.wardenos/system/shell/hooks/`:
- `governance-guard.sh` — blocks deletion, protects vault/SSH/firewall
- `audit-log.sh` — logs all tool invocations
- `session-report.sh` — writes session summary for hub visibility

---
# Project: .chilates
