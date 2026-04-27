import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { allRules, type AnalyzeContext, type Finding } from './rules.js';

export async function runAnalyze(projectRoot: string): Promise<Finding[]> {
  const pkgPath = resolve(projectRoot, 'package.json');
  let pkg: Record<string, unknown> | null = null;
  if (existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    } catch {
      pkg = null;
    }
  }

  const ctx: AnalyzeContext = { projectRoot, pkg };
  const all = await Promise.all(allRules.map((rule) => rule(ctx)));
  return all.flat();
}
