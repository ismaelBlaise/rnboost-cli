import { resolve } from 'node:path';
import type { Command } from 'commander';
import ora from 'ora';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import { runInitPrompts, type InitAnswers } from '../prompts/initPrompts.js';
import { scaffold } from '../core/scaffolder.js';

interface InitOptions {
  template?: 'expo' | 'react-native';
  ts?: boolean;
  js?: boolean;
  yes?: boolean;
}

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Scaffold a new React Native app with smart defaults')
    .argument('[name]', 'project name (folder will be created)')
    .option('--template <template>', 'expo | react-native')
    .option('--ts', 'use TypeScript')
    .option('--js', 'use JavaScript')
    .option('-y, --yes', 'accept all defaults, skip prompts')
    .action(async (name: string | undefined, opts: InitOptions) => {
      const answers = opts.yes
        ? defaultAnswers(name, opts)
        : await runInitPrompts(name);

      const targetDir = resolve(process.cwd(), answers.projectName);

      const spinner = ora('Generating project files...').start();
      try {
        await scaffold({ targetDir, answers });
        spinner.succeed('Project files generated.');
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exitCode = 1;
        return;
      }

      if (answers.installDeps) {
        const installSpinner = ora('Installing dependencies (this can take a minute)...').start();
        try {
          await execa('npm', ['install'], { cwd: targetDir });
          installSpinner.succeed('Dependencies installed.');
        } catch (err) {
          installSpinner.warn(`Skipped install: ${(err as Error).message}`);
        }
      }

      if (answers.initGit) {
        try {
          await execa('git', ['init'], { cwd: targetDir });
          await execa('git', ['add', '-A'], { cwd: targetDir });
          await execa('git', ['commit', '-m', 'chore: initial commit from rnboost'], {
            cwd: targetDir,
          });
          logger.success('Git repository initialized.');
        } catch (err) {
          logger.warn(`Git init skipped: ${(err as Error).message}`);
        }
      }

      printNextSteps(answers);
    });
}

function defaultAnswers(name: string | undefined, opts: InitOptions): InitAnswers {
  return {
    projectName: name ?? 'my-rn-app',
    framework: opts.template ?? 'expo',
    language: opts.js ? 'js' : 'ts',
    navigation: true,
    state: 'zustand',
    backend: 'custom',
    auth: 'jwt',
    ui: 'tailwind',
    installDeps: true,
    initGit: true,
  };
}

function printNextSteps(answers: InitAnswers): void {
  logger.blank();
  logger.success(`Created ${answers.projectName} 🎉`);
  logger.step(`cd ${answers.projectName}`);
  if (answers.framework === 'expo') {
    logger.step('npx expo start');
  } else {
    logger.step('npx react-native run-android  (or run-ios)');
  }
  logger.blank();
  logger.info('Run `rnboost generate screen "<prompt>"` to create new screens with AI.');
}
