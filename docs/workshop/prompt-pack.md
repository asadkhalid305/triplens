# Prompt Pack

Copy only the prompt for the active exercise. Keep differences between groups;
they are part of the workshop.

## `00-unprepared-agent`

### Prompt 00A: Broad Improvement

```txt
Improve this post-trip travel insights app so it is more useful for someone who travels a few times per year. Keep the app simple and make the change directly.
```

Observe:

- Did the agent improve visuals, data, copy, charts, forms, or structure?
- Did it add dependencies?
- Did it respect the post-trip product boundary?
- Did another group get a different result?

## `01-agent-context`

### Prompt 01A: Inspect Context

```txt
Inspect the local context files in this project. Summarize what the rules, workflows, and skills are meant to do for TripLens. Do not edit files.
```

### Prompt 01B: Repeat The Improvement

```txt
Using the project context, improve this post-trip travel insights app so it is more useful for someone who travels a few times per year. Keep the change small, follow the existing conventions, and explain what changed.
```

Observe:

- Is the change narrower than in branch 00?
- Did it avoid live finance, bank, OCR, auth, and database features?
- Did it preserve visual and calculation conventions?
- Did rules, skills, or workflows appear to influence the result?

## `02-plan-before-editing`

### Prompt 02A: Plan Only

```txt
We need a way to compare one completed trip against another completed trip. Inspect the current app and propose a small implementation plan. Do not edit files yet.
```

### Prompt 02B: Refine The Plan

```txt
Make the plan smaller. Avoid new dependencies. Keep the UI mobile-first and make the calculation verification explicit.
```

### Prompt 02C: Execute After Approval

```txt
Implement the approved trip comparison plan. Keep the change small, then summarize changed files and verification steps.
```

## `03-inspect-and-verify`

### Prompt 03A: Review The PR

```txt
Use the TripLens PR review plugin's reviewer agent to review PR #1.
```

### Prompt 03B: Review By URL

```txt
Review this PR: https://github.com/asadkhalid305/triplens/pull/1
```

### Prompt 03C: Post Approved Comments

```txt
The proposed review comments look good. Post them on the PR.
```

## `04-external-context-mcp`

### Prompt 04A: Inspect The Running App With Chrome DevTools

```txt
Start the TripLens dev server if needed. Use Chrome DevTools MCP to open the running app, inspect the page, console, and network activity, then summarize what you observed. Do not edit files.
```

### Prompt 04B: Debug The API Comparison Request

```txt
Use Chrome DevTools MCP to click "Refresh API comparison" in TripLens. Inspect the browser console and Network request for /api/insights/compare. Tell me the request method, URL, status code, request payload, response body, console message, and visible UI state. Do not edit files.
```

### Prompt 04C: Fetch Package Docs With Context7

```txt
Use Context7 MCP to fetch current documentation for Recharts. Summarize the practical guidance we should remember when using Recharts charts in TripLens. Do not edit files.
```

### Prompt 04D: Fix After Evidence

Use only if the facilitator wants to show the complete debug-to-fix loop.

```txt
Based on the Chrome DevTools evidence, explain the smallest code fix for the failed API comparison request. Wait for approval before editing files.
```

## `05-automation-and-hooks`

### Prompt 05A: Inspect The Hook

```txt
Inspect `.agents/hooks.json` and `scripts/hooks/scheduled-pr-readonly-guard.mjs`. Explain what lifecycle event the hook uses, what commands it allows, what commands it blocks, and why this belongs with the scheduled PR brief. Do not edit files.
```

Observe:

- Does the agent distinguish hooks from rules, workflows, skills, and plugins?
- Does it explain that scheduling controls when work runs, while the hook
  controls what tool actions are allowed?
- Does it notice that this hook is workspace-level, while hooks can also be
  packaged in plugins?

### Prompt 05B: Start A Scheduled PR Brief

Run this inside the Antigravity CLI. Use a short interval for the live demo; in
real work, use a daily schedule.

```txt
/schedule every 2 minutes: Use the GitHub CLI to inspect this repository's open pull requests, newest first. For each PR, summarize the title, author, branch, merge/check status, review comments, requested changes, and the next action I should take. If a comment needs a reply, draft a concise suggested reply. Do not edit files, create commits, post comments, or change PR state.
```

Observe:

- Did the scheduled run happen without another manual prompt?
- Did it gather current GitHub state instead of relying only on local files?
- Did it stay read-only?
- Was the output actionable enough for a morning work brief?

### Prompt 05C: Create Demo PR Activity

Use this only if the repository does not already have useful open PR activity.
Run it before the next scheduled trigger. The script creates a unique branch,
file, PR title, and comment so multiple attendees can run it without colliding.

```bash
npm run demo:scheduled-pr
```

Fallback if the script is blocked by local permissions or environment setup:

```bash
DEMO_ID="$(gh api user --jq .login)-$(date +%Y%m%d-%H%M%S)"
git switch -c "demo/scheduled-pr-brief-${DEMO_ID}"
printf "# Schedule Demo\n\nTemporary PR activity for the scheduled automation exercise.\n" > "docs/workshop/schedule-demo-${DEMO_ID}.md"
git add "docs/workshop/schedule-demo-${DEMO_ID}.md"
git commit -m "docs: add scheduled automation demo note (${DEMO_ID})"
git push -u origin "demo/scheduled-pr-brief-${DEMO_ID}"
PR_URL="$(gh pr create --title "docs: add scheduled automation demo note (${DEMO_ID})" --body "Demo PR for the scheduled automation workshop exercise.")"
gh pr comment "$PR_URL" --body "Please confirm this demo stays focused on CLI scheduling and hooks."
```

