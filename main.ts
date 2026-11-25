// Copies the finished front page for 25 November 2026 to the output folder.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(out, { recursive: true });
copyFileSync(join(dirname(fileURLToPath(import.meta.url)), 'entry.png'), join(out, 'entry.png'));
