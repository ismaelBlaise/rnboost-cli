import type { Command } from 'commander';
import { logger } from '../utils/logger.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Scaffold a new React Native app with smart defaults')
    .argument('[name]', 'project name (folder will be created)')
    .option('--template <template>', 'expo | react-native')
    .option('--ts', 'use TypeScript')
    .option('--js', 'use JavaScript')
    .option('-y, --yes', 'accept all defaults, skip prompts')
    .action(async (name?: string) => {
      logger.info('init command — implementation lands on feature/cli-init');
      if (name) logger.step(`requested project name: ${name}`);
    });
}
