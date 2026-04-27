import { Command } from 'commander';
import pc from 'picocolors';
import { registerInitCommand } from './commands/init.js';
import { registerGenerateCommand } from './commands/generate.js';
import { registerAnalyzeCommand } from './commands/analyze.js';
import { printBanner } from './utils/banner.js';
import { readPackageVersion } from './utils/version.js';

async function main(): Promise<void> {
  const version = await readPackageVersion();
  const program = new Command();

  program
    .name('rnboost')
    .description('RNBoost CLI — the smart React Native starter')
    .version(version, '-v, --version', 'output the current version')
    .hook('preAction', (cmd) => {
      if (cmd.args[0] !== '--silent') printBanner(version);
    });

  registerInitCommand(program);
  registerGenerateCommand(program);
  registerAnalyzeCommand(program);

  program.on('command:*', (operands) => {
    console.error(pc.red(`Unknown command: ${operands[0]}`));
    console.error(`Run ${pc.cyan('rnboost --help')} to see available commands.`);
    process.exitCode = 1;
  });

  await program.parseAsync(process.argv);
}

main().catch((err) => {
  console.error(pc.red('rnboost failed:'), err);
  process.exit(1);
});
