/**
 * RUNTIME — run on every invocation.
 *
 * Usage:
 *   DATA_ANALYST_AGENT_ID=<id> \
 *   DATA_ANALYST_ENVIRONMENT_ID=<id> \
 *   npx ts-node agents/data-analyst-session.ts "What are the top 5 events by volume?"
 *
 * Required env vars (from data-analyst-setup.ts output):
 *   ANTHROPIC_API_KEY
 *   DATA_ANALYST_AGENT_ID
 *   DATA_ANALYST_ENVIRONMENT_ID
 *
 * Optional:
 *   DATA_ANALYST_AGENT_VERSION   — pin to a specific agent version
 *   DATA_ANALYST_VAULT_ID        — vault containing Amplitude MCP credentials
 */

import Anthropic from "@anthropic-ai/sdk";

const AGENT_ID = process.env.DATA_ANALYST_AGENT_ID;
const AGENT_VERSION = process.env.DATA_ANALYST_AGENT_VERSION
  ? Number(process.env.DATA_ANALYST_AGENT_VERSION)
  : undefined;
const ENVIRONMENT_ID = process.env.DATA_ANALYST_ENVIRONMENT_ID;
const VAULT_ID = process.env.DATA_ANALYST_VAULT_ID;

if (!AGENT_ID || !ENVIRONMENT_ID) {
  console.error(
    "Missing required env vars: DATA_ANALYST_AGENT_ID, DATA_ANALYST_ENVIRONMENT_ID\n" +
      "Run agents/data-analyst-setup.ts first.",
  );
  process.exit(1);
}

const userMessage = process.argv.slice(2).join(" ") || "Hello! What can you help me analyse?";

async function runSession() {
  const client = new Anthropic();

  // 1. Create session referencing the pre-created agent
  console.log(`Starting session with agent ${AGENT_ID}...`);
  const session = await client.beta.sessions.create({
    agent: AGENT_VERSION
      ? { type: "agent", id: AGENT_ID, version: AGENT_VERSION }
      : AGENT_ID,
    environment_id: ENVIRONMENT_ID,
    title: `Data analysis — ${new Date().toISOString()}`,
    ...(VAULT_ID ? { vault_ids: [VAULT_ID] } : {}),
  });
  console.log(`Session ${session.id} created (status: ${session.status})\n`);

  // 2. Open stream BEFORE sending the message (stream-first ordering)
  const stream = await client.beta.sessions.stream(session.id);

  await client.beta.sessions.events.send(session.id, {
    events: [
      {
        type: "user.message",
        content: [{ type: "text", text: userMessage }],
      },
    ],
  });

  // 3. Process the event stream
  const customToolCalls: Array<{ id: string; tool_name: string; input: unknown }> = [];

  for await (const event of stream) {
    switch (event.type) {
      case "agent.message":
        for (const block of event.content) {
          if (block.type === "text") {
            process.stdout.write(block.text);
          }
        }
        break;

      case "agent.custom_tool_use":
        // Custom tool calls — send results back to continue the session
        customToolCalls.push({ id: event.id, tool_name: event.tool_name, input: event.input });
        break;

      case "session.status_idle":
        if (event.stop_reason?.type === "requires_action") {
          // Session is waiting for custom tool results — handle them
          if (customToolCalls.length > 0) {
            const results = customToolCalls.splice(0).map((call) => ({
              type: "user.custom_tool_result" as const,
              custom_tool_use_id: call.id,
              content: [
                {
                  type: "text" as const,
                  text: `Tool "${call.tool_name}" is not implemented in this runner. Input was: ${JSON.stringify(call.input)}`,
                },
              ],
            }));
            await client.beta.sessions.events.send(session.id, { events: results });
          }
        } else {
          // Terminal idle — end_turn or retries_exhausted
          console.log("\n\n[Session complete]");
        }
        break;

      case "session.status_terminated":
        console.log("\n[Session terminated]");
        break;

      case "session.error":
        console.error("\n[Session error]", event);
        break;

      case "span.model_request_end":
        // Log token usage for cost tracking
        if (event.model_usage) {
          const u = event.model_usage;
          console.error(
            `\n[usage] input=${u.input_tokens} output=${u.output_tokens}` +
              ` cache_read=${u.cache_read_input_tokens} cache_write=${u.cache_creation_input_tokens}`,
          );
        }
        break;
    }
  }

  // 4. List any files the agent wrote to /mnt/session/outputs/
  try {
    const files = await client.beta.files.list({
      scope_id: session.id,
      betas: ["managed-agents-2026-04-01"],
    } as Parameters<typeof client.beta.files.list>[0]);

    if (files.data.length > 0) {
      console.log("\n[Output files]");
      for (const f of files.data) {
        console.log(`  ${f.filename} (${f.size_bytes} bytes) — file_id: ${f.id}`);
      }
    }
  } catch {
    // scope_id filtering may not be available in all SDK versions
  }
}

runSession().catch((err) => {
  console.error(err);
  process.exit(1);
});
