 Remove Commit / Commit and push after Apply
Remove both buttons from the card, plus the two messages they send (App.tsx:83-85).
Remove the git status lookup when a project chat opens, which I added only for these buttons.
Keep "Apply, commit and push" for when the AI asks to commit or push, as in your smart-glasses request. That was a choice the AI offered, not a standing suggestion. I'll remove it too if you want.
Small change: ChangeReview.tsx, App.tsx, one test.
2. Terminal below the message box, resizable like VS Code
Today it sits between the messages and the box (App.tsx:558), at a fixed 220 px.

Placement: a bottom panel under the message box, spanning the chat and any right sidebar, like VS Code's panel.
Resizing: drag its top edge (arrow keys work too). The height is remembered, between 120 px and 70% of the window. A maximize/restore button and × to close.
Several terminals: + opens another one, listed on the right like VS Code's cmd / node / powershell list, and each can be closed. Rust already supports several terminals per project (project_term.rs:103); only the page keeps one, in terminals.ts.
Kept from today: Ctrl+`, the shortcut buttons, "Send to chat", and the terminal resizing itself to fit the panel.
Files: new BottomPanel.tsx; the existing browser drag handle generalised to work up-down; terminals.ts, TerminalView.tsx, App.tsx, styles.css. No Rust changes.
3. A right sidebar for reviewing changes
In the chat: the big card under each answer becomes one line, e.g. "3 files changed (2 new, 1 changed) · Review". Clicking it opens the sidebar on those changes.
Sidebar "Changes": sits in the right column with the same drag handle as the browser. If the browser is open too, the column gets two tabs: Browser | Changes.
What it shows:
The chat's prepared changes, newest first, with files grouped by folder.
A diff per file, with keep switches.
Warnings for files changed outside the app, and the check results.
Apply / Discard (and "Apply, commit and push" when the AI asked), then Undo.
Opening: a count of waiting changes on a "Changes" button in the project bar. The sidebar also opens by itself when an answer ends with changes to review.
Files: new ChangesPanel.tsx, reusing today's file rows, folder groups and diff view; Message.tsx, App.tsx, styles.css. Apply, Discard and Undo already exist in the chat store, so no core changes are needed.
4. Code hard-coded to your tests: what to fix
The search found 13 places where your own message (not the AI's reply) is word-matched, 3 site-specific rules, and 4 brittle error matches. In priority order:

A. Tied to one of your test cases; wrong for other people:

Search query rewriting (webIntent.ts:6-74): the CM-names test added "cm → chief minister" and "pm → prime minister", and it strips words like "names". So "3 pm meeting" becomes "3 prime minister meeting", and "baby names" becomes "baby". Fix: search with the text as typed; the model writes its own queries anyway.
Wikipedia, .gov and nic.in always read first (webLookup.ts:168): from the same test. A coding question reads Wikipedia before the official docs, and nic.in covers India only. Fix: keep the search engine's order.
Search tips built on the India example (prompts.ts:149-156): reword them neutrally.
Website detection (webLookup.ts:95-112): from your portfolio test. It knows .in but not .jp or .br, and needs English words like "portfolio". Fix: treat any name.tld as a site to open, and search if it doesn't open.
B. Your words override the AI's choice, and only English counts:

Output format (documents/tools.ts:130): "Turn my PDF into Word" makes both files. Fix: the model's chosen format wins.
Pictures: "draw 3 cats and describe them" in Hindi stops after the first picture (images/tools.ts:230). "A tall lighthouse" forces an upright picture (images/tools.ts:239-292). Fix: the model's size wins, and the picture tool gets a "done" field so the model says whether more follows.
Browser sign-in (browser/tools.ts:168): it only clicks sign-in buttons if your message said "log in" in English. Fix: ask you on a card before submitting any page that has a password field, in any language.
Reading a whole file: whether it reads from the start depends on English "summarize" (attachments.ts:40). Fix: read the whole file when it fits, otherwise the start plus the matching parts.
Earlier files: files from earlier messages come back only on English file words (conversations.ts:814). Fix: always list the recent files and let the model re-read them.
Bing language: Bing is always asked in English (builtinSearch.ts:29). Fix: use the computer's language.
C. Checks on the AI's reply that only work in English (acceptable in principle, but they fail silently for other languages):

My new reply check (unbacked) and the "claims a file it didn't make" check: keep them. Also add a language-independent line on the review: "Named in the answer but not changed: index.html".
"Out of steps" message: it always says "finish it yourself in the browser", even for project work. Fix: word it by the kind of tool.
D. Error matching:

Git messages (project_git.rs:132): a non-English git install breaks them. Fix: run git in English (LC_ALL=C).
Local model retry: any local-model error containing "tool" quietly retries without tools (localModel.ts:56). Fix: match only the template error it was made for.
These are fine as they are: model-name checks (none change behaviour), dangerous-command and secret patterns, the out-of-memory and Google key hints, and the comments that only name your cases.

Suggested order (one commit each, tests with each)
1 → 4A → 3 → 2 → 4B → 4C/D, with /simplify and /code-review after each group.

Before I start, three decisions:

Should "Apply, commit and push" stay for when the AI is asked to push, or be removed too?
Should the terminal panel span the whole width (chat and sidebar, like VS Code) or only the chat?
Should the Changes sidebar open by itself when an answer has changes, or only when you click?