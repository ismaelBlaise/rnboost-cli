import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import type { InitAnswers } from '../prompts/initPrompts.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TEMPLATES_ROOT = resolve(__dirname, '../../templates');

export interface ScaffoldOptions {
  targetDir: string;
  answers: InitAnswers;
}

export async function scaffold({ targetDir, answers }: ScaffoldOptions): Promise<void> {
  if (existsSync(targetDir) && (await fs.readdir(targetDir)).length > 0) {
    throw new Error(`Target directory "${targetDir}" already exists and is not empty.`);
  }

  const baseTemplate = resolve(TEMPLATES_ROOT, answers.framework);
  if (!existsSync(baseTemplate)) {
    throw new Error(
      `Template "${answers.framework}" not found at ${baseTemplate}. ` +
        'Templates ship from feature/templates and feature/upgrade-stack.',
    );
  }

  await fs.copy(baseTemplate, targetDir, { overwrite: false, errorOnExist: false });
  await applyAddons(targetDir, answers);
  await renderPackageJson(targetDir, answers);
}

async function applyAddons(targetDir: string, answers: InitAnswers): Promise<void> {
  const addonsRoot = resolve(TEMPLATES_ROOT, 'addons');
  const routing = answers.framework === 'expo' ? 'expo-router' : 'react-navigation';
  const addons = [
    `routing-${routing}`,
    answers.state !== 'none' ? `state-${answers.state}` : null,
    answers.backend !== 'none' ? `backend-${answers.backend}` : null,
    answers.auth !== 'none' ? `auth-${answers.auth}` : null,
    answers.ui !== 'none' ? `ui-${answers.ui}` : null,
  ].filter((x): x is string => x !== null);

  for (const addon of addons) {
    const addonDir = resolve(addonsRoot, addon);
    if (existsSync(addonDir)) {
      await fs.copy(addonDir, targetDir, { overwrite: true });
    }
  }
}

async function renderPackageJson(targetDir: string, answers: InitAnswers): Promise<void> {
  const pkgPath = resolve(targetDir, 'package.json');
  if (!existsSync(pkgPath)) return;
  const pkg = (await fs.readJson(pkgPath)) as Record<string, unknown>;
  pkg.name = answers.projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
