/**
 * Self-Improvement Hook for NEURO
 *
 * Injects a reminder to evaluate learnings during agent bootstrap.
 * Fires on agent:bootstrap event before workspace files are injected.
 *
 * Note: This hook is loaded at runtime by the NEURO gateway.
 * The HookHandler type is defined locally to avoid needing the
 * neuro/hooks module at install time.
 */

// Runtime type — matches the HookHandler contract from neuro/hooks
type HookEvent = {
    type?: string;
    action?: string;
    sessionKey?: string;
    context?: {
        bootstrapFiles?: Array<{ path: string; content: string; virtual?: boolean }>;
    };
};
type HookHandler = (event: HookEvent) => void | Promise<void>;

const REMINDER_CONTENT = `## Self-Improvement Reminder

After completing tasks, evaluate if any learnings should be captured:

**Log when:**
- User corrects you → \`.learnings/LEARNINGS.md\`
- Command/operation fails → \`.learnings/ERRORS.md\`
- User wants missing capability → \`.learnings/FEATURE_REQUESTS.md\`
- You discover your knowledge was wrong → \`.learnings/LEARNINGS.md\`
- You find a better approach → \`.learnings/LEARNINGS.md\`

**Promote when pattern is proven:**
- Behavioral patterns → \`SOUL.md\`
- Workflow improvements → \`AGENTS.md\`
- Tool gotchas → \`TOOLS.md\`
- Identity/persona → \`IDENTITY.md\`

Keep entries simple: date, title, what happened, what to do differently.`;

const handler: HookHandler = async (event) => {
    // Safety checks for event structure
    if (!event || typeof event !== 'object') {
        return;
    }

    // Only handle agent:bootstrap events
    if (event.type !== 'agent' || event.action !== 'bootstrap') {
        return;
    }

    // Safety check for context
    if (!event.context || typeof event.context !== 'object') {
        return;
    }

    // Skip sub-agent sessions to avoid bootstrap issues
    // Sub-agents have sessionKey patterns like "agent:main:subagent:..."
    const sessionKey = event.sessionKey || '';
    if (sessionKey.includes(':subagent:')) {
        return;
    }

    // Inject the reminder as a virtual bootstrap file
    // Check that bootstrapFiles is an array before pushing
    if (Array.isArray(event.context.bootstrapFiles)) {
        event.context.bootstrapFiles.push({
            path: 'SELF_IMPROVEMENT_REMINDER.md',
            content: REMINDER_CONTENT,
            virtual: true,
        });
    }
};

export default handler;
