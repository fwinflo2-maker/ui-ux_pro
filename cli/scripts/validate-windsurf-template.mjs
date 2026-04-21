#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');

const SRC_PATH = join(repoRoot, 'src/ui-ux-pro-max/templates/platforms/windsurf.json');
const ASSET_PATH = join(repoRoot, 'cli/assets/templates/platforms/windsurf.json');

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

function assertWindsurfFrontmatter(config, path) {
  if (!config.frontmatter || typeof config.frontmatter !== 'object') {
    throw new Error(`${path}: frontmatter is required for Windsurf SKILL.md generation`);
  }

  const { name, description } = config.frontmatter;
  if (typeof name !== 'string' || !name.trim()) {
    throw new Error(`${path}: frontmatter.name must be a non-empty string`);
  }
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error(`${path}: frontmatter.description must be a non-empty string`);
  }
}

const src = await readJson(SRC_PATH);
const asset = await readJson(ASSET_PATH);

assertWindsurfFrontmatter(src, SRC_PATH);
assertWindsurfFrontmatter(asset, ASSET_PATH);

if (JSON.stringify(src) !== JSON.stringify(asset)) {
  throw new Error(
    'Windsurf platform template mismatch between src and cli/assets. Run: node cli/scripts/sync-assets.mjs'
  );
}

console.log('Windsurf template guard passed');
