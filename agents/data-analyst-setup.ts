/**
 * ONE-TIME SETUP — run once, save the printed IDs to your .env or config.
 *
 * Usage:
 *   npx ts-node agents/data-analyst-setup.ts
 *   # or: bun agents/data-analyst-setup.ts
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *
 * Optional (for Amplitude MCP auth):
 *   AMPLITUDE_ACCESS_TOKEN   — OAuth access token for https://mcp.amplitude.com/mcp
 *   AMPLITUDE_REFRESH_TOKEN  — OAuth refresh token (enables auto-refresh)
 */

import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You analyze data. Given a dataset (file path, URL, or query) and a question:

1. Load the data and print its shape, column names, dtypes, and a small sample. Always look before you compute.
2. Clean obvious issues — nulls, duplicates, type mismatches — and note what you changed.
3. Answer the question with code. Prefer pandas/polars for tabular work, matplotlib/plotly for charts. Show intermediate results so your reasoning is checkable.
4. For product-analytics questions, query Amplitude directly — event funnels, retention cohorts, property breakdowns — and link the chart.
5. Save any charts or derived tables to /mnt/session/outputs/ and summarize findings in plain language, including caveats (sample size, missing data, correlation-vs-causation).

Default to simple, readable analysis over clever one-liners. A clear bar chart usually beats a dense heatmap.`;

const AMPLITUDE_MCP_URL = "https://mcp.amplitude.com/mcp";

async function setup() {
  const client = new Anthropic();

  // 1. Create environment
  console.log("Creating environment...");
  const environment = await client.beta.environments.create({
    name: "data-analyst-env",
    config: {
      type: "cloud",
      networking: { type: "unrestricted" },
    },
  });
  console.log(`✓ Environment created: ${environment.id}`);

  // 2. Optionally create a vault for Amplitude MCP credentials
  let vaultId: string | undefined;
  const accessToken = process.env.AMPLITUDE_ACCESS_TOKEN;

  if (accessToken) {
    console.log("Creating vault for Amplitude credentials...");
    const vault = await client.beta.vaults.create({ name: "data-analyst-vault" });

    await client.beta.vaults.credentials.create(vault.id, {
      display_name: "Amplitude MCP",
      auth: {
        type: "mcp_oauth",
        mcp_server_url: AMPLITUDE_MCP_URL,
        access_token: accessToken,
        ...(process.env.AMPLITUDE_REFRESH_TOKEN
          ? {
              refresh: {
                refresh_token: process.env.AMPLITUDE_REFRESH_TOKEN,
                // Update these to match your OAuth app registration
                client_id: process.env.AMPLITUDE_CLIENT_ID ?? "",
                token_endpoint: "https://api.amplitude.com/oauth2/token",
                token_endpoint_auth: { type: "none" },
              },
            }
          : {}),
      },
    });

    vaultId = vault.id;
    console.log(`✓ Vault created: ${vault.id}`);
  } else {
    console.log(
      "⚠ AMPLITUDE_ACCESS_TOKEN not set — skipping vault creation.\n" +
        "  Set it and re-run, or attach credentials manually before starting sessions.",
    );
  }

  // 3. Create the agent
  console.log("Creating Data analyst agent...");
  const agent = await client.beta.agents.create({
    name: "Data analyst",
    model: "claude-sonnet-4-6",
    system: SYSTEM_PROMPT,
    mcp_servers: [
      { type: "url", name: "amplitude", url: AMPLITUDE_MCP_URL },
    ],
    tools: [
      { type: "agent_toolset_20260401", default_config: { enabled: true } },
      { type: "mcp_toolset", mcp_server_name: "amplitude" },
    ],
  });
  console.log(`✓ Agent created: ${agent.id}  (version: ${agent.version})`);

  // 4. Print env vars to persist
  console.log("\n─── Add these to your .env ───");
  console.log(`DATA_ANALYST_AGENT_ID=${agent.id}`);
  console.log(`DATA_ANALYST_AGENT_VERSION=${agent.version}`);
  console.log(`DATA_ANALYST_ENVIRONMENT_ID=${environment.id}`);
  if (vaultId) {
    console.log(`DATA_ANALYST_VAULT_ID=${vaultId}`);
  }
  console.log("──────────────────────────────");
}

setup().catch((err) => {
  console.error(err);
  process.exit(1);
});
