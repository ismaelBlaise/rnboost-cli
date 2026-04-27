import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export type Severity = 'info' | 'warn' | 'error';

export interface Finding {
  rule: string;
  severity: Severity;
  message: string;
  hint?: string;
}

export interface AnalyzeContext {
  projectRoot: string;
  pkg: Record<string, unknown> | null;
}

export type Rule = (ctx: AnalyzeContext) => Promise<Finding[]> | Finding[];

const hasDep = (pkg: AnalyzeContext['pkg'], name: string): boolean => {
  if (!pkg) return false;
  const deps = (pkg.dependencies ?? {}) as Record<string, string>;
  const dev = (pkg.devDependencies ?? {}) as Record<string, string>;
  return name in deps || name in dev;
};

const ruleHasTypeScript: Rule = ({ projectRoot, pkg }) => {
  const findings: Finding[] = [];
  const tsConfig = existsSync(resolve(projectRoot, 'tsconfig.json'));
  const usesTs = tsConfig || hasDep(pkg, 'typescript');
  if (!usesTs) {
    findings.push({
      rule: 'typescript',
      severity: 'warn',
      message: 'Project does not use TypeScript.',
      hint: 'Adding TypeScript catches a class of bugs at build time. `npx expo install typescript`.',
    });
  }
  return findings;
};

const ruleHasNavigation: Rule = ({ pkg }) => {
  if (!pkg) return [];
  const usesRN =
    hasDep(pkg, 'react-native') || hasDep(pkg, 'expo') || hasDep(pkg, 'react-native-web');
  if (!usesRN) return [];
  if (!hasDep(pkg, '@react-navigation/native')) {
    return [
      {
        rule: 'navigation',
        severity: 'info',
        message: 'No navigation library detected.',
        hint: 'Most apps need React Navigation. `rnboost generate screen "..."` assumes it.',
      },
    ];
  }
  return [];
};

const ruleHasStateManagement: Rule = ({ pkg }) => {
  if (!pkg) return [];
  const stateLibs = ['zustand', '@reduxjs/toolkit', 'jotai', 'recoil', 'mobx'];
  const found = stateLibs.some((lib) => hasDep(pkg, lib));
  if (!found) {
    return [
      {
        rule: 'state-management',
        severity: 'info',
        message: 'No state management library detected.',
        hint: 'For non-trivial apps, Zustand or Redux Toolkit pays off quickly.',
      },
    ];
  }
  return [];
};

const ruleEnvFile: Rule = ({ projectRoot }) => {
  const findings: Finding[] = [];
  const envExample = existsSync(resolve(projectRoot, '.env.example'));
  if (!envExample) {
    findings.push({
      rule: 'env-example',
      severity: 'warn',
      message: 'No .env.example file found.',
      hint: 'Document expected env vars to make onboarding easier.',
    });
  }
  return findings;
};

const ruleEslint: Rule = ({ projectRoot, pkg }) => {
  const hasConfig =
    existsSync(resolve(projectRoot, '.eslintrc.js')) ||
    existsSync(resolve(projectRoot, '.eslintrc.cjs')) ||
    existsSync(resolve(projectRoot, '.eslintrc.json')) ||
    existsSync(resolve(projectRoot, 'eslint.config.js'));
  if (!hasConfig && !hasDep(pkg, 'eslint')) {
    return [
      {
        rule: 'eslint',
        severity: 'warn',
        message: 'No ESLint configuration found.',
        hint: 'Add eslint-config-expo or @react-native to catch common issues.',
      },
    ];
  }
  return [];
};

const ruleConsoleLogs: Rule = async ({ projectRoot }) => {
  const target = resolve(projectRoot, 'src');
  if (!existsSync(target)) return [];
  const files = await collectSourceFiles(target);
  let count = 0;
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const matches = content.match(/console\.(log|debug)\(/g);
    if (matches) count += matches.length;
  }
  if (count > 10) {
    return [
      {
        rule: 'console-logs',
        severity: 'info',
        message: `Found ${count} console.log/debug calls under src/.`,
        hint: 'Consider a thin logger so you can silence these in production.',
      },
    ];
  }
  return [];
};

async function collectSourceFiles(dir: string): Promise<string[]> {
  const { readdir, stat } = await import('node:fs/promises');
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectSourceFiles(full)));
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      out.push(full);
    }
    void stat;
  }
  return out;
}

export const allRules: Rule[] = [
  ruleHasTypeScript,
  ruleHasNavigation,
  ruleHasStateManagement,
  ruleEnvFile,
  ruleEslint,
  ruleConsoleLogs,
];
