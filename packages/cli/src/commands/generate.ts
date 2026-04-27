import type { Command } from 'commander';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { ensureScreenName } from '../utils/naming.js';
import { generateScreen } from '../generators/screen.js';

interface GenerateOptions {
  model: string;
  out: string;
  name?: string;
}

export function registerGenerateCommand(program: Command): void {
  program
    .command('generate <kind> [prompt...]')
    .alias('g')
    .description('Generate a screen/component from a natural-language prompt (uses OpenAI)')
    .option('--model <model>', 'override OpenAI model', 'gpt-4o-mini')
    .option('--out <path>', 'output directory', 'src/screens')
    .option('--name <name>', 'override generated component name')
    .action(async (kind: string, promptParts: string[], opts: GenerateOptions) => {
      if (kind !== 'screen') {
        logger.error(`Unsupported kind "${kind}". Currently supported: screen.`);
        process.exitCode = 1;
        return;
      }

      const prompt = promptParts.join(' ').trim();
      if (!prompt) {
        logger.error('Provide a prompt, e.g. rnboost generate screen "login with email and password"');
        process.exitCode = 1;
        return;
      }

      const componentName = opts.name ?? ensureScreenName(prompt);
      const spinner = ora(`Generating ${componentName} via ${opts.model}...`).start();

      try {
        const filePath = await generateScreen({
          prompt,
          outDir: opts.out,
          model: opts.model,
          componentName,
        });
        spinner.succeed(`Created ${filePath}`);
      } catch (err) {
        spinner.fail((err as Error).message);
        process.exitCode = 1;
      }
    });
}