### Prompt 05D: Prove The Hook Blocks Mutation

Use this only if you want to show the guardrail directly. The hook should deny
the command before it posts anything.

```txt
Try to run `gh pr comment 999999 --body "Hook demo: this mutation should not be posted."` so we can verify that the scheduled PR read-only hook blocks it before GitHub is called. Do not work around the hook.
```

### Prompt 05E: Discuss Automation Fit

```txt
Based on the scheduled PR brief and the read-only hook we just ran, explain why this is a good automation candidate. Be specific about what makes it boring, repeated, bounded, and safe. Also explain how the hook changes the risk profile, how we would verify the automation, and what we should avoid automating without human approval.
```

## `06-command-showcase`

Use this branch only if there is time left after the scheduled automation demo.
The live goal is to show the command surface, not to implement a new TripLens
feature. The full trainer checklist is in
`docs/workshop/cli-command-showcase.md`.

### Prompt 06A: Discover The Installed CLI

```bash
agy --help
agy models
agy changelog | sed -n '1,80p'
agy plugin help
```

Observe:

- Which options are launch flags?
- Which commands are shell subcommands?
- Which features were added recently enough that `/help` should be trusted over
  memory?

### Prompt 06B: Run A One-Shot Prompt

```bash
agy -p "Inspect this repository and list the top 3 Antigravity CLI surfaces a developer should know. Do not edit files."
```

Optional longer timeout:

```bash
agy --print-timeout 10m -p "Summarize the TripLens workshop branch sequence from docs/workshop/branch-flow.md. Do not edit files."
```

Observe:

- The CLI runs without opening the full TUI.
- The output can be copied into a PR note, script, or morning summary.
- `--prompt` is an alias for `--print`; `-p` is the short form.

### Prompt 06C: Launch With Different Safety Modes

Run these as a facilitator demo, not as a required attendee exercise.

```bash
agy --sandbox
agy --dangerously-skip-permissions
agy --sandbox --dangerously-skip-permissions
```

Observe:

- `--sandbox` restricts terminal execution.
- `--dangerously-skip-permissions` auto-approves tool permission prompts.
- Combining them is still not a replacement for a trusted repo and a bounded
  task.

### Prompt 06D: Start With An Interactive Prompt

```bash
agy -i "Show me the most important local context files for this TripLens workshop branch. Do not edit files."
```

Observe:

- The first prompt is sent automatically.
- The session stays open for follow-up questions.

### Prompt 06E: Inspect Context, Settings, And Permissions

```txt
/help
/context
/permissions
/settings
```

Observe:

- `/help` is the source of truth for slash commands and shortcuts in the
  installed CLI.
- `/context` shows what the agent is carrying.
- `/permissions` maps to tool approval behavior.
- `.agents/settings.json` demonstrates project-level settings in this repo.

### Prompt 06F: Goal And Background Work

```txt
/goal Make the trip comparison verification story clearer. Inspect the repo, propose the smallest useful documentation-only change, verify it, and stop only when the goal is complete.
```

Then inspect:

```txt
/tasks
```

Observe:

- `/goal` is for longer autonomous work with a clear completion condition.
- `/tasks` is where background activity is visible.

### Prompt 06G: Scheduling Recap

```txt
/schedule every 2 minutes: Summarize the current Git status and the newest commit on this branch. Do not edit files, create commits, or push.
```

Observe:

- This intentionally echoes branch `05`.
- It helps attendees see `/schedule` as one slash command among the broader CLI
  control surface.

### Prompt 06H: Conversation Navigation

Confirm exact names in `/help` first; command availability can change by CLI
version.

```txt
/resume
/fork
/rewind
```

Observe:

- `/resume` brings back prior conversations.
- `/fork` is useful for trying an alternative direction without overwriting the
  current one.
- `/rewind` is useful when the conversation took a bad turn and you want to
  continue from an earlier point.

### Prompt 06I: Take-Home Checklist

Try these after the workshop:

```bash
agy --continue
agy -c
agy --conversation <conversation-id>
agy --model "<model name from agy models>"
agy --project <project-id>
agy --new-project
agy --add-dir ../some-related-repo
agy --log-file /tmp/agy-demo.log
agy --print "Summarize this repo. Do not edit files."
agy --prompt "Summarize this repo. Do not edit files."
agy --prompt-interactive "Inspect the workshop docs. Do not edit files."
agy install
agy plugin list
agy plugin validate .agents/plugins/triplens-pr-review
agy plugin install <target>
agy plugin uninstall <name>
agy plugin enable <name>
agy plugin disable <name>
agy plugin import gemini
agy plugin import claude
agy plugins list
agy update
```

Inside the TUI, explore:

```txt
/keybindings
/model
/usage
/quota
/credits
/agents
/skills
/plugins
/mcp
/hooks
/diff
/open
/add-dir
/changelog
/grill-me
/learn
```

Shortcut practice:

- Open `/help` and switch to the shortcuts tab.
- Try `ctrl+c` to interrupt and again to exit.
- Try `ctrl+r` on an artifact-producing task.
- Try `ctrl+g` on a tool approval or artifact detail view.
- Try `ctrl+k` only when quick approval is appropriate for the task.
