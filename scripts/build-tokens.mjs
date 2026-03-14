#!/usr/bin/env node
/**
 * Build all token outputs: core CSS, theme CSS (dark + light), TS, Tailwind, JSON.
 *
 * SD v4.4.0's platform-level `source` does not inject tokens into the dictionary,
 * so dark/light themes are built as separate SD instances with their theme file in
 * the global source + a file-level filter for `theme.*` tokens only.
 */
import StyleDictionary from 'style-dictionary';
import { coreConfig, darkConfig, lightConfig } from '../config/style-dictionary.config.mjs';

async function build() {
  // 1. Core tokens (tokens.css, tokens.json, TS exports, Tailwind preset)
  const core = new StyleDictionary(coreConfig);
  await core.buildAllPlatforms();

  // 2. Dark theme (dark.css — only --theme-* variables)
  const dark = new StyleDictionary(darkConfig);
  await dark.buildAllPlatforms();

  // 3. Light theme (light.css — only --theme-* variables)
  const light = new StyleDictionary(lightConfig);
  await light.buildAllPlatforms();

  console.log('\n✓ All token builds complete');
}

build().catch(err => {
  console.error('Token build failed:', err);
  process.exit(1);
});
