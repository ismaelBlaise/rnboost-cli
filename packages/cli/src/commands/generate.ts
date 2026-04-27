import type { Command } from 'commander';
import { logger } from '../utils/logger.js';

export function registerGenerateCommand(program: Command): void {
  program
    .command('generate <kind> [prompt...]')
    .alias('g')
    .description('Generate a screen/component from a natural-language prompt (uses OpenAI)')
    .option('--model <model>', 'override OpenAI model', 'gpt-4o-mini')
    .option('--out <path>', 'output directory', 'src/screens')
    .action(async (kind: string) => {
      logger.info(`generate command — implementation lands on feature/cli-generate (kind=${kind})`);
    });
}
