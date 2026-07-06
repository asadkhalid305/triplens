# CLI Command Showcase

Branch `06-command-showcase` is an optional wrap-up branch. Use it only if the
workshop has time after scheduling and hooks. The goal is to show that the
Antigravity CLI has three separate control surfaces:

- launch flags and shell subcommands before the TUI starts;
- interactive slash commands inside a running CLI session;
- keyboard shortcuts and persisted settings while the session is running.

Keep this branch demonstrative. Run commands, show what opens, explain when a
developer would use it, then move on.

## Recommended Live Demo

Prioritize these if time is short.

1. Show shell help and version-aware discovery.

```bash
agy --help
agy models
agy changelog
agy plugin help
```

Teaching point: shell commands answer "how do I launch or manage the CLI?" They
are different from slash commands typed after the TUI starts.

2. Show one-shot non-interactive prompting.

```bash
agy -p "Inspect this repository and list the top 3 command-line surfaces a developer should know. Do not edit files."
agy --print-timeout 10m -p "Summarize the TripLens workshop branch sequence from docs/workshop/branch-flow.md. Do not edit files."
```

Teaching point: `-p`, `--print`, and `--prompt` are useful for scripts, CI-like
summaries, and quick read-only checks without opening the full TUI.

3. Show launch-time safety modes.

```bash
agy --sandbox
agy --dangerously-skip-permissions
agy --sandbox --dangerously-skip-permissions
```

Teaching point: `--sandbox` restricts terminal execution;
`--dangerously-skip-permissions` removes approval prompts. Demo the risk
clearly: skip permissions only belongs in a trusted repo and a bounded task.

4. Show project context and permissions.

Inside the TUI:

```txt
/help
/context
/permissions
/settings
```

Teaching point: branch `05` introduced `.agents/settings.json`, so branch `06`
can show how settings and permissions are inspected and adjusted from the CLI.

5. Show continuity commands.

Inside the TUI:

```txt
/resume
/tasks
/goal
```

Teaching point: these commands are for staying with longer work: resume old
conversations, inspect background tasks, or ask the agent to keep going until a
goal is genuinely complete.

6. Show branch-safe exploration if available in the current CLI.

Inside the TUI, use `/help` first to confirm exact names in the installed
version, then demo:

```txt
/fork
/rewind
```

Teaching point: these are useful when you want to compare directions or recover
from a bad turn without manually reconstructing the conversation.

## Take-Home Command Checklist

Put these in the prompt pack so attendees can try them after the workshop.

### Launch Flags

- `agy -p "..."` or `agy --print "..."`: run one prompt and print the answer.
- `agy --prompt "..."`: alias for print mode.
- `agy -i "..."` or `agy --prompt-interactive "..."`: seed an interactive
  session with an initial prompt.
- `agy -c` or `agy --continue`: continue the most recent conversation.
- `agy --conversation <id>`: resume a specific conversation.
- `agy --model <name>`: start with a specific model.
- `agy --project <id>`: start in a specific project.
- `agy --new-project`: create a new project for the session.
- `agy --add-dir <path>`: add another workspace directory. Repeatable.
- `agy --sandbox`: enable terminal sandbox restrictions.
- `agy --dangerously-skip-permissions`: auto-approve tool permission requests.
- `agy --print-timeout <duration>`: increase or reduce print-mode wait time.
- `agy --log-file <path>`: write CLI logs somewhere specific.

### Shell Subcommands

- `agy help`: show shell command help.
- `agy install`: configure environment paths and shell settings.
- `agy models`: list available models.
- `agy changelog`: inspect release notes and new CLI features.
- `agy update`: update the CLI.
- `agy plugin help`: show plugin management help.
- `agy plugin list`: list imported plugins.
- `agy plugin validate .agents/plugins/triplens-pr-review`: validate this
  branch's local plugin.
- `agy plugin install <target>` / `agy plugin uninstall <name>`: manage plugins.
- `agy plugin enable <name>` / `agy plugin disable <name>`: toggle plugins.
- `agy plugin import gemini` or `agy plugin import claude`: import legacy
  plugin/customization sources when needed.

### Interactive Slash Commands

Use `/help` inside the TUI as the source of truth for the installed CLI version.
The most useful commands to explore are:

- `/help`: command and shortcut reference.
- `/context`: current context and token usage.
- `/settings` or `/config`: CLI preferences.
- `/permissions`: tool permission rules.
- `/keybindings`: keyboard shortcut customization.
- `/model`: switch model when supported by the session.
- `/usage`, `/quota`, or `/credits`: quota and credit status.
- `/resume`: conversation picker.
- `/tasks`: background task monitor.
- `/goal`: long-running goal mode.
- `/schedule`: one-off or recurring scheduled work.
- `/agents`: active subagent monitor.
- `/skills`: available skills.
- `/plugins`: plugin/customization surface, when available.
- `/mcp`: MCP server surface, when available.
- `/hooks`: hook configuration surface, when available.
- `/diff`: inspect VCS changes.
- `/open`: open files or paths.
- `/add-dir`: add another workspace directory.
- `/changelog`: release notes inside the TUI.
- `/grill-me`: guided clarification before planning.
- `/learn`: store a correction or reusable preference.
- `/fork` and `/rewind`: branch or repair a conversation when available.

### Keyboard Shortcuts

Open `/help` and switch to the shortcuts tab for the exact current list. Good
live-demo candidates:

- `ctrl+c`: interrupt active work; press again to exit.
- `ctrl+d`: forward-delete while typing; exit when the prompt is empty.
- `ctrl+r`: open the artifact review panel when artifacts exist.
- `ctrl+g`: expand approval/artifact details or open the configured editor in
  supported views.
- `ctrl+k`: quick approval flow for tools/subagents where appropriate.
- `shift+n`: reverse navigation through diff blocks where available.

## Trainer Notes

Do not try to run every item live. The live goal is to teach the map:

- shell flags change how a session starts;
- slash commands operate inside the session;
- settings and keybindings persist preferences;
- permissions and sandboxing are separate safety layers.

If time runs out, show `agy --help`, one `agy -p` example, `/help`,
`/permissions`, and the project `.agents/settings.json`, then tell attendees the
rest is in the prompt pack.
